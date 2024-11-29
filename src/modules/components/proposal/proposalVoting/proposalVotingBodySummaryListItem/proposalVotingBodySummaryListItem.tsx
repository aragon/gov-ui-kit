import classNames from 'classnames';
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
    const { id, children, className, ...otherProps } = props;

    const { setActiveBody } = useProposalVotingStageContext();

    return (
        <DataListItem
            {...otherProps}
            onClick={() => setActiveBody?.(id)}
            className={classNames('flex items-center justify-between gap-3 p-6', className)}
        >
            {children}
            <AvatarIcon icon={IconType.CHEVRON_RIGHT} />
        </DataListItem>
    );
};
