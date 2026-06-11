import { TransactionDetailAction } from './transactionDetailAction';
import { TransactionDetailContainer } from './transactionDetailContainer';
import { TransactionDetailFooter } from './transactionDetailFooter';
import { TransactionDetailRoot } from './transactionDetailRoot';

export const TransactionDetail = {
    Root: TransactionDetailRoot,
    Container: TransactionDetailContainer,
    Action: TransactionDetailAction,
    Footer: TransactionDetailFooter,
};

export * from './transactionDetailAction';
export * from './transactionDetailContainer';
export * from './transactionDetailContext';
export * from './transactionDetailFooter';
export * from './transactionDetailRoot';
