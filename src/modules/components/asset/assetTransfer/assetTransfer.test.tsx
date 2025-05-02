import { render, screen } from '@testing-library/react';
import { zeroAddress } from 'viem';
import { polygon } from 'viem/chains';
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

    it('renders the asset name', () => {
        const assetName = 'Bitcoin';
        render(createTestComponent({ assetName }));
        expect(screen.getByText(assetName)).toBeInTheDocument();
    });

    it('calculates and renders the formatted fiat value', () => {
        const assetFiatPrice = 100;
        const assetAmount = 10;
        render(createTestComponent({ assetFiatPrice, assetAmount }));
        expect(screen.getByText('$1.00K')).toBeInTheDocument();
    });

    it('renders the signed asset amount and symbol', () => {
        const assetSymbol = 'ETH';
        const assetAmount = 10;
        render(createTestComponent({ assetSymbol, assetAmount }));
        expect(screen.getByText('+10 ETH')).toBeInTheDocument();
    });

    it('renders both avatar elements for the from and to addresses', () => {
        render(createTestComponent());
        expect(screen.getAllByTestId('asset-transfer-address')).toHaveLength(2);
    });

    it('renders the block explorer link of the asset when the assetAddress property is set', () => {
        const chainId = polygon.id;
        const assetAddress = '0xE08fcC4283fd8E35FdC49088b502B679E1C779fd';
        render(createTestComponent({ assetAddress, chainId }));
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', `https://polygonscan.com/token/${assetAddress}`);
    });

    it('defaults chain-id to ethereum mainnet when not provided', () => {
        const assetAddress = '0x1C727a55eA3c11B0ab7D3a361Fe0F3C47cE6de5d';
        render(createTestComponent({ assetAddress }));
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', `https://etherscan.io/token/${assetAddress}`);
    });

    it('does not render the block explorer link for the asset when the assetAddress property is not set', () => {
        const assetAddress = undefined;
        render(createTestComponent({ assetAddress }));
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('does not render the block explorer link for the asset when the assetAddress property is set to zero address', () => {
        const assetAddress = zeroAddress;
        render(createTestComponent({ assetAddress }));
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
});
