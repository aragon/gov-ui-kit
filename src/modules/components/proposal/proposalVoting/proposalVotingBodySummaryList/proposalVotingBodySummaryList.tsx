import type { PropsWithChildren, ReactNode } from 'react';

export interface IProposalVotingBodySummaryListProps {
    /**
     * Children to render.
     */
    children: ReactNode;
}

export const ProposalVotingBodySummaryList: React.FC<PropsWithChildren<IProposalVotingBodySummaryListProps>> = (
    props,
) => {
    const { children } = props;

    return <div className="flex w-full flex-col gap-3">{children}</div>;
};
