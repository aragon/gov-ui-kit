import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState, type ComponentProps } from 'react';
import { ProposalActionsContextProvider } from '../proposalActionsContext';

export interface IProposalActionsRootProps extends ComponentProps<'div'> {
    /**
     * Number of proposal actions needed to handle the toggle-all logic. This is also calculated and set at runtime from
     * the number of children of the ProposalActions.Container component. To be set to render a correct view when the
     * component is rendered on the server side.
     * @default 0
     */
    actionsCount?: number;
    /**
     * List of actions ids that are expanded. To be used for controlling the expanded / collapsed states.
     */
    expandedActions?: string[];
    /**
     * Callback called when the expanded state of an action changes.
     */
    onExpandedActionsChange?: (expandedActions: string[]) => void;
}

export const ProposalActionsRoot: React.FC<IProposalActionsRootProps> = (props) => {
    const {
        actionsCount: actionsCountProp = 0,
        expandedActions: expandedActionsProp,
        onExpandedActionsChange,
        children,
        className,
        ...otherProps
    } = props;

    const [expandedActions, setExpandedActions] = useState(expandedActionsProp ?? []);
    const [actionsCount, setActionsCount] = useState(actionsCountProp);

    const updateExpandedActions = useCallback(
        (expandedActions: string[]) => {
            const callback = onExpandedActionsChange ?? setExpandedActions;
            callback(expandedActions);
        },
        [onExpandedActionsChange],
    );

    // Update expandedActions array on property change
    useEffect(() => setExpandedActions(expandedActionsProp ?? []), [expandedActionsProp]);

    const contextValues = useMemo(
        () => ({ actionsCount, setActionsCount, expandedActions, setExpandedActions: updateExpandedActions }),
        [actionsCount, expandedActions, updateExpandedActions],
    );

    return (
        <div className={classNames('flex w-full flex-col gap-3 md:gap-4')} {...otherProps}>
            <ProposalActionsContextProvider value={contextValues}>{children}</ProposalActionsContextProvider>
        </div>
    );
};
