import { createContext, useContext } from 'react';
import type { IProposalVotingStageProps } from '../proposalVotingStage/proposalVotingStage';

export interface IProposalVotingStageContext extends Pick<IProposalVotingStageProps, 'startDate' | 'endDate'> {
    /**
     * List of plugin addresses to be displayed in the body summary list.
     */
    bodyList?: string[];
    /**
     * The active body to be displayed.
     */
    activeBody?: string;
    /**
     * Function to set the active body.
     */
    setActiveBody?: (id: string | undefined) => void;
}

const proposalVotingStageContext = createContext<IProposalVotingStageContext | null>(null);

export const ProposalVotingStageContextProvider = proposalVotingStageContext.Provider;

export const useProposalVotingStageContext = (): IProposalVotingStageContext => {
    const values = useContext(proposalVotingStageContext);

    if (values === null) {
        throw new Error(
            'useProposalVotingStageContext: the hook must be used inside a ProposalVotingStageContextProvider to work property.',
        );
    }

    return values;
};
