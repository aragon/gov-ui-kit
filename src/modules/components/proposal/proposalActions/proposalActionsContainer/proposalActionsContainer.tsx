import React, { Children, useEffect, useMemo, type ComponentProps } from 'react';
import { Accordion, CardEmptyState } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { useProposalActionsContext } from '../proposalActionsContext';
import type { IProposalActionsItemProps } from '../proposalActionsItem';

export interface IProposalActionsContainerProps extends Omit<ComponentProps<'div'>, 'defaultValue'> {
    /**
     * Custom description for the empty state.
     */
    emptyStateDescription: string;
}

export const ProposalActionsContainer: React.FC<IProposalActionsContainerProps> = (props) => {
    const { emptyStateDescription, children, className, ...otherProps } = props;

    const { copy } = useGukModulesContext();
    const { actionsCount, setActionsCount, expandedActions, setExpandedActions } = useProposalActionsContext();

    const processedChildren = useMemo(() => Children.toArray(children), [children]);
    const childrenCount = processedChildren.length;

    // Auto-expand logic:
    // - If a new action is added, expand it and collapse all others.
    // - If multiple actions have existed, but all are removed except one, leave the last one expanded.
    // - When there are no children, cleanup expanded actions with reset.
    useEffect(() => {
        if (childrenCount === 0) {
            setExpandedActions([]);
            return;
        }

        const lastChild = processedChildren[childrenCount - 1];

        if (React.isValidElement(lastChild)) {
            const value = (lastChild.props as IProposalActionsItemProps).value;
            if (value != null) {
                if (childrenCount > actionsCount || childrenCount === 1) {
                    setExpandedActions([value]);
                }
            }
        }
    }, [childrenCount, actionsCount, processedChildren, setExpandedActions]);

    // Update the actions-count context value by calculating the number of proposal-actions-item components rendered.
    useEffect(() => {
        setActionsCount(childrenCount);
    }, [childrenCount, setActionsCount]);

    const handleAccordionValueChange = (value: string[] = []) => {
        setExpandedActions(value);
    };

    return (
        <Accordion.Container
            isMulti={true}
            value={expandedActions}
            onValueChange={handleAccordionValueChange}
            {...otherProps}
        >
            {actionsCount === 0 && (
                <CardEmptyState
                    heading={copy.proposalActionsContainer.emptyHeader}
                    description={emptyStateDescription}
                    isStacked={false}
                    objectIllustration={{ object: 'SMART_CONTRACT' }}
                    className="border border-neutral-100"
                />
            )}
            {processedChildren.map((child, index) =>
                React.isValidElement<IProposalActionsItemProps>(child)
                    ? React.cloneElement(child, { ...child.props, index })
                    : child,
            )}
        </Accordion.Container>
    );
};
