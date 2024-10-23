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
     * Minimum numbers of approvals required for a proposal to pass.
     */
    minApprovals: number;
}

export const ProposalVotingBreakdownMultisig: React.FC<IProposalVotingBreakdownMultisigProps> = (props) => {
    const { approvalsAmount, minApprovals, children, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    invariant(minApprovals > 0, 'ProposalVotingBreakdownMultisig: minApprovals property must be a positive number');

    const currentApprovalsPercentage = (approvalsAmount / minApprovals) * 100;

    const formattedApprovalsAmount = formatterUtils.formatNumber(approvalsAmount, {
        format: NumberFormat.GENERIC_SHORT,
    });
    const formattedMinApprovals = formatterUtils.formatNumber(minApprovals, { format: NumberFormat.GENERIC_SHORT });

    return (
        <Tabs.Content value={ProposalVotingTab.BREAKDOWN} {...otherProps}>
            <ProposalVotingProgress.Container>
                <ProposalVotingProgress.Item
                    name={copy.proposalVotingBreakdownMultisig.name}
                    value={currentApprovalsPercentage}
                    description={{
                        value: formattedApprovalsAmount,
                        text: copy.proposalVotingBreakdownMultisig.description(formattedMinApprovals),
                    }}
                    showStatusIcon={true}
                    variant={approvalsAmount >= minApprovals ? 'primary' : 'neutral'}
                />
            </ProposalVotingProgress.Container>
            {children}
        </Tabs.Content>
    );
};
