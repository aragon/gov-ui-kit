import type { ICompositeAddress } from '../../../../../types';
import type { IProposalAction, IProposalActionComponentProps, ProposalActionType } from '../../types';

export interface IProposalActionWithdrawTokenAsset {
    /**
     * Name of the token.
     */
    name: string;
    /**
     * Symbol of the token.
     */
    symbol: string;
    /**
     * URL of the token logo.
     */
    logo: string;
    /**
     * Token price in USD.
     */
    priceUsd: string;
}

export interface IProposalActionWithdrawToken extends IProposalAction {
    /**
     * Withdraw token action type.
     */
    type: ProposalActionType.WITHDRAW_TOKEN;
    /**
     * Sender handle (the DAO treasury in this case), object with address and optional ensName.
     */
    sender: ICompositeAddress;
    /**
     * Receiver handle, object with address and optional ensName.
     */
    receiver: ICompositeAddress;
    /**
     * Amount of tokens to withdraw.
     */
    amount: string;
    /**
     * Details of the token to withdraw.
     */
    token: IProposalActionWithdrawTokenAsset;
}

export interface IProposalActionWithdrawTokenProps
    extends IProposalActionComponentProps<IProposalActionWithdrawToken> {}
