import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransactionDetailSummary } from './transactionDetailSummary';

const meta: Meta<typeof TransactionDetailSummary> = {
    title: 'Modules/Components/Transaction/TransactionDetailSummary',
    component: TransactionDetailSummary,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw?node-id=32537-7702',
        },
    },
};

type Story = StoryObj<typeof TransactionDetailSummary>;

/**
 * Summary of an active-process based execution: the executor label is the process name with the plugin name and
 * version as helptext linking to the process detail page, and the proposal row is displayed.
 */
export const ActiveProcess: Story = {
    args: {
        chainId: 1,
        executedBy: {
            label: 'Core',
            helptext: 'SPP v1.3',
            address: '0x1234567890123456789012345678901234561234',
            href: '/processes/core',
        },
        proposalId: 'CRE-54',
        proposalHref: '/proposals/CRE-54',
        totalActions: 5,
        transactionHash: '0x9aaa00000000000000000000000000000000000000000000000000000000a08c',
        date: 1_613_984_914_000,
    },
};

/**
 * Summary of an execution that is not active-process based: the executor shows a truncated address linking to the
 * block explorer, the helptext is hidden and no proposal row is displayed.
 */
export const InactiveProcess: Story = {
    args: {
        chainId: 1,
        executedBy: { address: '0x1234567890123456789012345678901234561234' },
        totalActions: 5,
        transactionHash: '0x9aaa00000000000000000000000000000000000000000000000000000000a08c',
        date: 1_613_984_914_000,
    },
};

export default meta;
