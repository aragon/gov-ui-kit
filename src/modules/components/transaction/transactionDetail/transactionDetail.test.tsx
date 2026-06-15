import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { Dialog } from '../../../../core';
import * as useBlockExplorer from '../../../hooks';
import { addressUtils } from '../../../utils';
import { TransactionDetail } from './index';
import type { ITransactionDetailRootProps } from './transactionDetailRoot';

describe('<TransactionDetail /> component', () => {
    const useBlockExplorerSpy = jest.spyOn(useBlockExplorer, 'useBlockExplorer');

    beforeEach(() => {
        useBlockExplorerSpy.mockReturnValue({
            buildEntityUrl: jest.fn(({ id }: { id: string }) => `https://etherscan.io/${id}`),
        } as unknown as useBlockExplorer.IUseBlockExplorerReturn);
    });

    afterEach(() => {
        useBlockExplorerSpy.mockReset();
    });

    const renderInDialog = (children: ReactNode, rootProps?: Partial<ITransactionDetailRootProps>) =>
        render(
            <Dialog.Root open={true}>
                <TransactionDetail.Root {...rootProps}>{children}</TransactionDetail.Root>
            </Dialog.Root>,
        );

    const contractAddress = '0x1234567890123456789012345678901234561234';

    describe('Root', () => {
        it('renders the default "Executed" header title', () => {
            renderInDialog('content');
            expect(screen.getByText('Executed')).toBeInTheDocument();
        });

        it('renders a custom title when provided', () => {
            renderInDialog('content', { title: 'Execution detail' });
            expect(screen.getByText('Execution detail')).toBeInTheDocument();
        });

        it('triggers the onClose callback on close-button click', async () => {
            const user = userEvent.setup();
            const onClose = jest.fn();
            renderInDialog('content', { onClose });
            await user.click(screen.getByRole('button'));
            expect(onClose).toHaveBeenCalled();
        });

        it('renders its children as content', () => {
            renderInDialog(<p>Summary and actions</p>);
            expect(screen.getByText('Summary and actions')).toBeInTheDocument();
        });
    });

    describe('Action', () => {
        it('renders the action name and a contract subtitle linking to the block explorer', () => {
            renderInDialog(
                <TransactionDetail.Container>
                    <TransactionDetail.Action chainId={1} contractName="Token" name="Mint" to={contractAddress} />
                </TransactionDetail.Container>,
            );
            expect(screen.getByText('Mint')).toBeInTheDocument();
            expect(screen.getByText('Token')).toBeInTheDocument();
            expect(screen.getByText(addressUtils.truncateAddress(contractAddress))).toBeInTheDocument();
            const links = screen.getAllByRole('link');
            expect(links.some((link) => link.getAttribute('href') === `https://etherscan.io/${contractAddress}`)).toBe(
                true,
            );
        });

        it('falls back to the truncated address when no contract name is provided', () => {
            renderInDialog(
                <TransactionDetail.Container>
                    <TransactionDetail.Action chainId={1} name="Register gauge" to={contractAddress} />
                </TransactionDetail.Container>,
            );
            expect(screen.getByText(addressUtils.truncateAddress(contractAddress))).toBeInTheDocument();
        });

        it('renders the undecoded warning state when no action name is provided', () => {
            renderInDialog(
                <TransactionDetail.Container>
                    <TransactionDetail.Action chainId={1} contractName="Token" to={contractAddress} />
                </TransactionDetail.Container>,
            );
            expect(screen.getByText('Unknown')).toBeInTheDocument();
            expect(screen.getByTestId('WARNING')).toBeInTheDocument();
        });

        it('reveals the decoded children content when the row is expanded', async () => {
            const user = userEvent.setup();
            renderInDialog(
                <TransactionDetail.Container>
                    <TransactionDetail.Action chainId={1} name="Mint" to={contractAddress}>
                        <p>Decoded action detail</p>
                    </TransactionDetail.Action>
                </TransactionDetail.Container>,
            );
            expect(screen.queryByText('Decoded action detail')).not.toBeInTheDocument();
            await user.click(screen.getByRole('button', { name: /Mint/ }));
            expect(screen.getByText('Decoded action detail')).toBeInTheDocument();
        });

        it('renders multiple action rows within the container', () => {
            renderInDialog(
                <TransactionDetail.Container>
                    <TransactionDetail.Action name="Mint" to={contractAddress} />
                    <TransactionDetail.Action name="Transfer" to={contractAddress} />
                </TransactionDetail.Container>,
            );
            expect(screen.getByText('Mint')).toBeInTheDocument();
            expect(screen.getByText('Transfer')).toBeInTheDocument();
        });
    });

    describe('Footer', () => {
        const renderWithFooter = (footer: ReactNode) =>
            renderInDialog(
                <>
                    <TransactionDetail.Container>
                        <TransactionDetail.Action name="Mint" to={contractAddress} />
                        <TransactionDetail.Action name="Transfer" to={contractAddress} />
                    </TransactionDetail.Container>
                    {footer}
                </>,
            );

        it('expands and collapses all action rows from the More dropdown', async () => {
            const user = userEvent.setup();
            renderWithFooter(<TransactionDetail.Footer />);

            await user.click(screen.getByRole('button', { name: 'More' }));
            await user.click(screen.getByText('Expand all'));
            expect(screen.getByRole('button', { name: /Mint/ })).toHaveAttribute('aria-expanded', 'true');
            expect(screen.getByRole('button', { name: /Transfer/ })).toHaveAttribute('aria-expanded', 'true');

            await user.click(screen.getByRole('button', { name: 'More' }));
            await user.click(screen.getByText('Collapse all'));
            expect(screen.getByRole('button', { name: /Mint/ })).toHaveAttribute('aria-expanded', 'false');
        });

        it('renders and triggers custom dropdown items such as download as JSON', async () => {
            const user = userEvent.setup();
            const onDownload = jest.fn();
            renderWithFooter(
                <TransactionDetail.Footer
                    dropdownItems={[{ label: 'Download actions as JSON', onClick: onDownload }]}
                />,
            );

            await user.click(screen.getByRole('button', { name: 'More' }));
            await user.click(screen.getByText('Download actions as JSON'));
            expect(onDownload).toHaveBeenCalled();
        });
    });
});
