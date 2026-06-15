import type { ReactNode } from 'react';
import { Accordion } from '../../../../../core';
import { SmartContractFunctionDataListItem } from '../../../smartContract';

export interface ITransactionDetailActionProps {
    /**
     * Unique value identifying the action row within the accordion. Defaults to the row index injected by
     * `TransactionDetail.Container`. Set it to control the expanded state with stable identifiers.
     */
    value?: string;
    /**
     * Index of the action row, injected automatically by `TransactionDetail.Container`.
     */
    index?: number;
    /**
     * Name of the action (e.g. 'Mint', 'Transfer', 'Set metadata'), displayed as the row heading.
     * When omitted, the row falls back to the undecoded-function warning state.
     */
    name?: string;
    /**
     * Optional function selector displayed next to the action name (e.g. '0x79ba5097').
     */
    selector?: string;
    /**
     * Address of the contract or target the action interacts with. Rendered truncated with a block-explorer link.
     */
    to: string;
    /**
     * Optional human-readable name of the target contract, displayed before the address.
     */
    contractName?: string;
    /**
     * Displays the decoding warning feedback on the row when set. A warning is also shown automatically when the
     * action name or contract name are missing.
     * @default false
     */
    displayWarning?: boolean;
    /**
     * Chain ID used to build the block-explorer link for the target address.
     * @default mainnet.id (1)
     */
    chainId?: number;
    /**
     * Decoded action detail content, revealed when the row is expanded.
     */
    children?: ReactNode;
}

/**
 * The `<TransactionDetail.Action />` component renders a single expandable action row inside a
 * `<TransactionDetail.Container />`. The row header shows the action name, an optional function selector and a
 * target-contract subtitle linking to the block explorer; the expanded content displays whatever decoded action UI is
 * passed as children.
 */
export const TransactionDetailAction: React.FC<ITransactionDetailActionProps> = (props) => {
    const { value, index, name, selector, to, contractName, displayWarning = false, chainId, children } = props;

    return (
        <Accordion.Item value={value ?? index?.toString() ?? name ?? to}>
            <Accordion.ItemHeader className="min-w-0">
                <SmartContractFunctionDataListItem.Structure
                    asChild={true}
                    chainId={chainId}
                    className="w-full bg-transparent"
                    contractAddress={to}
                    contractName={contractName}
                    displayWarning={displayWarning}
                    functionName={name}
                    functionSelector={selector}
                />
            </Accordion.ItemHeader>
            <Accordion.ItemContent>{children}</Accordion.ItemContent>
        </Accordion.Item>
    );
};
