import classNames from 'classnames';
import type { ComponentProps } from 'react';
import { Button } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { useProposalActionsContext } from '../proposalActionsContext';

export interface IProposalActionsFooterProps extends ComponentProps<'div'> {}

export const ProposalActionsFooter: React.FC<IProposalActionsFooterProps> = (props) => {
    const { className, children, ...otherProps } = props;

    const { actionsCount, setExpandedActions, expandedActions } = useProposalActionsContext();
    const { copy } = useGukModulesContext();

    const handleToggleAll = () => {
        if (expandedActions.length === actionsCount) {
            setExpandedActions([]);
        } else {
            setExpandedActions(Array.from({ length: actionsCount }, (_, index) => index.toString()));
        }
    };

    if (actionsCount === 0 && children == null) {
        return null;
    }

    return (
        <div
            className={classNames(
                'flex w-full flex-col justify-between gap-3 pt-3 md:flex-row-reverse md:pt-4',
                className,
            )}
            {...otherProps}
        >
            {actionsCount > 1 && (
                <Button onClick={handleToggleAll} variant="tertiary" size="md" className="shrink-0 md:w-fit">
                    {expandedActions.length === actionsCount
                        ? copy.proposalActionsContainer.collapse
                        : copy.proposalActionsContainer.expand}
                </Button>
            )}
            {children}
        </div>
    );
};
