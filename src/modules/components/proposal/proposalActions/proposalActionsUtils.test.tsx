import {
    generateProposalActionChangeMembers,
    generateProposalActionChangeSettings,
    generateProposalActionTokenMint,
    generateProposalActionUpdateMetadata,
    generateProposalActionWithdrawToken,
} from './proposalActionsList';
import { proposalActionsUtils } from './proposalActionsUtils';
import { ProposalActionType } from './types';

describe('ProposalActions utils', () => {
    describe('isWithdrawTokenAction', () => {
        it('returns true for withdraw action', () => {
            const action = generateProposalActionWithdrawToken();
            expect(proposalActionsUtils.isWithdrawTokenAction(action)).toBeTruthy();
        });

        it('returns false for other actions', () => {
            const action = generateProposalActionUpdateMetadata();
            expect(proposalActionsUtils.isWithdrawTokenAction(action)).toBeFalsy();
        });
    });

    describe('isChangeMemberAction', () => {
        it('returns true for change members actions', () => {
            const addMembersAction = generateProposalActionChangeMembers({ type: ProposalActionType.ADD_MEMBERS });
            const removeMembersAction = generateProposalActionChangeMembers({
                type: ProposalActionType.REMOVE_MEMBERS,
            });
            expect(proposalActionsUtils.isChangeMembersAction(addMembersAction)).toBeTruthy();
            expect(proposalActionsUtils.isChangeMembersAction(removeMembersAction)).toBeTruthy();
        });

        it('returns false for other actions', () => {
            const action = generateProposalActionWithdrawToken();
            expect(proposalActionsUtils.isChangeMembersAction(action)).toBeFalsy();
        });
    });

    describe('isUpdateMetadataAction', () => {
        it('returns true for update metadata action', () => {
            const action = generateProposalActionUpdateMetadata();
            expect(proposalActionsUtils.isUpdateMetadataAction(action)).toBeTruthy();
        });

        it('returns false for other actions', () => {
            const action = generateProposalActionChangeMembers();
            expect(proposalActionsUtils.isUpdateMetadataAction(action)).toBeFalsy();
        });
    });

    describe('isTokenMintAction', () => {
        it('returns true for token mint action', () => {
            const action = generateProposalActionTokenMint();
            expect(proposalActionsUtils.isTokenMintAction(action)).toBeTruthy();
        });

        it('returns false for other actions', () => {
            const action = generateProposalActionUpdateMetadata();
            expect(proposalActionsUtils.isTokenMintAction(action)).toBeFalsy();
        });
    });

    describe('isChangeSettingsAction', () => {
        it('returns true for change settings actions', () => {
            const changeMultisig = generateProposalActionChangeSettings({
                type: ProposalActionType.CHANGE_SETTINGS_MULTISIG,
            });
            const changeToken = generateProposalActionChangeSettings({
                type: ProposalActionType.CHANGE_SETTINGS_TOKENVOTE,
            });
            expect(proposalActionsUtils.isChangeSettingsAction(changeMultisig)).toBeTruthy();
            expect(proposalActionsUtils.isChangeSettingsAction(changeToken)).toBeTruthy();
        });

        it('returns false for other actions', () => {
            const action = generateProposalActionTokenMint();
            expect(proposalActionsUtils.isChangeSettingsAction(action)).toBeFalsy();
        });
    });
});
