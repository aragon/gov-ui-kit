import { createContext, useContext } from 'react';

export interface IProposalActionsContext {
    /**
     * Total number of proposal actions.
     */
    actionsCount: number;
    /**
     * Callback used to update the actions count.
     */
    setActionsCount: (count: number) => void;
    /**
     * List of the expanded actions ids.
     */
    expandedActions: string[];
    /**
     * Callback used to update the current expanded actions.
     */
    setExpandedActions: (items: string[]) => void;
    /**
     * Whether or not the list of actions has loaded.
     */
    isLoading: boolean;
}

export const proposalActionsContext = createContext<IProposalActionsContext | null>(null);

export const ProposalActionsContextProvider = proposalActionsContext.Provider;

export const useProposalActionsContext = (): IProposalActionsContext => {
    const values = useContext(proposalActionsContext);

    if (values === null) {
        throw new Error(
            'useProposalActionsContext: the hook must be used inside a ProposalActionsContextProvider to work property.',
        );
    }

    return values;
};
