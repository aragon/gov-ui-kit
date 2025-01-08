import { ProposalStatus } from '../proposalUtils';

class ProposalDataListItemUtils {
    ongoingStatuses: ProposalStatus[] = [ProposalStatus.ACTIVE, ProposalStatus.CHALLENGED];

    isOngoingStatus = (status: ProposalStatus) => this.ongoingStatuses.includes(status);
}

export const proposalDataListItemUtils = new ProposalDataListItemUtils();
