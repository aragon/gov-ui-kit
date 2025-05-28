import classNames from 'classnames';
import type { ComponentProps } from 'react';
import { DateFormat, formatterUtils, Rerender, StatePingAnimation } from '../../../../../core';
import type { ModulesCopy } from '../../../../assets';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalStatus } from '../../proposalUtils';
import { ProposalVotingStatusAdvanceable } from './proposalVotingStatusAdvanceable';

export interface IProposalVotingStatusProps extends ComponentProps<'div'> {
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

const getMainText = (status: ProposalStatus, copy: ModulesCopy, isMultiStage?: boolean) => {
    const isSingleStagePending = !isMultiStage && status === ProposalStatus.PENDING;
    const { ACCEPTED, REJECTED, VETOED, EXPIRED, EXECUTED, EXECUTABLE } = ProposalStatus;

    if ([ACCEPTED, REJECTED, VETOED, EXPIRED, EXECUTED, EXECUTABLE].includes(status) || isSingleStagePending) {
        return copy.proposalVotingStatus.main.proposal;
    }

    return copy.proposalVotingStatus.main.stage;
};

const statusToSecondaryText = (copy: ModulesCopy): Partial<Record<ProposalStatus, string>> => ({
    [ProposalStatus.PENDING]: copy.proposalVotingStatus.secondary.pending,
    [ProposalStatus.ACTIVE]: copy.proposalVotingStatus.secondary.active,
    [ProposalStatus.ACCEPTED]: copy.proposalVotingStatus.secondary.accepted,
    [ProposalStatus.REJECTED]: copy.proposalVotingStatus.secondary.rejected,
    [ProposalStatus.EXPIRED]: copy.proposalVotingStatus.secondary.expired,
    [ProposalStatus.UNREACHED]: copy.proposalVotingStatus.secondary.unreached,
    [ProposalStatus.VETOED]: copy.proposalVotingStatus.secondary.vetoed,
    [ProposalStatus.EXECUTABLE]: copy.proposalVotingStatus.secondary.executable,
    [ProposalStatus.EXECUTED]: copy.proposalVotingStatus.secondary.executed,
});

const statusToText = (copy: ModulesCopy): Partial<Record<ProposalStatus, { className: string; label: string }>> => ({
    [ProposalStatus.ACCEPTED]: {
        className: 'text-success-800',
        label: copy.proposalVotingStatus.status.accepted,
    },
    [ProposalStatus.EXECUTABLE]: {
        className: 'text-success-800',
        label: copy.proposalVotingStatus.status.executable,
    },
    [ProposalStatus.EXECUTED]: {
        className: 'text-success-800',
        label: copy.proposalVotingStatus.status.executed,
    },
    [ProposalStatus.REJECTED]: {
        className: 'text-critical-800',
        label: copy.proposalVotingStatus.status.rejected,
    },
    [ProposalStatus.VETOED]: {
        className: 'text-critical-800',
        label: copy.proposalVotingStatus.status.vetoed,
    },
});

export const ProposalVotingStatus: React.FC<IProposalVotingStatusProps> = (props) => {
    const {
        status = ProposalStatus.PENDING,
        endDate,
        isMultiStage,
        minAdvance,
        maxAdvance,
        className,
        ...otherProps
    } = props;

    const { copy } = useGukModulesContext();

    const mainText = getMainText(status, copy, isMultiStage);
    const secondaryText = statusToSecondaryText(copy)[status];
    const statusText = statusToText(copy)[status];

    if (status === ProposalStatus.ADVANCEABLE) {
        return (
            <ProposalVotingStatusAdvanceable
                minAdvance={minAdvance}
                maxAdvance={maxAdvance}
                className={className}
                {...otherProps}
            />
        );
    }

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
