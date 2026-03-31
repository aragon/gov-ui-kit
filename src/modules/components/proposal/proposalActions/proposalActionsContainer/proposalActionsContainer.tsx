import React, { Children, type ComponentProps, useEffect } from 'react';
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
    const { emptyStateDescription, children, ...otherProps } = props;

    const { copy } = useGukModulesContext();
    const { actionsCount, setActionsCount, expandedActions, setExpandedActions, isLoading } =
        useProposalActionsContext();

    const processedChildren = Children.toArray(children);
    const childrenCount = processedChildren.length;

    useEffect(() => {
        if (!isLoading) {
            setActionsCount(childrenCount);
        }
    }, [childrenCount, isLoading, setActionsCount]);

    const handleAccordionValueChange = (value: string[] = []) => setExpandedActions(value);

    return (
        <Accordion.Container
            isMulti={true}
            onValueChange={handleAccordionValueChange}
            value={expandedActions}
            {...otherProps}
        >
            {actionsCount === 0 && (
                <CardEmptyState
                    className="border border-neutral-100"
                    description={emptyStateDescription}
                    heading={copy.proposalActionsContainer.emptyHeader}
                    isStacked={false}
                    objectIllustration={{ object: 'SMART_CONTRACT' }}
                />
            )}
            {isLoading
                ? // biome-ignore lint/suspicious/noArrayIndexKey: skeleton loaders have no stable identity
                  Array.from({ length: actionsCount }).map((_, index) => <ProposalActionsItemSkeleton key={index} />)
                : processedChildren.map((child, index) =>
                      React.isValidElement<IProposalActionsItemProps>(child)
                          ? React.cloneElement(child, { ...child.props, index })
                          : child,
                  )}
        </Accordion.Container>
    );
};
