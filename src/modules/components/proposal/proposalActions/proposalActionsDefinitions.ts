import type { ComponentType } from 'react';
import type { IWeb3ComponentProps } from '../../../types';

export enum ProposalActionType {
    WITHDRAW_TOKEN = 'WITHDRAW_TOKEN',
    ADD_MEMBERS = 'ADD_MEMBERS',
    REMOVE_MEMBERS = 'REMOVE_MEMBERS',
    UPDATE_METADATA = 'UPDATE_METADATA',
    TOKEN_MINT = 'TOKEN_MINT',
    CHANGE_SETTINGS_MULTISIG = 'CHANGE_SETTINGS_MULTISIG',
    CHANGE_SETTINGS_TOKENVOTE = 'CHANGE_SETTINGS_TOKENVOTE',
    UPDATE_PLUGIN_METADATA = 'UPDATE_PLUGIN_METADATA',
}

export interface IProposalActionInputDataParameter {
    /**
     * The name of the parameter being passed.
     */
    name: string;
    /**
     * The type of the argument being passed.
     */
    type: string;
    /**
     * The value of the argument being passed.
     */
    value: unknown;
    /**
     * The NatSpec notice for the parameter on the contract.
     */
    notice?: string;
    /**
     * Array of parameters for "tuple" type.
     */
    components?: Array<Omit<IProposalActionInputDataParameter, 'value'>>;
}

export interface IProposalActionInputData {
    /**
     * Name of the function to call from proposal action.
     */
    function: string;
    /**
     * The name of the contract to interact with.
     */
    contract: string;
    /**
     * State mutability of the function (e.g. pure or payable).
     */
    stateMutability?: string;
    /**
     * The parameters to pass to the function.
     */
    parameters: IProposalActionInputDataParameter[];
}

export interface IProposalAction {
    /**
     * The address to send the transaction from.
     */
    from: string;
    /**
     * The address to send the transaction to.
     */
    to: string;
    /**
     * The data to send with the transaction.
     */
    data: string;
    /**
     * The native currency value to send with the transaction.
     */
    value: string;
    /**
     * The type of the proposal action.
     */
    type: string;
    /**
     * The input data for the proposal action.
     */
    inputData: IProposalActionInputData | null;
}

export interface IProposalActionComponentProps<TAction extends IProposalAction = IProposalAction>
    extends IWeb3ComponentProps {
    /**
     * Action to be rendered.
     */
    action: TAction;
    /**
     * Index of the action.
     */
    index: number;
}

export type ProposalActionComponent<TAction extends IProposalAction = IProposalAction> = ComponentType<
    IProposalActionComponentProps<TAction>
>;
