import { ProposalVotingBodyContent } from './proposalVotingBodyContent';
import { ProposalVotingBodySummary } from './proposalVotingBodySummary';
import { ProposalVotingBodySummaryList } from './proposalVotingBodySummaryList';
import { ProposalVotingBodySummaryListItem } from './proposalVotingBodySummaryListItem';
import { ProposalVotingBreakdownMultisig } from './proposalVotingBreakdownMultisig';
import { ProposalVotingBreakdownToken } from './proposalVotingBreakdownToken';
import { ProposalVotingContainer } from './proposalVotingContainer';
import { ProposalVotingDetails } from './proposalVotingDetails';
import { ProposalVotingProgress } from './proposalVotingProgress';
import { ProposalVotingStage } from './proposalVotingStage';
import { ProposalVotingStageContainer } from './proposalVotingStageContainer';
import { ProposalVotingVotes } from './proposalVotingVotes';

export const ProposalVoting = {
    BreakdownMultisig: ProposalVotingBreakdownMultisig,
    BreakdownToken: ProposalVotingBreakdownToken,
    Container: ProposalVotingContainer,
    Details: ProposalVotingDetails,
    StageContainer: ProposalVotingStageContainer,
    Stage: ProposalVotingStage,
    Votes: ProposalVotingVotes,
    BodySummary: ProposalVotingBodySummary,
    BodySummaryList: ProposalVotingBodySummaryList,
    BodySummaryListItem: ProposalVotingBodySummaryListItem,
    BodyContent: ProposalVotingBodyContent,
    Progress: ProposalVotingProgress,
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
export * from './proposalVotingProgress';
export * from './proposalVotingStage';
export * from './proposalVotingStageContainer';
export * from './proposalVotingVotes';
