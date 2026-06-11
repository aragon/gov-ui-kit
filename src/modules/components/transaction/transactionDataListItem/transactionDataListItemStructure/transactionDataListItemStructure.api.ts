import type { Hash } from 'viem';
import type { IDataListItemProps } from '../../../../../core';

export enum TransactionStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAW = 'WITHDRAW',
    ACTION = 'ACTION',
    EXECUTION = 'EXECUTION',
}

export type ITransactionDataListItemProps = IDataListItemProps & {
    /**
     * The chain ID of the transaction.
     */
    chainId: number;
    /**
     * The symbol of the token (e.g. 'ETH').
     */
    tokenSymbol: string;
    /**
     * The token value in the transaction.
     */
    tokenAmount?: number | string;
    /**
     * Label of the executor for `TransactionType.EXECUTION` transactions, rendered as `Executed {label}`. Accepts a
     * human-readable plugin name (e.g. 'Token Voting') or an address, which gets truncated automatically.
     */
    label?: string;
    /**
     * Number of actions bundled in a `TransactionType.EXECUTION` transaction. Rendered as the right-side value
     * (e.g. '5 actions') in place of the token amount.
     */
    actionCount?: number;
    /**
     * The price of the transaction in USD.
     */
    amountUsd?: number | string;
    /**
     *  Whether to hide the value of the transaction (USD price).
     */
    hideValue?: boolean;
    /**
     * The type of transaction.
     * @default TransactionType.ACTION
     */
    type?: TransactionType;
    /**
     * The current status of a blockchain transaction on the network.
     * @default TransactionStatus.PENDING
     */
    status?: TransactionStatus;
    /**
     * Date of transaction in ISO format or as a timestamp.
     */
    date: number | string;
    /**
     * The hash of the transaction.
     */
    hash?: Hash;
};
