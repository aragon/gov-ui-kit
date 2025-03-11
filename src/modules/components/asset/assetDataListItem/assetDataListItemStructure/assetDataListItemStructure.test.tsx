import { render, screen } from '@testing-library/react';
import { AssetDataListItemStructure, type IAssetDataListItemStructureProps } from './assetDataListItemStructure';

describe('<AssetDataListItem.Structure /> component', () => {
    const createTestComponent = (props: Partial<IAssetDataListItemStructureProps> = {}) => {
        const completeProps: IAssetDataListItemStructureProps = {
            name: 'Ethereum',
            symbol: 'ETH',
            amount: 420.69,
            ...props,
        };

        return <AssetDataListItemStructure {...completeProps} />;
    };

    it('renders the token name and symbol', () => {
        const name = 'Ethereum';
        const symbol = 'ETH';
        render(createTestComponent({ name, symbol }));
        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText(/ETH/)).toBeInTheDocument();
    });

    it('correctly renders the amount and fiat value', () => {
        const amount = 10;
        const fiatPrice = 1250;
        const symbol = 'SOL';
        render(createTestComponent({ amount, fiatPrice, symbol }));
        expect(screen.getByText('$12.50K')).toBeInTheDocument();
        expect(screen.getByText(`${amount.toString()} ${symbol}`)).toBeInTheDocument();
    });

    it('renders unknown when fiatPrice is not set', () => {
        const fiatPrice = undefined;
        render(createTestComponent({ fiatPrice }));
        expect(screen.getByText('Unknown')).toBeInTheDocument();
    });

    it('hides the fiat value when hideValue is set to true', () => {
        const fiatPrice = undefined;
        const hideValue = true;
        render(createTestComponent({ fiatPrice, hideValue }));
        expect(screen.queryByText('Unknown')).not.toBeInTheDocument();
    });
});
