import { ProposalStatus, ProposalVotingStatus } from '../proposalUtils';

class ProposalDataListItemUtils {
    ongoingStatuses: Array<ProposalStatus | ProposalVotingStatus> = [
        ProposalStatus.ACTIVE,
        ProposalStatus.CHALLENGED,
        ProposalVotingStatus.ACTIVE,
        ProposalVotingStatus.PENDING,
        ProposalVotingStatus.ACCEPTED,
    ];

    isOngoingStatus = (status: ProposalStatus | ProposalVotingStatus) => this.ongoingStatuses.includes(status);
}

export const proposalDataListItemUtils = new ProposalDataListItemUtils();
