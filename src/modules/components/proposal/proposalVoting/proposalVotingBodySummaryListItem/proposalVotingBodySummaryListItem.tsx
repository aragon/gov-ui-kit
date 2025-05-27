import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Avatar, AvatarIcon, DataListItem, IconType, type IDataListItemProps } from '../../../../../core';
import { useProposalVotingContext } from '../proposalVotingContext';
import type { IProposalVotingBodyBrand } from '../proposalVotingDefinitions';

export type IProposalVotingBodySummaryListItemProps = IDataListItemProps & {
    /**
     * ID of the body.
     */
    id: string;
    /**
     * Brand definitions of the body.
     */
    bodyBrand?: IProposalVotingBodyBrand;
    /**
     * Children of the component.
     */
    children?: ReactNode;
};

export const ProposalVotingBodySummaryListItem: React.FC<IProposalVotingBodySummaryListItemProps> = (props) => {
    const { id, children, bodyBrand, className, ...otherProps } = props;

    const { setActiveBody } = useProposalVotingContext();

    return (
        <DataListItem
            onClick={() => setActiveBody?.(id)}
            className={classNames('flex items-center justify-between gap-4 p-6 md:gap-6', className)}
            {...otherProps}
        >
            <div className="flex grow items-center gap-x-2 md:gap-x-3">
                {bodyBrand != null && <Avatar src={bodyBrand.logo} size="sm" responsiveSize={{ md: 'md' }} />}
                {children}
            </div>
            <AvatarIcon icon={IconType.CHEVRON_RIGHT} />
        </DataListItem>
    );
};
