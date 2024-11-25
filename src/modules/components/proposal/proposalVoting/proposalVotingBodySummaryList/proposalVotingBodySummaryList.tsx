import type { ReactNode } from 'react';
import { useProposalVotingStageContext } from '../proposalVotingStageContext';

export interface IProposalVotingBodySummaryListProps {
    /**
     * Children to render (List of bodies).
     */
    children: ReactNode;
}

export const ProposalVotingBodySummaryList: React.FC<IProposalVotingBodySummaryListProps> = (props) => {
    const { children } = props;

    const { activeBody } = useProposalVotingStageContext();

    if (activeBody) {
        return null;
    }

    return <div className="flex w-full flex-col gap-3">{children}</div>;
};
