import classNames from 'classnames';
import { AvatarIcon, IconType, Tabs, type AvatarIconVariant, type ITabsContentProps } from '../../../../../core';
import type { ModulesCopy } from '../../../../assets';
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

const statusToLabel = (copy: ModulesCopy, mode: 'default' | 'optimistic'): Record<ProposalVotingStatus, string> => ({
    [ProposalVotingStatus.PENDING]: copy.proposalVotingBreakdownExternal[mode].pending,
    [ProposalVotingStatus.ACTIVE]: copy.proposalVotingBreakdownExternal[mode].pending,
    [ProposalVotingStatus.ACCEPTED]: copy.proposalVotingBreakdownExternal[mode].success,
    [ProposalVotingStatus.REJECTED]: copy.proposalVotingBreakdownExternal[mode].failure,
    [ProposalVotingStatus.EXPIRED]: copy.proposalVotingBreakdownExternal[mode].failure,
    [ProposalVotingStatus.UNREACHED]: copy.proposalVotingBreakdownExternal[mode].failure,
    [ProposalVotingStatus.VETOED]: copy.proposalVotingBreakdownExternal[mode].failure,
});

const successText = 'text-success-800';
const failureText = 'text-critical-800';
const neutralText = 'text-neutral-500';
const statusToLabelColor = (): Record<ProposalVotingStatus, string> => ({
    [ProposalVotingStatus.PENDING]: neutralText,
    [ProposalVotingStatus.ACTIVE]: neutralText,
    [ProposalVotingStatus.ACCEPTED]: successText,
    [ProposalVotingStatus.REJECTED]: failureText,
    [ProposalVotingStatus.EXPIRED]: failureText,
    [ProposalVotingStatus.UNREACHED]: failureText,
    [ProposalVotingStatus.VETOED]: failureText,
});

const statusToIcon = new Map<ProposalVotingStatus, { icon: IconType; variant: AvatarIconVariant } | undefined>([
    [ProposalVotingStatus.ACCEPTED, { icon: IconType.CHECKMARK, variant: 'success' }],
    [ProposalVotingStatus.REJECTED, { icon: IconType.CLOSE, variant: 'critical' }],
    [ProposalVotingStatus.UNREACHED, { icon: IconType.CLOSE, variant: 'neutral' }],
    [ProposalVotingStatus.EXPIRED, { icon: IconType.CLOSE, variant: 'critical' }],
    [ProposalVotingStatus.UNREACHED, { icon: IconType.CLOSE, variant: 'critical' }],
    [ProposalVotingStatus.VETOED, { icon: IconType.CLOSE, variant: 'critical' }],
]);

export const ProposalVotingBreakdownExternal: React.FC<IProposalVotingBreakdownExternalProps> = (props) => {
    const { status, isOptimistic, children, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    const statusLabel = statusToLabel(copy, isOptimistic ? 'optimistic' : 'default')[status];
    const statusLabelColor = statusToLabelColor()[status];
    const statusIcon = statusToIcon.get(status);

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
