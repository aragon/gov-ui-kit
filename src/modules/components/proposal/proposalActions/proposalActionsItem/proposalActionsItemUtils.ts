import { type IProposalAction, ProposalActionType } from '../proposalActionsDefinitions';
import type {
    IProposalActionChangeMembers,
    IProposalActionChangeSettings,
    IProposalActionTokenMint,
    IProposalActionUpdateMetadata,
    IProposalActionWithdrawToken,
} from '../proposalActionsList';

class ProposalActionsItemUtils {
    isWithdrawTokenAction = (action: Partial<IProposalAction>): action is IProposalActionWithdrawToken => {
        return action.type === ProposalActionType.WITHDRAW_TOKEN;
    };

    isChangeMembersAction = (action: Partial<IProposalAction>): action is IProposalActionChangeMembers => {
        return action.type === ProposalActionType.ADD_MEMBERS || action.type === ProposalActionType.REMOVE_MEMBERS;
    };

    isUpdateMetadataAction = (action: Partial<IProposalAction>): action is IProposalActionUpdateMetadata => {
        return action.type === ProposalActionType.UPDATE_METADATA;
    };

    isTokenMintAction = (action: Partial<IProposalAction>): action is IProposalActionTokenMint => {
        return action.type === ProposalActionType.TOKEN_MINT;
    };

    isChangeSettingsAction = (action: Partial<IProposalAction>): action is IProposalActionChangeSettings => {
        return (
            action.type === ProposalActionType.CHANGE_SETTINGS_MULTISIG ||
            action.type === ProposalActionType.CHANGE_SETTINGS_TOKENVOTE
        );
    };
}

export const proposalActionsItemUtils = new ProposalActionsItemUtils();
