import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { GukModulesProvider } from '../../../gukModulesProvider';
import { AssetTransferAddress, type IAssetTransferAddressProps } from './assetTransferAddress';

jest.mock('../../../member/', () => ({ MemberAvatar: () => <div data-testid="member-avatar-mock" /> }));

describe('<AssetTransferAddress /> component', () => {
    const createTestComponent = (props?: Partial<IAssetTransferAddressProps>) => {
        const completeProps = {
            txRole: 'sender' as const,
            participant: { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' },
            // Optional, but setting addressUrl parameter to retrieve the link element through the getByRole utility
            addressUrl: 'https://etherscan.io/address/0xsomeaddress',
            ...props,
        };
        return (
            <GukModulesProvider>
                <AssetTransferAddress {...completeProps} />
            </GukModulesProvider>
        );
    };

    it('renders correctly as a sender', () => {
        const txRole = 'sender' as const;
        render(createTestComponent({ txRole }));

        const parentElement = screen.getByRole('link');
        expect(parentElement).toHaveClass('rounded-t-xl md:rounded-l-xl md:rounded-r-none');
        expect(screen.getByText('From')).toBeInTheDocument();
    });

    it('renders correctly as a recipient', () => {
        const txRole = 'recipient' as const;
        render(createTestComponent({ txRole }));

        const parentElement = screen.getByRole('link');
        expect(parentElement).toHaveClass('rounded-b-xl md:rounded-r-xl md:rounded-l-none');
        expect(screen.getByText('To')).toBeInTheDocument();
    });

    it('uses truncated address if ensName is undefined', () => {
        const participant = { address: '0x028F5Ca0b3A3A14e44AB8af660B53D1e428457e7' };
        render(createTestComponent({ participant }));

        expect(screen.getByText('0x02…57e7')).toBeInTheDocument();
    });

    it('renders ENS name over address when available', () => {
        const participant = { address: '0x028F5Ca0b3A3A14e44AB8af660B53D1e428457e7', name: 'vitalik.eth' };
        render(createTestComponent({ participant }));

        const ensName = screen.getByText('vitalik.eth');
        expect(ensName).toBeInTheDocument();
        const truncatedAddress = screen.queryByText('0x02…57e7');
        expect(truncatedAddress).toBeNull();
    });

    it('does not create a link if addressUrl is undefined', () => {
        const addressUrl = undefined;
        render(createTestComponent({ addressUrl }));

        const possibleLinkElement = screen.queryByRole('link');
        expect(possibleLinkElement).toBeNull();
    });

    it('creates a link if addressUrl is defined', () => {
        const addressUrl = 'https://etherscan.io';
        render(createTestComponent({ addressUrl }));

        const possibleLinkElement = screen.getByRole('link');
        expect(possibleLinkElement).toHaveAttribute('href', addressUrl);
    });
});
