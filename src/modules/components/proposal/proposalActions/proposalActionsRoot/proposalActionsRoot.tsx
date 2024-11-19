import classNames from 'classnames';
import { useMemo, useState, type ComponentProps } from 'react';
import { ProposalActionsContextProvider } from '../proposalActionsContext';

export interface IProposalActionsRootProps extends ComponentProps<'div'> {
    /**
     * Number of proposal actions needed to handle the toggle-all logic. This is also calculated and set at runtime from
     * the number of children of the ProposalActions.Container component. To be set to render a correct view when the
     * component is rendered on the server side.
     * @default 0
     */
    actionsCount?: number;
}

export const ProposalActionsRoot: React.FC<IProposalActionsRootProps> = (props) => {
    const { actionsCount: actionsCountProp = 0, children, className, ...otherProps } = props;

    const [expandedActions, setExpandedActions] = useState<string[]>([]);
    const [actionsCount, setActionsCount] = useState<number>(actionsCountProp);

    const contextValues = useMemo(
        () => ({ actionsCount, setActionsCount, expandedActions, setExpandedActions }),
        [actionsCount, expandedActions],
    );

    return (
        <div className={classNames('flex w-full flex-col gap-3 md:gap-4')} {...otherProps}>
            <ProposalActionsContextProvider value={contextValues}>{children}</ProposalActionsContextProvider>
        </div>
    );
};
