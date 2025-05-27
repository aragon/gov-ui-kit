import classNames from 'classnames';
import type { ComponentProps } from 'react';
import { DateFormat, formatterUtils, Rerender, StatePingAnimation } from '../../../../../core';
import type { ModulesCopy } from '../../../../assets';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalStatus } from '../../proposalUtils';
import { ProposalVotingStageStatusAdvanceable } from './proposalVotingStageStatusAdvanceable';

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

const statusToSecondaryText = (copy: ModulesCopy): Partial<Record<ProposalStatus, string>> => ({
    [ProposalStatus.PENDING]: copy.proposalVotingStageStatus.secondary.pending,
    [ProposalStatus.ACTIVE]: copy.proposalVotingStageStatus.secondary.active,
    [ProposalStatus.ACCEPTED]: copy.proposalVotingStageStatus.secondary.accepted,
    [ProposalStatus.REJECTED]: copy.proposalVotingStageStatus.secondary.rejected,
    [ProposalStatus.EXPIRED]: copy.proposalVotingStageStatus.secondary.expired,
    [ProposalStatus.UNREACHED]: copy.proposalVotingStageStatus.secondary.unreached,
    [ProposalStatus.VETOED]: copy.proposalVotingStageStatus.secondary.vetoed,
    [ProposalStatus.EXECUTABLE]: copy.proposalVotingStageStatus.secondary.executable,
    [ProposalStatus.EXECUTED]: copy.proposalVotingStageStatus.secondary.executed,
});

const statusToStatusText = (
    copy: ModulesCopy,
): Partial<Record<ProposalStatus, { className: string; label: string }>> => ({
    [ProposalStatus.ACCEPTED]: {
        className: 'text-success-800',
        label: copy.proposalVotingStageStatus.status.accepted,
    },
    [ProposalStatus.EXECUTABLE]: {
        className: 'text-success-800',
        label: copy.proposalVotingStageStatus.status.executable,
    },
    [ProposalStatus.EXECUTED]: {
        className: 'text-success-800',
        label: copy.proposalVotingStageStatus.status.executed,
    },
    [ProposalStatus.REJECTED]: {
        className: 'text-critical-800',
        label: copy.proposalVotingStageStatus.status.rejected,
    },
    [ProposalStatus.VETOED]: {
        className: 'text-critical-800',
        label: copy.proposalVotingStageStatus.status.vetoed,
    },
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

    const mainText = getStatusText(status, copy, isMultiStage);
    const secondaryText = statusToSecondaryText(copy)[status];

    if (status === ProposalStatus.ADVANCEABLE) {
        return (
            <ProposalVotingStageStatusAdvanceable
                minAdvance={minAdvance}
                maxAdvance={maxAdvance}
                className={className}
                {...otherProps}
            />
        );
    }

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
                {status !== ProposalStatus.ACTIVE && <span className="text-neutral-800">{mainText}</span>}
                <span className="text-neutral-500">{secondaryText}</span>
                {statusText && <span className={statusText.className}>{statusText.label}</span>}
            </div>
            {status === ProposalStatus.ACTIVE && <StatePingAnimation variant="primary" />}
        </div>
    );
};
