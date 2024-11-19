import { createContext, useContext } from 'react';

export interface IProposalActionsContext {
    /**
     * Total number of proposal actions.
     */
    actionsCount: number;
    /**
     * List of the expanded actions ids.
     */
    expandedActions: string[];
    /**
     * Callback used to update the current expanded actions.
     */
    setExpandedActions: (items: string[]) => void;
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
