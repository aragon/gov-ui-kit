import classNames from 'classnames';
import {
    AvatarIcon,
    DateFormat,
    IconType,
    Rerender,
    StatePingAnimation,
    Tag,
    formatterUtils,
    type StatePingAnimationVariant,
} from '../../../../../core';
import type { ModulesCopy } from '../../../../assets';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalStatus, proposalStatusToTagVariant } from '../../proposalUtils';
import { type IProposalDataListItemStructureProps } from '../proposalDataListItemStructure';
import { proposalDataListItemUtils } from '../proposalDataListItemUtils';

export interface IProposalDataListItemStatusProps
    extends Pick<IProposalDataListItemStructureProps, 'date' | 'status' | 'voted' | 'statusContext'> {}

const proposalStatusToPingVariant = new Map<ProposalStatus, StatePingAnimationVariant>([
    [ProposalStatus.ACTIVE, 'info'],
    [ProposalStatus.CHALLENGED, 'warning'],
    [ProposalStatus.VETOED, 'warning'],
]);

const getFormattedProposalDate = (date: string | number, now: number, copy: ModulesCopy) => {
    const formattedDuration = formatterUtils.formatDate(date, { format: DateFormat.DURATION })!;

    const suffix =
        new Date(date).getTime() > now ? copy.proposalDataListItemStatus.left : copy.proposalDataListItemStatus.ago;

    return `${formattedDuration} ${suffix}`;
};

export const ProposalDataListItemStatus: React.FC<IProposalDataListItemStatusProps> = (props) => {
    const { date, status, statusContext, voted } = props;

    const isOngoing = proposalDataListItemUtils.isOngoingStatus(status);
    const isOngoingAndVoted = isOngoing && voted;
    const showStatusMetadata = status !== ProposalStatus.DRAFT;

    const { copy } = useGukModulesContext();

    return (
        <div className="flex w-full items-center justify-between gap-x-4 md:gap-x-6">
            <div className="flex min-w-0 items-center gap-x-1">
                <Tag
                    label={copy.proposalDataListItemStatus.statusLabel[status]}
                    variant={proposalStatusToTagVariant[status]}
                    className="shrink-0"
                />
                {statusContext && (
                    <span className="truncate text-sm leading-tight md:text-base">
                        {copy.proposalDataListItemStatus.in(statusContext)}
                    </span>
                )}
            </div>
            {showStatusMetadata && (
                <div className="flex items-center gap-x-2 md:gap-x-3">
                    <span
                        className={classNames('text-sm leading-tight md:text-base', {
                            'text-info-800': status === ProposalStatus.ACTIVE,
                            'text-warning-800':
                                status === ProposalStatus.CHALLENGED || status === ProposalStatus.VETOED,
                            'text-neutral-800': !isOngoing,
                        })}
                    >
                        {isOngoingAndVoted && copy.proposalDataListItemStatus.voted}
                        {!isOngoingAndVoted && date != null && (
                            <Rerender>{(now) => getFormattedProposalDate(date, now, copy)}</Rerender>
                        )}
                    </span>
                    {isOngoingAndVoted && <AvatarIcon icon={IconType.CHECKMARK} responsiveSize={{ md: 'md' }} />}
                    {isOngoing && !voted && <StatePingAnimation variant={proposalStatusToPingVariant.get(status)} />}
                    {!isOngoing && !voted && date && (
                        <AvatarIcon icon={IconType.CALENDAR} responsiveSize={{ md: 'md' }} />
                    )}
                </div>
            )}
        </div>
    );
};
