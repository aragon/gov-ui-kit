import type { ReactNode } from 'react';

export interface IProposalVotingBodySummaryListProps {
    /**
     * Children to render (List of bodies).
     */
    children: ReactNode;
}

export const ProposalVotingBodySummaryList: React.FC<IProposalVotingBodySummaryListProps> = (props) => {
    const { children } = props;

    return <div className="flex w-full flex-col gap-3">{children}</div>;
};
