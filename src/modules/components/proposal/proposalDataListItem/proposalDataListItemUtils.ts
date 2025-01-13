import { ProposalStatus } from '../proposalUtils';

class ProposalDataListItemUtils {
    ongoingStatuses: ProposalStatus[] = [
        ProposalStatus.ACTIVE,
        ProposalStatus.ADVANCEABLE,
        ProposalStatus.CHALLENGED,
        ProposalStatus.PENDING,
    ];

    isOngoingStatus = (status: ProposalStatus) => this.ongoingStatuses.includes(status);
}

export const proposalDataListItemUtils = new ProposalDataListItemUtils();
