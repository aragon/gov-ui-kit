import React, { Children, useEffect, type ComponentProps } from 'react';
import { Accordion, CardEmptyState } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { useProposalActionsContext } from '../proposalActionsContext';
import type { IProposalActionsItemProps } from '../proposalActionsItem';
import { ProposalActionsItemSkeleton } from '../proposalActionsItemSkeleton';

export interface IProposalActionsContainerProps extends Omit<ComponentProps<'div'>, 'defaultValue'> {
    /**
     * Custom description for the empty state.
     */
    emptyStateDescription: string;
}

export const ProposalActionsContainer: React.FC<IProposalActionsContainerProps> = (props) => {
    const { emptyStateDescription, children, className, ...otherProps } = props;

    const { copy } = useGukModulesContext();
    const { actionsCount, setActionsCount, expandedActions, setExpandedActions, isLoading, editMode } =
        useProposalActionsContext();

    const processedChildren = Children.toArray(children);
    const childrenCount = processedChildren.length;

    useEffect(() => {
        if (!isLoading) {
            setActionsCount(childrenCount);
        }
    }, [childrenCount, isLoading, setActionsCount]);

    // Expand all items when in edit mode
    useEffect(() => {
        if (editMode && childrenCount > 0) {
            // Extract actual value props from children (supports UUIDs or any string identifiers)
            const childValues = processedChildren
                .map((child) => {
                    if (React.isValidElement<IProposalActionsItemProps>(child)) {
                        // Use the value prop if provided, otherwise fall back to string index
                        return child.props.value ?? child.props.index?.toString();
                    }
                    return undefined;
                })
                .filter((value): value is string => value != null);

            // Only update if we have values and they're different from current state
            const currentValuesSet = new Set(expandedActions);
            const newValuesSet = new Set(childValues);
            const hasChanged =
                currentValuesSet.size !== newValuesSet.size ||
                childValues.some((val) => !currentValuesSet.has(val));

            if (childValues.length > 0 && hasChanged) {
                setExpandedActions(childValues);
            }
        }
    }, [editMode, childrenCount, processedChildren, expandedActions, setExpandedActions]);

    const handleAccordionValueChange = (value: string[] = []) => {
        // Prevent collapsing in edit mode
        if (!editMode) {
            setExpandedActions(value);
        }
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
            {isLoading
                ? Array.from({ length: actionsCount }).map((_, index) => <ProposalActionsItemSkeleton key={index} />)
                : processedChildren.map((child, index) =>
                      React.isValidElement<IProposalActionsItemProps>(child)
                          ? React.cloneElement(child, { ...child.props, index })
                          : child,
                  )}
        </Accordion.Container>
    );
};
