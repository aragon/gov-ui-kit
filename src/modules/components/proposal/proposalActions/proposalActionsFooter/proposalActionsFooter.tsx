import classNames from 'classnames';
import type { ComponentProps } from 'react';
import { Button } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { useProposalActionsContext } from '../proposalActionsContext';

export interface IProposalActionsFooterProps extends ComponentProps<'div'> {
    /**
     * List of action IDs to be used to toggle the expanded state for all the actions, defaults to the index of the actions.
     */
    actionIds?: string[];
}

export const ProposalActionsFooter: React.FC<IProposalActionsFooterProps> = (props) => {
    const { actionIds, className, children, ...otherProps } = props;

    const { actionsCount, setExpandedActions, expandedActions, isLoading } = useProposalActionsContext();
    const { copy } = useGukModulesContext();

    const handleToggleAll = () => {
        if (expandedActions.length === actionsCount) {
            setExpandedActions([]);
        } else {
            const actions = actionIds ?? Array.from({ length: actionsCount }, (_, index) => index.toString());
            setExpandedActions(actions);
        }
    };

    if (isLoading) {
        return null;
    }

    if (actionsCount === 0 && children == null) {
        return null;
    }

    return (
        <div
            className={classNames(
                'flex w-full flex-col-reverse justify-between gap-3 pt-3 md:flex-row md:pt-4',
                className,
            )}
            {...otherProps}
        >
            {children}
            {actionsCount > 1 && (
                <Button onClick={handleToggleAll} variant="tertiary" size="md" className="shrink-0 md:ml-auto">
                    {expandedActions.length === actionsCount
                        ? copy.proposalActionsFooter.collapse
                        : copy.proposalActionsFooter.expand}
                </Button>
            )}
        </div>
    );
};
