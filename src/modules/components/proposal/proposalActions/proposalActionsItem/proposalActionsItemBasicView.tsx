import type {
    IProposalAction,
    IProposalActionComponentProps,
    ProposalActionComponent,
} from '../proposalActionsDefinitions';
import {
    ProposalActionChangeMembers,
    ProposalActionChangeSettings,
    ProposalActionTokenMint,
    ProposalActionUpdateMetadata,
    ProposalActionWithdrawToken,
} from '../proposalActionsList';
import { proposalActionsItemUtils } from './proposalActionsItemUtils';

export interface IProposalActionsItemBasicViewProps<TAction extends IProposalAction = IProposalAction>
    extends IProposalActionComponentProps<TAction> {
    /**
     * Custom component to be rendered.
     */
    CustomComponent?: ProposalActionComponent<TAction>;
}

export const ProposalActionsItemBasicView = <TAction extends IProposalAction = IProposalAction>(
    props: IProposalActionsItemBasicViewProps<TAction>,
) => {
    const { CustomComponent, action, index, ...web3Props } = props;

    const commonProps = { index, ...web3Props };

    if (CustomComponent) {
        return <CustomComponent action={action} {...commonProps} />;
    }

    if (proposalActionsItemUtils.isWithdrawTokenAction(action)) {
        return <ProposalActionWithdrawToken action={action} {...commonProps} />;
    }

    if (proposalActionsItemUtils.isTokenMintAction(action)) {
        return <ProposalActionTokenMint action={action} {...commonProps} />;
    }

    if (proposalActionsItemUtils.isUpdateMetadataAction(action)) {
        return <ProposalActionUpdateMetadata action={action} {...commonProps} />;
    }

    if (proposalActionsItemUtils.isChangeMembersAction(action)) {
        return <ProposalActionChangeMembers action={action} {...commonProps} />;
    }

    if (proposalActionsItemUtils.isChangeSettingsAction(action)) {
        return <ProposalActionChangeSettings action={action} {...commonProps} />;
    }

    return null;
};
