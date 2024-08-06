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
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { proposalStatusToTagVariant, type ProposalStatus } from '../../proposalUtils';
import { type IProposalDataListItemStructureProps } from '../proposalDataListItemStructure';
import { proposalDataListItemUtils } from '../proposalDataListItemUtils';

export interface IProposalDataListItemStatusProps
    extends Pick<IProposalDataListItemStructureProps, 'date' | 'status' | 'voted'> {}

const proposalStatusToPingVariant: Map<ProposalStatus, StatePingAnimationVariant> = new Map([
    ['active', 'info'],
    ['challenged', 'warning'],
    ['vetoed', 'warning'],
]);

const getFormattedProposalDate = (date: string | number, now: number, copy: ModulesCopy) => {
    const formattedDuration = formatterUtils.formatDate(date, { format: DateFormat.DURATION });

    const suffix =
        new Date(date).getTime() > now ? copy.proposalDataListItemStatus.left : copy.proposalDataListItemStatus.ago;

    return `${formattedDuration} ${suffix}`;
};

export const ProposalDataListItemStatus: React.FC<IProposalDataListItemStatusProps> = (props) => {
    const { date, status, voted } = props;

    const isOngoing = proposalDataListItemUtils.isOngoingStatus(status);
    const isOngoingAndVoted = isOngoing && voted;
    const showStatusMetadata = status !== 'draft';

    const { copy } = useOdsModulesContext();

    return (
        <div className="flex items-center gap-x-4 md:gap-x-6">
            <Tag label={status} variant={proposalStatusToTagVariant[status]} className="shrink-0 capitalize" />
            {showStatusMetadata && (
                <div className="flex flex-1 items-center justify-end gap-x-2 md:gap-x-3">
                    <span
                        className={classNames('text-sm leading-tight md:text-base', {
                            'text-info-800': status === 'active',
                            'text-warning-800': status === 'challenged' || status === 'vetoed',
                            'text-neutral-800': isOngoing === false,
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
