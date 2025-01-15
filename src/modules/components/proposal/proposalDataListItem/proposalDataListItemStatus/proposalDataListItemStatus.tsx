import classNames from 'classnames';
import {
    AvatarIcon,
    DateFormat,
    formatterUtils,
    IconType,
    Rerender,
    StatePingAnimation,
    Tag,
    type StatePingAnimationVariant,
} from '../../../../../core';
import type { ModulesCopy } from '../../../../assets';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalStatus, proposalStatusToTagVariant } from '../../proposalUtils';
import { type IProposalDataListItemStructureProps } from '../proposalDataListItemStructure';

export interface IProposalDataListItemStatusProps
    extends Pick<IProposalDataListItemStructureProps, 'date' | 'status' | 'voted' | 'statusContext'> {}

const proposalStatusToPingVariant = new Map<ProposalStatus, StatePingAnimationVariant>([
    [ProposalStatus.ACTIVE, 'info'],
]);

const getFormattedProposalDate = (date: string | number, now: number, copy: ModulesCopy) => {
    const formattedDuration = formatterUtils.formatDate(date, { format: DateFormat.DURATION })!;

    const suffix =
        new Date(date).getTime() > now ? copy.proposalDataListItemStatus.left : copy.proposalDataListItemStatus.ago;

    return `${formattedDuration} ${suffix}`;
};

export const ProposalDataListItemStatus: React.FC<IProposalDataListItemStatusProps> = (props) => {
    const { date, status, statusContext, voted } = props;

    const isActive = status === ProposalStatus.ACTIVE;
    const showStatusContext =
        statusContext != null && (status === ProposalStatus.ACTIVE || status === ProposalStatus.ADVANCEABLE);
    const showStatusMetadata = status !== ProposalStatus.DRAFT;

    const { copy } = useGukModulesContext();

    return (
        <div className="flex min-h-6 w-full items-center justify-between gap-x-4 md:gap-x-6">
            <div className="flex min-w-0 items-center gap-x-1">
                <Tag
                    label={copy.proposalDataListItemStatus.statusLabel[status]}
                    variant={proposalStatusToTagVariant[status]}
                    className="shrink-0"
                />
                {showStatusContext && (
                    <div className="truncate text-sm leading-tight md:text-base">
                        <span className="text-neutral-500">{copy.proposalDataListItemStatus.in} </span>
                        {statusContext}
                    </div>
                )}
            </div>
            {showStatusMetadata && (
                <div className="flex items-center gap-x-2 md:gap-x-3">
                    <span
                        className={classNames('text-sm leading-tight md:text-base', {
                            'text-info-800': status === ProposalStatus.ACTIVE,
                            'text-warning-800': status === ProposalStatus.VETOED,
                            'text-neutral-800': !isActive,
                        })}
                    >
                        {isActive && voted && copy.proposalDataListItemStatus.voted}
                        {(!isActive || !voted) && date != null && (
                            <Rerender>{(now) => getFormattedProposalDate(date, now, copy)}</Rerender>
                        )}
                    </span>
                    {isActive && voted && <AvatarIcon icon={IconType.CHECKMARK} size="sm" />}
                    {isActive && !voted && <StatePingAnimation variant={proposalStatusToPingVariant.get(status)} />}
                    {!isActive && date && !voted && <AvatarIcon icon={IconType.CALENDAR} size="sm" />}
                </div>
            )}
        </div>
    );
};
