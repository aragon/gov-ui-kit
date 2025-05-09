import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Avatar, AvatarIcon, DataListItem, IconType, type IDataListItemProps } from '../../../../../core';
import type { IProposalVotingBodyBrand } from '../proposalVotingDefinitions';
import { useProposalVotingStageContext } from '../proposalVotingStageContext';

export type IProposalVotingBodySummaryListItemProps = IDataListItemProps & {
    /**
     * ID of the body.
     */
    id: string;
    /**
     * Branded identity assets for an external body.
     */
    bodyBrand?: IProposalVotingBodyBrand;
    /**
     * Children to render.
     */
    children: ReactNode;
};

export const ProposalVotingBodySummaryListItem: React.FC<IProposalVotingBodySummaryListItemProps> = (props) => {
    const { id, children, bodyBrand, className, ...otherProps } = props;

    const { setActiveBody } = useProposalVotingStageContext();

    return (
        <DataListItem
            onClick={() => setActiveBody?.(id)}
            className={classNames('flex items-center justify-between p-6', className)}
            {...otherProps}
        >
            <div className="flex items-center gap-x-2 md:gap-x-3">
                {bodyBrand != null && <Avatar src={bodyBrand.logo} size="sm" responsiveSize={{ md: 'md' }} />}
                {children}
            </div>
            <AvatarIcon icon={IconType.CHEVRON_RIGHT} />
        </DataListItem>
    );
};
