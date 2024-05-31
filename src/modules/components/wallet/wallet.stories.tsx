import type { Meta, StoryObj } from '@storybook/react';
import { Wallet } from './wallet';

/**
 * Our Wallet button implementation is intentionally minimal for full flexibility.
 * As controlled component you can pass the user details and connectivity actions to the component.
 * This includes the global connected state.
 */
const meta: Meta<typeof Wallet> = {
    title: 'Modules/Components/Wallet/Wallet',
    component: Wallet,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&node-id=10451-13526&t=DIlkZ1JJt516kxyh-1',
        },
    },
};

type Story = StoryObj<typeof Wallet>;

/**
 * Default usage of the Wallet component.
 */
export const Default: Story = {};

/**
 * Example usage of a connected Wallet component with only address.
 */
export const WithAddress: Story = {
    args: {
        user: {
            address: '0x1234567890123456789012345678901234567890',
        },
        isConnected: true,
    },
    render: (props) => <Wallet {...props} />,
};

/**
 * Example usage of a connected Wallet component with additional ENS handle.
 */
export const WithEnsName: Story = {
    args: {
        user: {
            address: '0x1234567890123456789012345678901234567890',
            name: 'aragon.eth',
        },
        isConnected: true,
    },
    render: (props) => <Wallet {...props} />,
};

export default meta;
