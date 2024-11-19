import classNames from 'classnames';
import React, { Children, useEffect, type ComponentProps } from 'react';
import { Accordion, Card, EmptyState } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { useProposalActionsContext } from '../proposalActionsContext';
import type { IProposalActionsItemProps } from '../proposalActionsItem';

export interface IProposalActionsContainerProps extends ComponentProps<'div'> {
    /**
     * Custom description for the empty state.
     */
    emptyStateDescription: string;
}

export const ProposalActionsContainer: React.FC<IProposalActionsContainerProps> = (props) => {
    const { emptyStateDescription, children, className, ...otherProps } = props;

    const { copy } = useGukModulesContext();
    const { actionsCount, setActionsCount, expandedActions, setExpandedActions } = useProposalActionsContext();

    const processedChildren = Children.toArray(children);
    const childrenCount = processedChildren.length;

    // Update the actions-count context value by calculating the number of proposal-actions-item components rendered.
    useEffect(() => setActionsCount(childrenCount), [childrenCount, setActionsCount]);

    const handleAccordionValueChange = (value: string[] = []) => setExpandedActions(value);

    return (
        <Card className={classNames('w-full overflow-hidden', className)} {...otherProps}>
            <Accordion.Container isMulti={true} value={expandedActions} onValueChange={handleAccordionValueChange}>
                {actionsCount === 0 && (
                    <EmptyState
                        heading={copy.proposalActionsContainer.emptyHeader}
                        description={emptyStateDescription}
                        isStacked={false}
                        objectIllustration={{ object: 'SMART_CONTRACT' }}
                    />
                )}
                {processedChildren.map((child, index) =>
                    React.isValidElement<IProposalActionsItemProps>(child)
                        ? React.cloneElement(child, { ...child.props, index })
                        : child,
                )}
            </Accordion.Container>
        </Card>
    );
};
