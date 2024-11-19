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
    value: string | number;
    /**
     * The NatSpec notice for the parameter on the contract.
     */
    notice?: string;
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
