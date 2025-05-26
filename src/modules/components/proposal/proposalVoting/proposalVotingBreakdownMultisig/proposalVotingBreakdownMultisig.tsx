import { NumberFormat, Tabs, formatterUtils, invariant, type ITabsContentProps } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { ProposalVotingProgress } from '../proposalVotingProgress';

export interface IProposalVotingBreakdownMultisigProps extends Omit<ITabsContentProps, 'value'> {
    /**
     * Current number of approvals for the proposal.
     */
    approvalsAmount: number;
    /**
     * Minimum numbers of approvals required for the proposal to pass.
     */
    minApprovals: number;
    /**
     * Number of members when the proposal was created.
     */
    membersCount: number;
}

export const ProposalVotingBreakdownMultisig: React.FC<IProposalVotingBreakdownMultisigProps> = (props) => {
    const { approvalsAmount, minApprovals, membersCount, children, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    invariant(membersCount > 0, 'ProposalVotingBreakdownMultisig: membersCount property must be a positive number');

    const currentApprovalsPercentage = (approvalsAmount / membersCount) * 100;
    const minApprovalsPercentage = (minApprovals / membersCount) * 100;

    const formattedApprovals = formatterUtils.formatNumber(approvalsAmount, { format: NumberFormat.GENERIC_SHORT });
    const formattedMembersCount = formatterUtils.formatNumber(membersCount, { format: NumberFormat.GENERIC_SHORT })!;
    const formattedApprovalsText = copy.proposalVotingBreakdownMultisig.description(formattedMembersCount);

    return (
        <Tabs.Content value={ProposalVotingTab.BREAKDOWN} {...otherProps}>
            <ProposalVotingProgress.Container>
                <ProposalVotingProgress.Item
                    name={copy.proposalVotingBreakdownMultisig.name}
                    value={currentApprovalsPercentage}
                    description={{ value: formattedApprovals, text: formattedApprovalsText }}
                    showStatus={true}
                    thresholdIndicator={minApprovalsPercentage}
                />
            </ProposalVotingProgress.Container>
            {children}
        </Tabs.Content>
    );
};
