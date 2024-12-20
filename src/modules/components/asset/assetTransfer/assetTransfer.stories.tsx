import type { Meta, StoryObj } from '@storybook/react';
import { AssetTransfer } from './assetTransfer';

const meta: Meta<typeof AssetTransfer> = {
    title: 'Modules/Components/Asset/AssetTransfer',
    component: AssetTransfer,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Governance-UI-Kit?type=design&node-id=14385%3A24287&mode=dev&t=IX3Fa96hiwUEtcoA-1',
        },
    },
};

type Story = StoryObj<typeof AssetTransfer>;

/**
 * Default usage example of the AssetTransfer component.
 */
export const Default: Story = {
    args: {
        sender: { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', name: 'vitalik.eth' },
        recipient: {
            address: '0x168dAa4529bf88369ac8c1ABA5A2ad8CF2A61Fb9',
            name: 'decentralizedtransactions.eth',
        },
        assetIconSrc: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
        assetSymbol: 'ETH',
        assetAmount: 1,
        assetName: 'Ethereum',
        assetAddress: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
        assetFiatPrice: 3850,
        chainId: 1,
    },
};

/**
 * Fallback usage example of the AssetTransfer component with only required props.
 */
export const Fallback: Story = {
    args: {
        sender: { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' },
        recipient: { address: '0x168dAa4529bf88369ac8c1ABA5A2ad8CF2A61Fb9' },
        assetName: 'Ethereum',
        assetSymbol: 'ETH',
        assetAmount: 1,
        assetAddress: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
    },
};

export default meta;
