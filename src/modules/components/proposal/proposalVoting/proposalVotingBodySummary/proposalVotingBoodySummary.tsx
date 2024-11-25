import type { ReactNode } from 'react';
import { useProposalVotingStageContext } from '../proposalVotingStageContext';

export interface IProposalVotingBodySummaryProps {
    /**
     * Children to render (proposal voting body buttons + custom footer).
     */
    children: ReactNode;
}

export const ProposalVotingBodySummary: React.FC<IProposalVotingBodySummaryProps> = (props) => {
    const { children } = props;

    const { activeBody } = useProposalVotingStageContext();

    if (activeBody) {
        return null;
    }

    return <div className="flex w-full flex-col gap-3">{children}</div>;
};
