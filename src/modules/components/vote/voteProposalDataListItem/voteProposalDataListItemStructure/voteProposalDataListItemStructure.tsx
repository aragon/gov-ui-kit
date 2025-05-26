import classNames from 'classnames';
import { DataList, DateFormat, Tag, formatterUtils, type IDataListItemProps } from '../../../../../core';
import { voteIndicatorToTagVariant, type VoteIndicator } from '../../voteUtils';

export type IVoteProposalDataListItemStructureProps = IDataListItemProps & {
    /**
     * The ID of proposal.
     */
    proposalId: string;
    /**
     * The title of the proposal the user voted on.
     */
    proposalTitle: string;
    /**
     * The vote of the user.
     */
    voteIndicator: VoteIndicator;
    /**
     * Additional description for the vote indicator, displayed after the tag.
     */
    voteIndicatorDescription?: string;
    /**
     *  Date of the vote on the proposal in ISO format or as a timestamp
     */
    date?: number | string;
    /**
     *   Custom label for the tag
     */
    confirmationLabel?: string;
};

export const VoteProposalDataListItemStructure: React.FC<IVoteProposalDataListItemStructureProps> = (props) => {
    const {
        proposalTitle,
        proposalId,
        voteIndicator,
        voteIndicatorDescription,
        date,
        confirmationLabel,
        className,
        ...otherProps
    } = props;

    const voteIndicatorLabel = voteIndicator === 'yesVeto' ? 'Yes' : voteIndicator === 'noVeto' ? 'No' : voteIndicator;

    return (
        <DataList.Item
            className={classNames(
                'flex min-w-0 flex-col justify-center gap-x-3 gap-y-1 py-3 md:gap-x-4 md:gap-y-1.5 md:py-5 md:text-lg',
                className,
            )}
            {...otherProps}
        >
            <div className="flex w-full items-center gap-x-1 leading-tight md:gap-x-1.5 md:text-lg">
                <p className="max-w-full shrink-0 truncate text-neutral-500">{proposalId}</p>
                <p className="truncate text-neutral-800">{proposalTitle}</p>
            </div>
            <div className="flex items-center gap-x-4 text-sm leading-tight text-neutral-500 md:gap-x-6 md:text-base">
                <div className="flex items-center gap-x-1 md:gap-x-2">
                    {confirmationLabel && <span>{confirmationLabel}</span>}
                    <Tag
                        variant={voteIndicatorToTagVariant[voteIndicator]}
                        className="capitalize"
                        label={voteIndicatorLabel}
                        data-testid="tag"
                    />
                    {voteIndicatorDescription && <span className="whitespace-nowrap">{voteIndicatorDescription}</span>}
                </div>
                {date && <p className="mx-1">{formatterUtils.formatDate(date, { format: DateFormat.RELATIVE })}</p>}
            </div>
        </DataList.Item>
    );
};
