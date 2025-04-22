import classNames from 'classnames';
import { AvatarIcon, IconType, Tabs, type AvatarIconVariant, type ITabsContentProps } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalVotingStatus } from '../../proposalUtils';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

export interface IProposalVotingBreakdownExternalProps extends Omit<ITabsContentProps, 'value'> {
    /**
     * Status of the proposal.
     */
    status: ProposalVotingStatus;
    /**
     * Defines if the voting is optimistic or not.
     */
    isOptimistic: boolean;
}

// Just an internal type to help with the mapping (ProposalVotingStatus -> VotingPhase -> UI properties).
type VotingPhase = 'pending' | 'success' | 'failure';

const statusToPhase: Record<ProposalVotingStatus, VotingPhase> = {
    [ProposalVotingStatus.PENDING]: 'pending',
    [ProposalVotingStatus.ACTIVE]: 'pending',
    [ProposalVotingStatus.ACCEPTED]: 'success',
    [ProposalVotingStatus.REJECTED]: 'failure',
    [ProposalVotingStatus.EXPIRED]: 'failure',
    [ProposalVotingStatus.UNREACHED]: 'failure',
    [ProposalVotingStatus.VETOED]: 'failure',
};

const phaseToIcon = new Map<VotingPhase, { icon: IconType; variant: AvatarIconVariant } | undefined>([
    ['success', { icon: IconType.CHECKMARK, variant: 'success' }],
    ['failure', { icon: IconType.CLOSE, variant: 'critical' }],
]);

export const ProposalVotingBreakdownExternal: React.FC<IProposalVotingBreakdownExternalProps> = (props) => {
    const { status, isOptimistic, children, ...otherProps } = props;
    const { copy } = useGukModulesContext();

    const phase = statusToPhase[status];
    const statusLabel = copy.proposalVotingBreakdownExternal[isOptimistic ? 'optimistic' : 'default'][phase];
    const statusLabelColor =
        phase === 'success' ? 'text-success-800' : phase === 'failure' ? 'text-critical-800' : 'text-neutral-500';
    const statusIcon = phaseToIcon.get(phase);

    return (
        <Tabs.Content value={ProposalVotingTab.BREAKDOWN} {...otherProps}>
            <div
                className={classNames(
                    'rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 shadow-neutral-sm md:px-6 md:py-5',
                    'flex w-full min-w-fit flex-row justify-between gap-2',
                    statusLabelColor,
                )}
            >
                {statusLabel}
                {statusIcon && <AvatarIcon icon={statusIcon.icon} variant={statusIcon.variant} />}
            </div>
            {children}
        </Tabs.Content>
    );
};
