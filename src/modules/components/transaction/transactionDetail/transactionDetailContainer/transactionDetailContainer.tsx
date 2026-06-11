import React, { Children, type ComponentPropsWithoutRef, useEffect } from 'react';
import { Accordion } from '../../../../../core';
import type { ITransactionDetailActionProps } from '../transactionDetailAction';
import { useTransactionDetailContext } from '../transactionDetailContext';

export interface ITransactionDetailContainerProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'dir' | 'defaultValue'> {}

/**
 * The `<TransactionDetail.Container />` component wraps the `<TransactionDetail.Action />` rows in a multi-expandable
 * accordion controlled by the `<TransactionDetail.Root />` context, allowing several action details to be open at
 * once and enabling the expand/collapse-all control of `<TransactionDetail.Footer />`.
 */
export const TransactionDetailContainer: React.FC<ITransactionDetailContainerProps> = (props) => {
    const { children, ...otherProps } = props;

    const { setActionsCount, expandedActions, setExpandedActions } = useTransactionDetailContext();

    const processedChildren = Children.toArray(children);
    const childrenCount = processedChildren.length;

    useEffect(() => {
        setActionsCount(childrenCount);
    }, [childrenCount, setActionsCount]);

    const handleAccordionValueChange = (value: string[] = []) => setExpandedActions(value);

    return (
        <Accordion.Container
            isMulti={true}
            onValueChange={handleAccordionValueChange}
            value={expandedActions}
            {...otherProps}
        >
            {processedChildren.map((child, index) =>
                React.isValidElement<ITransactionDetailActionProps>(child)
                    ? React.cloneElement(child, { ...child.props, index })
                    : child,
            )}
        </Accordion.Container>
    );
};
