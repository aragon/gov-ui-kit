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

    it('renders token name and symbol', () => {
        const props = { name: 'Ethereum', symbol: 'ETH' };
        render(createTestComponent(props));
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(props.symbol)).toBeInTheDocument();
    });

    it('correctly renders amount and fiat price', () => {
        const props = { amount: 10, fiatPrice: 1250 };
        render(createTestComponent(props));
        expect(screen.getByText('$12.50K')).toBeInTheDocument();
        expect(screen.getByText(props.amount)).toBeInTheDocument();
    });

    it('renders unknown with fiatPrice is not set', () => {
        const props = { fiatPrice: undefined };
        render(createTestComponent(props));
        expect(screen.getByText('Unknown')).toBeInTheDocument();
    });
});
