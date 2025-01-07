import type { Meta, StoryObj } from '@storybook/react';
import { zeroAddress } from 'viem';
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
        assetFiatPrice: 3850,
        chainId: 1,
    },
};

/**
 * Usage example of the AssetTransfer module component with mocked Native Transfer.
 */
export const ZeroAddressAsset: Story = {
    args: {
        sender: { address: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5' },
        recipient: { address: '0x47ca69389783E0ab6B7297318F89B51c80D63bc7' },
        assetName: 'BNB Coin',
        assetSymbol: 'BNB',
        assetIconSrc: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        assetAmount: 2,
        assetAddress: zeroAddress,
        assetFiatPrice: 710,
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
        assetName: 'USDC',
        assetSymbol: 'USDC',
        assetAmount: 1,
        assetAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
};

export default meta;
