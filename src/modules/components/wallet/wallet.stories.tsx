import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Wallet } from './wallet';

/**
 * Our Wallet button implementation is intentionally minimal for full flexibility.
 * As a controlled component you can pass the user details and connectivity actions to the component.
 * This includes a global connected state, likely from your WAGMI provider.
 */
const meta: Meta<typeof Wallet> = {
    title: 'Modules/Components/Wallet/Wallet',
    component: Wallet,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?m=auto&node-id=10451-13526&t=DIlkZ1JJt516kxyh-1',
        },
    },
};

type Story = StoryObj<typeof Wallet>;

/**
 * Default usage of the Wallet component.
 */
export const Default: Story = {};

/**
 * Example usage of the Wallet component with only address.
 */
export const Address: Story = {
    args: {
        user: { address: '0x1234567890123456789012345678901234567890' },
    },
};

/**
 * The Wallet component resolves and displays the linked ENS name and ENS avatar of the specified address.
 */
export const ResolvedEnsData: Story = {
    args: {
        user: { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' },
    },
};

/**
 * Example usage of the Wallet component with a custom name.
 */
export const CustomName: Story = {
    args: {
        user: {
            address: '0xdafbd7d63cee88d73a51592b42f27f7fd6ab7722',
            name: 'Aragon DAO',
        },
    },
};

/**
 * Example usage of the Wallet component with a custom avatar.
 */
export const CustomAvatar: Story = {
    args: {
        user: {
            address: '0xdafbd7d63cee88d73a51592b42f27f7fd6ab7722',
            avatarSrc: 'https://aragon-1.mypinata.cloud/ipfs/Qmbtf1tLJrNFDgxyqXxaYVZt9pifarukuhNve7aMXLP9nh',
        },
    },
};

/**
 * Example usage of the Wallet component with a long name.
 */
export const LongName: Story = {
    args: {
        user: {
            address: '0xdafbd7d63cee88d73a51592b42f27f7fd6ab7722',
            name: 'alongensname.eth',
        },
    },
};

export default meta;
