import { createContext, useContext, useMemo, useState } from 'react';
import type { IProposalVotingContext, IProposalVotingContextProviderProps } from './proposalVotingContext.api';

const proposalVotingContext = createContext<IProposalVotingContext | null>(null);

export const ProposalVotingContextProvider: React.FC<IProposalVotingContextProviderProps> = (props) => {
    const { bodyList, children } = props;

    // Initialise activeBody to the first body in the list when having only one body to directly display the body
    // overview instead of the body summary list
    const initialActiveBody = bodyList != null && bodyList.length === 1 ? bodyList[0] : undefined;
    const [activeBody, setActiveBody] = useState(initialActiveBody);

    const contextValues = useMemo(() => ({ bodyList, activeBody, setActiveBody }), [bodyList, activeBody]);

    return <proposalVotingContext.Provider value={contextValues}>{children}</proposalVotingContext.Provider>;
};

export const useProposalVotingContext = (): IProposalVotingContext => {
    const values = useContext(proposalVotingContext);

    if (values === null) {
        throw new Error(
            'useProposalVotingContext: the hook must be used inside a ProposalVotingContextProvider to work property.',
        );
    }

    return values;
};
