import type { Meta, StoryObj } from '@storybook/react';
import { AssetDataListItemStructure } from './assetDataListItemStructure';

const meta: Meta<typeof AssetDataListItemStructure> = {
    title: 'Modules/Components/Asset/AssetDataListItem/AssetDataListItem.Structure',
    component: AssetDataListItemStructure,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=8079-18352&mode=design&t=MR1awSDoExtPDiEd-4',
        },
    },
};

type Story = StoryObj<typeof AssetDataListItemStructure>;

/**
 * Default usage example of the AssetDataListItem component.
 */
export const Default: Story = {
    args: {
        logoSrc: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
        name: 'Ethereum',
        amount: 420.69,
        symbol: 'ETH',
        fiatPrice: 3654.76,
    },
};

/**
 * Usage example of the AssetDataListItem component with extra long name & symbol.
 */
export const LongName: Story = {
    args: {
        logoSrc: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
        name: 'A really really long name that will be truncated when needed',
        amount: 420.69,
        symbol: 'A_REALLY_LONG_SYMBOL_THAT_SHOULD_TRUNCATE_WHEN_NEEDED',
        fiatPrice: 3654.76,
    },
};

/**
 *  Usage of the AssetDataListItem without fiatPrice.
 */
export const UnknownPrice: Story = {
    args: {
        name: 'Ethereum',
        amount: 420.69,
        symbol: 'ETH',
    },
};

export default meta;
