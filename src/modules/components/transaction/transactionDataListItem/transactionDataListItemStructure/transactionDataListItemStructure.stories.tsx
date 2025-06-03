import type { Meta, StoryObj } from '@storybook/react-webpack5';
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
export const Default: Story = {};

/**
 * Example of the TransactionDataList component with withdraw transaction.
 */
export const Withdraw: Story = {
    args: {
        status: TransactionStatus.SUCCESS,
        type: TransactionType.WITHDRAW,
        tokenAmount: 10,
        tokenSymbol: 'ETH',
        date: 1613984914000,
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
        date: 1613984914000,
    },
};

export default meta;
