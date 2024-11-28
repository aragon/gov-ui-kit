import type { ReactNode } from 'react';
import { AvatarIcon, DataListItem, IconType, type IDataListItemProps } from '../../../../../core';
import { useProposalVotingStageContext } from '../proposalVotingStageContext';

export type IProposalVotingBodySummaryListItemProps = IDataListItemProps & {
    /**
     * ID of the body.
     */
    id: string;
    /**
     * Children to render.
     */
    children: ReactNode;
};

export const ProposalVotingBodySummaryListItem: React.FC<IProposalVotingBodySummaryListItemProps> = (props) => {
    const { id, children, ...otherProps } = props;

    const { setActiveBody } = useProposalVotingStageContext();

    return (
        <DataListItem
            {...otherProps}
            onClick={() => setActiveBody?.(id)}
            className="flex items-center justify-between gap-3 p-6"
        >
            {children}
            <AvatarIcon icon={IconType.CHEVRON_RIGHT} />
        </DataListItem>
    );
};
