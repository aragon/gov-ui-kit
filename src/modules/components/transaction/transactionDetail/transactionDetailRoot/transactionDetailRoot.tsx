import { type ComponentPropsWithoutRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Dialog } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { TransactionDetailContextProvider } from '../transactionDetailContext';

export interface ITransactionDetailRootProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Title displayed in the dialog header. Defaults to the localized "Executed" copy.
     */
    title?: string;
    /**
     * Callback triggered on close-button click. The close button is hidden when the property is not set.
     */
    onClose?: () => void;
    /**
     * Number of action rows. Also derived at runtime from the children of `TransactionDetail.Container`; set it to
     * render a correct view on the server side.
     * @default 0
     */
    actionsCount?: number;
    /**
     * Controlled list of expanded action-row values.
     */
    expandedActions?: string[];
    /**
     * Callback called when the expanded action rows change.
     */
    onExpandedActionsChange?: (expandedActions: string[]) => void;
}

/**
 * The `<TransactionDetail.Root />` component renders the dialog header and the scrollable content shell of an
 * execution detail dialog, and provides the context shared by `<TransactionDetail.Container />`,
 * `<TransactionDetail.Action />` and `<TransactionDetail.Footer />`. Place a `<TransactionDetailSummary />` and a
 * `<TransactionDetail.Container />` of action rows as children. It must be rendered inside a `<Dialog.Root />`.
 */
export const TransactionDetailRoot: React.FC<ITransactionDetailRootProps> = (props) => {
    const {
        title,
        onClose,
        actionsCount: actionsCountProp = 0,
        expandedActions: expandedActionsProp,
        onExpandedActionsChange,
        children,
        ...otherProps
    } = props;

    const { copy } = useGukModulesContext();

    const [expandedActions, setExpandedActions] = useState(expandedActionsProp ?? []);
    const [actionsCount, setActionsCount] = useState(actionsCountProp);

    const updateExpandedActions = useCallback(
        (updatedActions: string[]) => {
            const callback = onExpandedActionsChange ?? setExpandedActions;
            callback(updatedActions);
        },
        [onExpandedActionsChange],
    );

    useEffect(() => {
        setExpandedActions(expandedActionsProp ?? []);
    }, [expandedActionsProp]);

    const contextValues = useMemo(
        () => ({ actionsCount, setActionsCount, expandedActions, setExpandedActions: updateExpandedActions }),
        [actionsCount, expandedActions, updateExpandedActions],
    );

    return (
        <TransactionDetailContextProvider value={contextValues}>
            <Dialog.Header onClose={onClose} title={title ?? copy.transactionDetail.title} />
            <Dialog.Content {...otherProps}>
                <div className="flex w-full flex-col gap-y-2 md:gap-y-3">{children}</div>
            </Dialog.Content>
        </TransactionDetailContextProvider>
    );
};
