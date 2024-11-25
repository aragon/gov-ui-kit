import { ProposalVotingBodyContent } from './proposalVotingBodyContent';
import { ProposalVotingBodySummary } from './proposalVotingBodySummary';
import { ProposalVotingBodySummaryList } from './proposalVotingBodySummaryList';
import { ProposalVotingBodySummaryListItem } from './proposalVotingBodySummaryListItem';
import { ProposalVotingBreakdownMultisig } from './proposalVotingBreakdownMultisig';
import { ProposalVotingBreakdownToken } from './proposalVotingBreakdownToken';
import { ProposalVotingContainer } from './proposalVotingContainer';
import { ProposalVotingDetails } from './proposalVotingDetails';
import { ProposalVotingStage } from './proposalVotingStage';
import { ProposalVotingVotes } from './proposalVotingVotes';

export const ProposalVoting = {
    BreakdownMultisig: ProposalVotingBreakdownMultisig,
    BreakdownToken: ProposalVotingBreakdownToken,
    Container: ProposalVotingContainer,
    Details: ProposalVotingDetails,
    Stage: ProposalVotingStage,
    Votes: ProposalVotingVotes,
    BodySummary: ProposalVotingBodySummary,
    BodySummaryList: ProposalVotingBodySummaryList,
    BodySummaryListItem: ProposalVotingBodySummaryListItem,
    BodyContent: ProposalVotingBodyContent,
};

export * from './proposalVotingBodyContent';
export * from './proposalVotingBodySummary';
export * from './proposalVotingBodySummaryList';
export * from './proposalVotingBodySummaryListItem';
export * from './proposalVotingBreakdownMultisig';
export * from './proposalVotingBreakdownToken';
export * from './proposalVotingContainer';
export * from './proposalVotingDefinitions';
export * from './proposalVotingDetails';
export * from './proposalVotingStage';
export * from './proposalVotingVotes';
