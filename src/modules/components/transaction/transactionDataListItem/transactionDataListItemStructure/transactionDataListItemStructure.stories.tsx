import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransactionDataListItemStructure } from './transactionDataListItemStructure';
import { TransactionStatus, TransactionType } from './transactionDataListItemStructure.api';

const meta: Meta<typeof TransactionDataListItemStructure> = {
    title: 'Modules/Components/Transaction/TransactionDataListItem/TransactionDataListItem.Structure',
    component: TransactionDataListItemStructure,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=445-5113&mode=design&t=qzF3muTU7z33q8EX-4',
        },
    },
    argTypes: {
        hash: {
            control: 'text',
        },
    },
};

type Story = StoryObj<typeof TransactionDataListItemStructure>;

/**
 * Default usage example of the TransactionDataList module component.
 */
export const Deposit: Story = {
    args: {
        status: TransactionStatus.SUCCESS,
        type: TransactionType.DEPOSIT,
        tokenAmount: 10,
        tokenSymbol: 'ETH',
        date: 1_613_984_914_000,
    },
};

/**
 * Example of the TransactionDataList component with withdraw transaction.
 */
export const Withdraw: Story = {
    args: {
        status: TransactionStatus.SUCCESS,
        type: TransactionType.WITHDRAW,
        tokenAmount: 10,
        tokenSymbol: 'ETH',
        date: 1_613_984_914_000,
    },
};

/**
 * Example of the TransactionDataList component with failed transaction.
 */
export const Failed: Story = {
    args: {
        status: TransactionStatus.FAILED,
        type: TransactionType.DEPOSIT,
        tokenSymbol: 'ETH',
        tokenAmount: 10,
        amountUsd: 100,
        date: 1_613_984_914_000,
    },
};

/**
 * Example of the TransactionDataList component with an execution transaction, where the executor is a named plugin
 * and the right-side value shows the number of bundled actions.
 */
export const Execution: Story = {
    args: {
        status: TransactionStatus.SUCCESS,
        type: TransactionType.EXECUTION,
        label: 'Token Voting',
        actionCount: 5,
        date: 1_613_984_914_000,
    },
};

/**
 * Example of an execution transaction where the executor is a raw address, which is truncated automatically, and a
 * single bundled action.
 */
export const ExecutionByAddress: Story = {
    args: {
        status: TransactionStatus.SUCCESS,
        type: TransactionType.EXECUTION,
        label: '0x1234567890123456789012345678901234561234',
        actionCount: 1,
        date: 1_613_984_914_000,
    },
};

/**
 * Example of the TransactionDataList component without fiat price.
 */
export const HideValue: Story = {
    args: {
        status: TransactionStatus.SUCCESS,
        type: TransactionType.DEPOSIT,
        tokenSymbol: 'ETH',
        tokenAmount: 10,
        amountUsd: 100,
        hideValue: true,
        date: 1_613_984_914_000,
    },
};

export default meta;
