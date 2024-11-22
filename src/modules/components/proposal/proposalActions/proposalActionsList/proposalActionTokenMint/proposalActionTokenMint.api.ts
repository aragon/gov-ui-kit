import type { ICompositeAddress } from '../../../../../types';
import type {
    IProposalAction,
    IProposalActionComponentProps,
    ProposalActionType,
} from '../../proposalActionsDefinitions';

export interface IProposalActionTokenMintMetadataReceiver extends ICompositeAddress {
    /**
     * Receivers current token balance.
     */
    currentBalance: string;
    /**
     * Receivers new token balance after mint.
     */
    newBalance: string;
}

export interface IProposalActionTokenMint extends IProposalAction {
    /**
     * Token mint action.
     */
    type: ProposalActionType.TOKEN_MINT;
    /**
     * Token receivers.
     */
    receiver: IProposalActionTokenMintMetadataReceiver;
    /**
     * Token Symbol.
     */
    tokenSymbol: string;
}

export interface IProposalActionTokenMintProps extends IProposalActionComponentProps<IProposalActionTokenMint> {}
