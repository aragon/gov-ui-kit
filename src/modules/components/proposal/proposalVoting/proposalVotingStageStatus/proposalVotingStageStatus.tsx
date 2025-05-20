import classNames from 'classnames';
import { DateTime, Interval } from 'luxon';
import type { ComponentProps } from 'react';
import { DateFormat, formatterUtils, Rerender, StatePingAnimation } from '../../../../../core';
import type { ModulesCopy } from '../../../../assets';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalStatus } from '../../proposalUtils';

export interface IProposalVotingStageStatusProps extends ComponentProps<'div'> {
    /**
     * Status of the proposal.
     * @default ProposalStatus.PENDING
     */
    status?: ProposalStatus;
    /**
     * End date of the proposal in timestamp or ISO format.
     */
    endDate?: string | number;
    /**
     * Defines if the proposal is a multi-stage proposal.
     */
    isMultiStage?: boolean;
    /**
     * Min advance date of the proposal in timestamp or ISO format.
     */
    minAdvance?: string | number;
    /**
     * Max advance date of the proposal in timestamp or ISO format.
     */
    maxAdvance?: string | number;
}

const getStatusText = (status: ProposalStatus, copy: ModulesCopy, isMultiStage?: boolean) => {
    const isSingleStagePending = !isMultiStage && status === ProposalStatus.PENDING;
    const { ACCEPTED, REJECTED, VETOED, EXPIRED, ADVANCEABLE } = ProposalStatus;

    if ([ACCEPTED, REJECTED, VETOED, EXPIRED, ADVANCEABLE].includes(status) || isSingleStagePending) {
        return copy.proposalVotingStageStatus.main.proposal;
    }

    return copy.proposalVotingStageStatus.main.stage;
};

const statusToSecondaryText = (
    copy: ModulesCopy,
    isAdvanceableNow?: boolean,
    isShortAdvanceWindow?: boolean,
): Record<ProposalStatus, string> => ({
    [ProposalStatus.PENDING]: copy.proposalVotingStageStatus.secondary.pending,
    [ProposalStatus.ACTIVE]: copy.proposalVotingStageStatus.secondary.active,
    [ProposalStatus.ACCEPTED]: copy.proposalVotingStageStatus.secondary.accepted,
    [ProposalStatus.REJECTED]: copy.proposalVotingStageStatus.secondary.rejected,
    [ProposalStatus.EXPIRED]: copy.proposalVotingStageStatus.secondary.expired,
    [ProposalStatus.UNREACHED]: copy.proposalVotingStageStatus.secondary.unreached,
    [ProposalStatus.VETOED]: copy.proposalVotingStageStatus.secondary.vetoed,
    [ProposalStatus.ADVANCEABLE]: copy.proposalVotingStageStatus.secondary.advanceable(
        isAdvanceableNow,
        isShortAdvanceWindow,
    ),
    [ProposalStatus.DRAFT]: copy.proposalVotingStageStatus.secondary.draft,
    [ProposalStatus.EXECUTED]: copy.proposalVotingStageStatus.secondary.executed,
    [ProposalStatus.EXECUTABLE]: copy.proposalVotingStageStatus.secondary.executable,
    [ProposalStatus.FAILED]: copy.proposalVotingStageStatus.secondary.failed,
});

const statusToStatusText = (
    copy: ModulesCopy,
): Partial<Record<ProposalStatus, { className: string; label: string }>> => ({
    [ProposalStatus.ACCEPTED]: {
        className: 'text-success-800',
        label: copy.proposalVotingStageStatus.status.accepted,
    },
    [ProposalStatus.REJECTED]: {
        className: 'text-critical-800',
        label: copy.proposalVotingStageStatus.status.rejected,
    },
    [ProposalStatus.VETOED]: {
        className: 'text-critical-800',
        label: copy.proposalVotingStageStatus.status.vetoed,
    },
    [ProposalStatus.ADVANCEABLE]: {
        className: 'text-primary-400',
        label: copy.proposalVotingStageStatus.status.advanceable,
    },
});

const parseOptionalDateTime = (input?: string | number) => {
    if (!input) {
        return DateTime.invalid('no input');
    }
    if (typeof input === 'string') {
        return DateTime.fromISO(input);
    }

    return DateTime.fromMillis(input);
};

export const ProposalVotingStageStatus: React.FC<IProposalVotingStageStatusProps> = (props) => {
    const {
        status = ProposalStatus.PENDING,
        endDate,
        isMultiStage,
        className,
        minAdvance,
        maxAdvance,
        ...otherProps
    } = props;

    const { copy } = useGukModulesContext();

    const now = DateTime.now();
    const minAdvanceDate = parseOptionalDateTime(minAdvance);
    const maxAdvanceDate = parseOptionalDateTime(maxAdvance);

    const advanceWindow =
        minAdvanceDate.isValid && maxAdvanceDate.isValid
            ? Interval.fromDateTimes(minAdvanceDate, maxAdvanceDate)
            : undefined;

    const isAdvanceableNow = (status === ProposalStatus.ADVANCEABLE && advanceWindow?.contains(now)) ?? false;

    const nextAdvanceDateTime =
        now < minAdvanceDate ? minAdvanceDate : now <= maxAdvanceDate ? maxAdvanceDate : undefined;

    const isShortAdvanceWindow =
        nextAdvanceDateTime?.isValid === true && nextAdvanceDateTime.diff(now, 'days').days <= 90;

    const mainText = getStatusText(status, copy, isMultiStage);
    const secondaryText = statusToSecondaryText(copy, isAdvanceableNow, isShortAdvanceWindow)[status];

    const hideAdvanceMainText = status === ProposalStatus.ADVANCEABLE && (isShortAdvanceWindow || !isAdvanceableNow);

    const showStatusText =
        status === ProposalStatus.ACCEPTED ||
        status === ProposalStatus.REJECTED ||
        status === ProposalStatus.VETOED ||
        (status === ProposalStatus.ADVANCEABLE && isAdvanceableNow && !isShortAdvanceWindow);
    const statusText = statusToStatusText(copy)[status];

    return (
        <div className={classNames('flex flex-row items-center gap-2', className)} {...otherProps}>
            <div className="flex flex-row gap-0.5">
                {status === ProposalStatus.ACTIVE && (
                    <span className="text-primary-400">
                        <Rerender>
                            {() => formatterUtils.formatDate(endDate, { format: DateFormat.DURATION }) ?? '-'}
                        </Rerender>
                    </span>
                )}
                {status === ProposalStatus.ADVANCEABLE &&
                    nextAdvanceDateTime &&
                    (!isAdvanceableNow ? (
                        <span className="text-neutral-800">
                            <Rerender>
                                {() =>
                                    formatterUtils.formatDate(nextAdvanceDateTime, {
                                        format: DateFormat.DURATION,
                                    }) ?? '-'
                                }
                            </Rerender>
                        </span>
                    ) : isShortAdvanceWindow ? (
                        <span className="text-primary-400">
                            <Rerender>
                                {() =>
                                    formatterUtils.formatDate(nextAdvanceDateTime, {
                                        format: DateFormat.DURATION,
                                    }) ?? '-'
                                }
                            </Rerender>
                        </span>
                    ) : null)}

                {status !== ProposalStatus.ACTIVE && !hideAdvanceMainText && (
                    <span className="text-neutral-800">{mainText}</span>
                )}
                <span className="text-neutral-500">{secondaryText}</span>
                {showStatusText && <span className={statusText?.className}>{statusText?.label}</span>}
            </div>
            {(status === ProposalStatus.ACTIVE || (status === ProposalStatus.ADVANCEABLE && isAdvanceableNow)) && (
                <StatePingAnimation variant="primary" />
            )}
        </div>
    );
};
