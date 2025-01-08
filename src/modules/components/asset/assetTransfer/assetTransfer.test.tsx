import { render, screen } from '@testing-library/react';
import { zeroAddress } from 'viem';
import { GukModulesProvider } from '../../gukModulesProvider';
import { AssetTransfer, type IAssetTransferProps } from './assetTransfer';

jest.mock('./assetTransferAddress', () => ({
    AssetTransferAddress: () => <div data-testid="asset-transfer-address" />,
}));

describe('<AssetTransfer /> component', () => {
    const createTestComponent = (props?: Partial<IAssetTransferProps>) => {
        const completeProps: IAssetTransferProps = {
            sender: { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' },
            recipient: { address: '0x1D03D98c0aac1f83860cec5156116FE687259999' },
            assetSymbol: 'ETH',
            assetAmount: 1,
            assetName: 'Ethereum',
            ...props,
        };

        return (
            <GukModulesProvider>
                <AssetTransfer {...completeProps} />
            </GukModulesProvider>
        );
    };

    it('renders with minimum props', () => {
        const assetName = 'Bitcoin';
        render(createTestComponent({ assetName }));

        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    });

    it('renders the formatted fiat estimate', () => {
        const assetFiatPrice = 100;
        const assetAmount = 10;

        render(createTestComponent({ assetFiatPrice, assetAmount }));
        const formattedUsdEstimate = screen.getByText('$1.00K');
        expect(formattedUsdEstimate).toBeInTheDocument();
    });

    it('renders the asset value and symbol with sign', () => {
        const assetSymbol = 'ETH';
        const assetAmount = 10;

        render(createTestComponent({ assetSymbol, assetAmount }));
        const assetPrintout = screen.getByText('+10 ETH');
        expect(assetPrintout).toBeInTheDocument();
    });

    it('renders both avatar elements for the from and to addresses', () => {
        render(createTestComponent());

        expect(screen.getAllByTestId('asset-transfer-address')).toHaveLength(2);
    });

    it('configures and applies the correct link for asset when asset address is defined', () => {
        const assetAddress = '0x0ca620e2dd3147658b8a042b3e7b7cd6f5fa043bf3625140c0dbddcabf47dfb9';
        render(createTestComponent({ assetAddress }));

        const links = screen.getByRole('link');
        const expectedTransactionLink = `https://etherscan.io/token/${assetAddress}`;

        expect(links).toHaveAttribute('href', expectedTransactionLink);
    });

    it('does not render block explorer link for asset when asset address is not defined', () => {
        const assetAddress = undefined;
        render(createTestComponent({ assetAddress }));

        const links = screen.queryByRole('link');
        expect(links).not.toBeInTheDocument();
    });

    it('does not render block explorer link for asset when asset address is zeroAddress', () => {
        const assetAddress = zeroAddress;
        render(createTestComponent({ assetAddress }));

        const links = screen.queryByRole('link');
        expect(links).not.toBeInTheDocument();
    });
});
