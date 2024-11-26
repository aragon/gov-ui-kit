import type { PropsWithChildren } from 'react';
import { useProposalVotingStageContext } from '../proposalVotingStageContext';

export interface IProposalVotingBodySummaryProps {}

export const ProposalVotingBodySummary: React.FC<PropsWithChildren<IProposalVotingBodySummaryProps>> = (props) => {
    const { children } = props;

    const { activeBody } = useProposalVotingStageContext();

    if (activeBody) {
        return null;
    }

    return <div className="flex w-full flex-col gap-3">{children}</div>;
};
