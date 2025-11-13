import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState, type ComponentProps } from 'react';
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
    /**
     * Whether or not the list of actions is loading.
     * @default false
     */
    isLoading?: boolean;
}

export const ProposalActionsRoot: React.FC<IProposalActionsRootProps> = (props) => {
    const {
        actionsCount: actionsCountProp = 0,
        expandedActions: expandedActionsProp,
        onExpandedActionsChange,
        isLoading = false,
        children,
        className,
        ...otherProps
    } = props;

    // Determine if component is controlled
    const isControlled = expandedActionsProp !== undefined;

    const [expandedActionsState, setExpandedActionsState] = useState(expandedActionsProp ?? []);
    const [actionsCount, setActionsCount] = useState(actionsCountProp);

    // Use controlled value if provided, otherwise use internal state
    const expandedActions = isControlled ? expandedActionsProp : expandedActionsState;

    const updateExpandedActions = useCallback(
        (newExpandedActions: string[]) => {
            if (onExpandedActionsChange) {
                // Controlled: call the callback
                onExpandedActionsChange(newExpandedActions);
            } else {
                // Uncontrolled: update internal state
                setExpandedActionsState(newExpandedActions);
            }
        },
        [onExpandedActionsChange],
    );

    // Only sync prop to state when component switches from uncontrolled to controlled
    // or on initial mount (not on every prop change)
    const wasControlled = useRef(isControlled);
    useEffect(() => {
        if (isControlled && !wasControlled.current && expandedActionsProp) {
            setExpandedActionsState(expandedActionsProp);
        }
        wasControlled.current = isControlled;
    }, [isControlled, expandedActionsProp]);

    const contextValues = useMemo(
        () => ({
            actionsCount,
            setActionsCount,
            expandedActions,
            setExpandedActions: updateExpandedActions,
            isLoading,
        }),
        [actionsCount, expandedActions, updateExpandedActions, isLoading],
    );

    return (
        <div className={classNames('flex w-full flex-col gap-3 md:gap-4')} {...otherProps}>
            <ProposalActionsContextProvider value={contextValues}>{children}</ProposalActionsContextProvider>
        </div>
    );
};
