import type { ReactNode } from 'react';
import { AvatarIcon, DataListItem, IconType } from '../../../../../core';

export interface IProposalVotingBodySummaryListItemProps {
    /**
     * ID of the body.
     */
    id: string;
    /**
     * Children to render. Body specific content for the button
     */
    children: ReactNode;
    /**
     * on click callback to set new active body
     */
    onBodyClick: (id: string) => void;
}

export const ProposalVotingBodySummaryListItem: React.FC<IProposalVotingBodySummaryListItemProps> = (props) => {
    const { id, children, onBodyClick } = props;

    return (
        <DataListItem onClick={() => onBodyClick(id)} className="flex items-center gap-3">
            {children}
            <AvatarIcon icon={IconType.CHEVRON_RIGHT} />
        </DataListItem>
    );
};
