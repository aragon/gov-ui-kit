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
    const { ACCEPTED, REJECTED, VETOED, EXPIRED } = ProposalStatus;

    if ([ACCEPTED, REJECTED, VETOED, EXPIRED].includes(status) || isSingleStagePending) {
        return copy.proposalVotingStageStatus.main.proposal;
    }

    return copy.proposalVotingStageStatus.main.stage;
};

const statusToSecondaryText = (copy: ModulesCopy, canAdvance?: boolean): Record<ProposalStatus, string> => ({
    [ProposalStatus.PENDING]: copy.proposalVotingStageStatus.secondary.pending,
    [ProposalStatus.ACTIVE]: copy.proposalVotingStageStatus.secondary.active,
    [ProposalStatus.ACCEPTED]: copy.proposalVotingStageStatus.secondary.accepted,
    [ProposalStatus.REJECTED]: copy.proposalVotingStageStatus.secondary.rejected,
    [ProposalStatus.EXPIRED]: copy.proposalVotingStageStatus.secondary.expired,
    [ProposalStatus.UNREACHED]: copy.proposalVotingStageStatus.secondary.unreached,
    [ProposalStatus.VETOED]: copy.proposalVotingStageStatus.secondary.vetoed,
    [ProposalStatus.ADVANCEABLE]: copy.proposalVotingStageStatus.secondary.advanceable(canAdvance),
    [ProposalStatus.DRAFT]: copy.proposalVotingStageStatus.secondary.draft,
    [ProposalStatus.EXECUTED]: copy.proposalVotingStageStatus.secondary.executed,
    [ProposalStatus.EXECUTABLE]: copy.proposalVotingStageStatus.secondary.executable,
    [ProposalStatus.FAILED]: copy.proposalVotingStageStatus.secondary.failed,
});

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
    const minAdvanceTime = minAdvance != null ? new Date(minAdvance).getTime() : NaN;
    const maxAdvanceTime = maxAdvance != null ? new Date(maxAdvance).getTime() : NaN;

    const canAdvance =
        status === ProposalStatus.ADVANCEABLE &&
        !isNaN(minAdvanceTime) &&
        !isNaN(maxAdvanceTime) &&
        now >= minAdvanceTime &&
        now <= maxAdvanceTime;

    const nextAdvanceTarget = now < minAdvanceTime ? minAdvance! : now <= maxAdvanceTime ? maxAdvance! : undefined;

    const mainText = getStatusText(status, copy, isMultiStage);
    const secondaryText = statusToSecondaryText(copy, canAdvance)[status];

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
                {status === ProposalStatus.ADVANCEABLE && nextAdvanceTarget && (
                    <span className={classNames({ 'text-neutral-800': !canAdvance, 'text-primary-400': canAdvance })}>
                        <Rerender>
                            {() =>
                                formatterUtils.formatDate(nextAdvanceTarget, {
                                    format: DateFormat.DURATION,
                                }) ?? '-'
                            }
                        </Rerender>
                    </span>
                )}
                {status !== ProposalStatus.ACTIVE && status !== ProposalStatus.ADVANCEABLE && (
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
            </div>
            {status === ProposalStatus.ACTIVE && <StatePingAnimation variant="primary" />}
        </div>
    );
};
