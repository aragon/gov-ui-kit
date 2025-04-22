import { ProposalVotingBodyContent } from './proposalVotingBodyContent';
import { ProposalVotingBodySummary } from './proposalVotingBodySummary';
import { ProposalVotingBodySummaryList } from './proposalVotingBodySummaryList';
import { ProposalVotingBodySummaryListItem } from './proposalVotingBodySummaryListItem';
import { ProposalVotingBreakdownExternal } from './proposalVotingBreakdownExternal';
import { ProposalVotingBreakdownMultisig } from './proposalVotingBreakdownMultisig';
import { ProposalVotingBreakdownToken } from './proposalVotingBreakdownToken';
import { ProposalVotingContainer } from './proposalVotingContainer';
import { ProposalVotingDetails } from './proposalVotingDetails';
import { ProposalVotingProgress } from './proposalVotingProgress';
import { ProposalVotingStage } from './proposalVotingStage';
import { ProposalVotingVotes } from './proposalVotingVotes';

export const ProposalVoting = {
    BreakdownMultisig: ProposalVotingBreakdownMultisig,
    BreakdownToken: ProposalVotingBreakdownToken,
    BreakdownExternal: ProposalVotingBreakdownExternal,
    Container: ProposalVotingContainer,
    Details: ProposalVotingDetails,
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
export * from './proposalVotingBreakdownExternal';
export * from './proposalVotingBreakdownMultisig';
export * from './proposalVotingBreakdownToken';
export * from './proposalVotingContainer';
export * from './proposalVotingDefinitions';
export * from './proposalVotingDetails';
export * from './proposalVotingProgress';
export * from './proposalVotingStage';
export * from './proposalVotingVotes';
