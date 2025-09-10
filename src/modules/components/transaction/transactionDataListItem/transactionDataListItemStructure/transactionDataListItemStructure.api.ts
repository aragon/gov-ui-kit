import { type Hash } from 'viem';
import { type IDataListItemProps } from '../../../../../core';

export enum TransactionStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAW = 'WITHDRAW',
    ACTION = 'ACTION',
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
