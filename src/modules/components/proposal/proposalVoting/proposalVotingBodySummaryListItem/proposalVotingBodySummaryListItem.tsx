import type { PropsWithChildren } from 'react';
import { AvatarIcon, DataListItem, IconType } from '../../../../../core';
import { useProposalVotingStageContext } from '../proposalVotingStageContext';

export interface IProposalVotingBodySummaryListItemProps {
    /**
     * ID of the body.
     */
    id: string;
}

export const ProposalVotingBodySummaryListItem: React.FC<PropsWithChildren<IProposalVotingBodySummaryListItemProps>> = (
    props,
) => {
    const { id, children } = props;

    const { setActiveBody } = useProposalVotingStageContext();

    return (
        <DataListItem onClick={() => setActiveBody(id)} className="flex items-center justify-between gap-3 p-6">
            {children}
            <AvatarIcon icon={IconType.CHEVRON_RIGHT} />
        </DataListItem>
    );
};
