import { createContext, useContext } from 'react';

export interface ITransactionDetailContext {
    /**
     * Total number of action rows.
     */
    actionsCount: number;
    /**
     * Callback used to update the actions count.
     */
    setActionsCount: (count: number) => void;
    /**
     * List of the expanded action-row values.
     */
    expandedActions: string[];
    /**
     * Callback used to update the current expanded action rows.
     */
    setExpandedActions: (items: string[]) => void;
}

export const transactionDetailContext = createContext<ITransactionDetailContext | null>(null);

export const TransactionDetailContextProvider = transactionDetailContext.Provider;

export const useTransactionDetailContext = (): ITransactionDetailContext => {
    const values = useContext(transactionDetailContext);

    if (values === null) {
        throw new Error(
            'useTransactionDetailContext: the hook must be used inside a TransactionDetail.Root component to work properly.',
        );
    }

    return values;
};
