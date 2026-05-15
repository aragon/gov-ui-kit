import { type ITabsContentProps, Tabs } from '../../../../../core';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

export interface IProposalVotingVotesProps extends Omit<ITabsContentProps, 'value'> {}

export const ProposalVotingVotes: React.FC<IProposalVotingVotesProps> = (props) => (
    <Tabs.Content value={ProposalVotingTab.VOTES} {...props} />
);
