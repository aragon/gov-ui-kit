import classNames from 'classnames';
import type { ComponentProps } from 'react';
import {
    AvatarIcon,
    type AvatarIconVariant,
    DateFormat,
    formatterUtils,
    IconType,
    Rerender,
    Spinner,
    StatePingAnimation,
} from '../../../../../core';
import type { ModulesCopy } from '../../../../assets';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalVotingStatus } from '../../proposalUtils';

export interface IProposalVotingStageStatusProps extends ComponentProps<'div'> {
    /**
     * Status of the proposal.
     * @default ProposalVotingStatus.PENDING
     */
    status?: ProposalVotingStatus;
    /**
     * End date of the proposal in timestamp or ISO format.
     */
    endDate: string | number;
    /**
     * Defines if the proposal is a multi-stage proposal.
     */
    isMultiStage?: boolean;
}

const getStatusText = (status: ProposalVotingStatus, copy: ModulesCopy, isMultiStage?: boolean) => {
    const isSingleStagePending = !isMultiStage && status === ProposalVotingStatus.PENDING;

    if ([ProposalVotingStatus.ACCEPTED, ProposalVotingStatus.REJECTED].includes(status) || isSingleStagePending) {
        return copy.proposalVotingStageStatus.main.proposal;
    }

    return copy.proposalVotingStageStatus.main.stage;
};

const statusToSecondaryText = (copy: ModulesCopy): Record<ProposalVotingStatus, string> => ({
    [ProposalVotingStatus.PENDING]: copy.proposalVotingStageStatus.secondary.pending,
    [ProposalVotingStatus.ACTIVE]: copy.proposalVotingStageStatus.secondary.active,
    [ProposalVotingStatus.ACCEPTED]: copy.proposalVotingStageStatus.secondary.accepted,
    [ProposalVotingStatus.REJECTED]: copy.proposalVotingStageStatus.secondary.rejected,
    [ProposalVotingStatus.UNREACHED]: copy.proposalVotingStageStatus.secondary.unreached,
});

const statusToIcon: Map<ProposalVotingStatus, { icon: IconType; variant: AvatarIconVariant } | undefined> = new Map([
    [ProposalVotingStatus.ACCEPTED, { icon: IconType.CHECKMARK, variant: 'success' }],
    [ProposalVotingStatus.REJECTED, { icon: IconType.CLOSE, variant: 'critical' }],
    [ProposalVotingStatus.UNREACHED, { icon: IconType.CLOSE, variant: 'neutral' }],
]);

export const ProposalVotingStageStatus: React.FC<IProposalVotingStageStatusProps> = (props) => {
    const { status = ProposalVotingStatus.PENDING, endDate, isMultiStage, className, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    const mainText = getStatusText(status, copy, isMultiStage);
    const secondaryText = statusToSecondaryText(copy)[status];
    const statusIcon = statusToIcon.get(status);

    return (
        <div className={classNames('flex flex-row items-center gap-2', className)} {...otherProps}>
            <div className="flex flex-row gap-0.5">
                {status === ProposalVotingStatus.ACTIVE && (
                    <span className="text-primary-400">
                        <Rerender>{() => formatterUtils.formatDate(endDate, { format: DateFormat.DURATION })}</Rerender>
                    </span>
                )}
                {status !== ProposalVotingStatus.ACTIVE && <span className="text-neutral-800">{mainText}</span>}
                <span className="text-neutral-500">{secondaryText}</span>
                {status === ProposalVotingStatus.ACCEPTED && (
                    <span className="text-success-800">{copy.proposalVotingStageStatus.status.accepted}</span>
                )}
                {status === ProposalVotingStatus.REJECTED && (
                    <span className="text-critical-800">{copy.proposalVotingStageStatus.status.rejected}</span>
                )}
            </div>
            {status === ProposalVotingStatus.PENDING && <Spinner size="md" variant="neutral" />}
            {status === ProposalVotingStatus.ACTIVE && <StatePingAnimation variant="primary" />}
            {statusIcon && <AvatarIcon icon={statusIcon.icon} variant={statusIcon.variant} />}
        </div>
    );
};
