import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { clipboardUtils } from '../../utils';
import { AddressOutput, type IAddressOutputProps } from './addressOutput';

describe('<AddressOutput /> component', () => {
    const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
    const checksumAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

    const createTestComponent = (props?: Partial<IAddressOutputProps>) => {
        const completeProps: IAddressOutputProps = { address, ...props };

        return <AddressOutput {...completeProps} />;
    };

    it('renders the truncated address when no label is provided', () => {
        render(createTestComponent());
        expect(screen.getByText('0xd8da…6045')).toBeInTheDocument();
    });

    it('renders the truncated hash when the value is a 32-byte hash and no label is provided', () => {
        const hash = '0x1c72fdb5dc2f8b1c1f01e7429b8848e0d761b31f675994f7d1340e8a13e781d9';
        render(createTestComponent({ address: hash }));
        expect(screen.getByText('0x1c72fdb5…13e781d9')).toBeInTheDocument();
    });

    it('renders the given label', () => {
        render(createTestComponent({ label: 'vitalik.eth' }));
        expect(screen.getByText('vitalik.eth')).toBeInTheDocument();
    });

    it('renders the full checksummed address when showCompleteAddress is set', () => {
        render(createTestComponent({ showCompleteAddress: true }));
        expect(screen.getByText(checksumAddress)).toBeInTheDocument();
    });

    it('reveals and copies by default', async () => {
        const user = userEvent.setup();
        render(createTestComponent());

        await user.hover(screen.getByRole('button', { name: '0xd8da…6045' }));

        expect(await screen.findByRole('tooltip')).toHaveTextContent(checksumAddress);
        expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('reveals the checksummed address on hover when reveal is set', async () => {
        const user = userEvent.setup();
        render(createTestComponent({ reveal: true }));

        await user.hover(screen.getByRole('button', { name: '0xd8da…6045' }));

        expect(await screen.findByRole('tooltip')).toHaveTextContent(checksumAddress);
    });

    it('reveals the checksummed address on keyboard focus when reveal is set', async () => {
        const user = userEvent.setup();
        render(createTestComponent({ reveal: true }));

        await user.tab();

        expect(screen.getByRole('button', { name: '0xd8da…6045' })).toHaveFocus();
        expect(await screen.findByRole('tooltip')).toHaveTextContent(checksumAddress);
    });

    it('reveals the same checksummed address whatever the label is', async () => {
        const user = userEvent.setup();
        render(createTestComponent({ reveal: true, label: 'vitalik.eth' }));

        await user.hover(screen.getByRole('button', { name: 'vitalik.eth' }));

        expect(await screen.findByRole('tooltip')).toHaveTextContent(checksumAddress);
    });

    it('reveals on tap and dismisses on an outside press', async () => {
        const user = userEvent.setup();
        render(createTestComponent({ reveal: true }));

        await user.pointer({ keys: '[TouchA]', target: screen.getByRole('button', { name: '0xd8da…6045' }) });
        expect(await screen.findByRole('tooltip')).toHaveTextContent(checksumAddress);

        await user.pointer({ keys: '[TouchA]', target: document.body });
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('renders the label as an external link when href is set and keeps it navigable on tap', async () => {
        const user = userEvent.setup();
        render(createTestComponent({ reveal: true, copy: false, href: 'https://etherscan.io/address/x' }));

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://etherscan.io/address/x');

        await user.tab();
        expect(link).toHaveFocus();
        expect(await screen.findByRole('tooltip')).toHaveTextContent(checksumAddress);
    });

    it('does not open the reveal on tap when href is set', async () => {
        const user = userEvent.setup();
        render(createTestComponent({ reveal: true, copy: false, href: 'https://etherscan.io/address/x' }));

        await user.pointer({ keys: '[TouchA]', target: screen.getByRole('link') });

        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('copies the checksummed address from the copy control', async () => {
        const user = userEvent.setup();
        const copySpy = jest.spyOn(clipboardUtils, 'copy').mockResolvedValue();
        render(createTestComponent({ reveal: false }));

        await user.click(screen.getByRole('button', { name: 'Copy' }));

        expect(copySpy).toHaveBeenCalledWith(checksumAddress);
        copySpy.mockRestore();
    });

    it('does not reveal or copy when the flags are off', () => {
        render(createTestComponent({ copy: false, reveal: false }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('reveals on hover with no interactive control when hasInteractiveAncestor is set', async () => {
        const user = userEvent.setup();
        render(createTestComponent({ hasInteractiveAncestor: true, label: 'vitalik.eth' }));

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        await user.hover(screen.getByText('vitalik.eth'));

        expect(await screen.findByRole('tooltip')).toHaveTextContent(checksumAddress);
    });

    it('keeps the copy control inside an interactive ancestor when the flag is set explicitly', () => {
        render(createTestComponent({ hasInteractiveAncestor: true, copy: true }));
        expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
    });

    it('displays the value as is when it is not a valid address', async () => {
        const user = userEvent.setup();
        const hash = '0x9a8f4e2c1d7b6a5039e8c2b4f16d70a3c85be1924d6f30ab7c5e918d24f6b07a';
        render(createTestComponent({ reveal: true, address: hash, label: 'transaction' }));

        await user.hover(screen.getByRole('button', { name: 'transaction' }));

        expect(await screen.findByRole('tooltip')).toHaveTextContent(hash);
    });
});
