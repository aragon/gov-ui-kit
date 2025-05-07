import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Avatar, AvatarIcon, DataListItem, IconType, type IDataListItemProps } from '../../../../../core';
import type { IBrandedIdentity } from '../proposalVotingDefinitions';
import { useProposalVotingStageContext } from '../proposalVotingStageContext';

export type IProposalVotingBodySummaryListItemProps = IDataListItemProps & {
    /**
     * ID of the body.
     */
    id: string;
    /**
     * Branded identity assets for an external body.
     */
    brandedExternal?: IBrandedIdentity;
    /**
     * Children to render.
     */
    children: ReactNode;
};

export const ProposalVotingBodySummaryListItem: React.FC<IProposalVotingBodySummaryListItemProps> = (props) => {
    const { id, children, brandedExternal, className, ...otherProps } = props;

    const { setActiveBody } = useProposalVotingStageContext();

    return (
        <DataListItem
            onClick={() => setActiveBody?.(id)}
            className={classNames('flex items-center justify-between p-6', className)}
            {...otherProps}
        >
            <div className="flex items-center gap-x-2 md:gap-x-3">
                {brandedExternal != null && (
                    <Avatar src={brandedExternal.logo} size="sm" responsiveSize={{ md: 'md' }} />
                )}
                {children}
            </div>
            <AvatarIcon icon={IconType.CHEVRON_RIGHT} />
        </DataListItem>
    );
};
