import { ProposalStatus } from '../proposalUtils';
import { proposalDataListItemUtils } from './proposalDataListItemUtils';

describe('proposalDataListItem utils', () => {
    describe('isOngoingStatus', () => {
        it('returns true for ongoing proposal statuses', () => {
            expect(proposalDataListItemUtils.isOngoingStatus(ProposalStatus.ACTIVE)).toBeTruthy();
            expect(proposalDataListItemUtils.isOngoingStatus(ProposalStatus.CHALLENGED)).toBeTruthy();
            expect(proposalDataListItemUtils.isOngoingStatus(ProposalStatus.ADVANCEABLE)).toBeTruthy();
        });

        it('returns false for non-ongoing proposal statuses', () => {
            expect(proposalDataListItemUtils.isOngoingStatus(ProposalStatus.DRAFT)).toBeFalsy();
            expect(proposalDataListItemUtils.isOngoingStatus(ProposalStatus.EXECUTABLE)).toBeFalsy();
            expect(proposalDataListItemUtils.isOngoingStatus(ProposalStatus.VETOED)).toBeFalsy();
        });
    });
});
