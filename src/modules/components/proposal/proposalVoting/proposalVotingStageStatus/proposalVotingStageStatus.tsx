import classNames from 'classnames';
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
    canAdvance?: boolean,
    isShortWindow?: boolean,
): Record<ProposalStatus, string> => ({
    [ProposalStatus.PENDING]: copy.proposalVotingStageStatus.secondary.pending,
    [ProposalStatus.ACTIVE]: copy.proposalVotingStageStatus.secondary.active,
    [ProposalStatus.ACCEPTED]: copy.proposalVotingStageStatus.secondary.accepted,
    [ProposalStatus.REJECTED]: copy.proposalVotingStageStatus.secondary.rejected,
    [ProposalStatus.EXPIRED]: copy.proposalVotingStageStatus.secondary.expired,
    [ProposalStatus.UNREACHED]: copy.proposalVotingStageStatus.secondary.unreached,
    [ProposalStatus.VETOED]: copy.proposalVotingStageStatus.secondary.vetoed,
    [ProposalStatus.ADVANCEABLE]: copy.proposalVotingStageStatus.secondary.advanceable(canAdvance, isShortWindow),
    [ProposalStatus.DRAFT]: copy.proposalVotingStageStatus.secondary.draft,
    [ProposalStatus.EXECUTED]: copy.proposalVotingStageStatus.secondary.executed,
    [ProposalStatus.EXECUTABLE]: copy.proposalVotingStageStatus.secondary.executable,
    [ProposalStatus.FAILED]: copy.proposalVotingStageStatus.secondary.failed,
});

const isValidTimestamp = (ts: number) => Number.isFinite(ts);

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

    const now = Date.now();
    const minAdvanceTimestamp = minAdvance != null ? new Date(minAdvance).getTime() : NaN;
    const maxAdvanceTimestamp = maxAdvance != null ? new Date(maxAdvance).getTime() : NaN;

    const canAdvance =
        status === ProposalStatus.ADVANCEABLE &&
        isValidTimestamp(minAdvanceTimestamp) &&
        isValidTimestamp(maxAdvanceTimestamp) &&
        now >= minAdvanceTimestamp &&
        now <= maxAdvanceTimestamp;

    const nextAdvanceTarget =
        now < minAdvanceTimestamp ? minAdvance! : now <= maxAdvanceTimestamp ? maxAdvance! : undefined;

    const ninetyDays = 90 * 24 * 60 * 60 * 1000;
    const nextTs = nextAdvanceTarget ? new Date(nextAdvanceTarget).getTime() : NaN;
    const isShortWindow = isValidTimestamp(nextTs) && nextTs - now <= ninetyDays;

    const mainText = getStatusText(status, copy, isMultiStage);
    const secondaryText = statusToSecondaryText(copy, canAdvance, isShortWindow)[status];

    const hideAdvanceMainText = status === ProposalStatus.ADVANCEABLE && (isShortWindow || !canAdvance);

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
                    nextAdvanceTarget &&
                    (!canAdvance ? (
                        <span className="text-neutral-800">
                            <Rerender>
                                {() =>
                                    formatterUtils.formatDate(nextAdvanceTarget, {
                                        format: DateFormat.DURATION,
                                    }) ?? '-'
                                }
                            </Rerender>
                        </span>
                    ) : isShortWindow ? (
                        <span className="text-primary-400">
                            <Rerender>
                                {() =>
                                    formatterUtils.formatDate(nextAdvanceTarget, {
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
                {status === ProposalStatus.ACCEPTED && (
                    <span className="text-success-800">{copy.proposalVotingStageStatus.status.accepted}</span>
                )}
                {status === ProposalStatus.REJECTED && (
                    <span className="text-critical-800">{copy.proposalVotingStageStatus.status.rejected}</span>
                )}
                {status === ProposalStatus.VETOED && (
                    <span className="text-critical-800">{copy.proposalVotingStageStatus.status.vetoed}</span>
                )}
                {status === ProposalStatus.ADVANCEABLE && canAdvance && !isShortWindow && (
                    <span className="text-primary-400">{copy.proposalVotingStageStatus.status.advanceable}</span>
                )}
            </div>
            {(status === ProposalStatus.ACTIVE || (status === ProposalStatus.ADVANCEABLE && canAdvance)) && (
                <StatePingAnimation variant="primary" />
            )}
        </div>
    );
};
