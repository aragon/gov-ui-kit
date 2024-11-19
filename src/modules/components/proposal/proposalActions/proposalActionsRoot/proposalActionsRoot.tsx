import classNames from 'classnames';
import { useMemo, useState, type ComponentProps } from 'react';
import { ProposalActionsContextProvider } from '../proposalActionsContext';

export interface IProposalActionsRootProps extends ComponentProps<'div'> {
    /**
     * Number of proposal actions.
     */
    actionsCount: number;
}

export const ProposalActionsRoot: React.FC<IProposalActionsRootProps> = (props) => {
    const { actionsCount, children, className, ...otherProps } = props;

    const [expandedActions, setExpandedActions] = useState<string[]>([]);

    const contextValues = useMemo(
        () => ({ actionsCount, expandedActions, setExpandedActions }),
        [actionsCount, expandedActions],
    );

    return (
        <div className={classNames('flex w-full flex-col gap-3 md:gap-4')} {...otherProps}>
            <ProposalActionsContextProvider value={contextValues}>{children}</ProposalActionsContextProvider>
        </div>
    );
};
