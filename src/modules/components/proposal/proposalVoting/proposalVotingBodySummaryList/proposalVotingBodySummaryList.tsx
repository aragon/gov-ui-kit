import type { PropsWithChildren } from 'react';

export interface IProposalVotingBodySummaryListProps {}

export const ProposalVotingBodySummaryList: React.FC<PropsWithChildren<IProposalVotingBodySummaryListProps>> = (
    props,
) => {
    const { children } = props;

    return <div className="flex w-full flex-col gap-3">{children}</div>;
};
