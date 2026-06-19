import type { ComponentPropsWithoutRef } from 'react';
import type { Hash } from 'viem';

/**
 * Entity that executed the transaction, rendered on the `Executed by` row.
 *
 * The three states from the design map onto these fields:
 * - Not an active-process execution: set `label` (plugin name or address) and `address`; omit `href` so the label
 *   links to the block explorer, and omit `helptext`.
 * - Active-process execution: set `label` to the process name, `helptext` to the plugin name and version (e.g.
 *   'SPP v1.3') and `href` to the process detail page.
 */
export interface ITransactionDetailSummaryExecutedBy {
    /**
     * Address of the executor. Builds the block-explorer link (unless `href` is set) and the copy button, and is used
     * as the label (truncated) when `label` is not provided.
     */
    address?: string;
    /**
     * Label displayed for the executor (e.g. a process or plugin name). Defaults to the truncated `address`.
     */
    label?: string;
    /**
     * Helptext displayed below the label (e.g. the plugin name and version, 'SPP v1.3'). Hidden when not provided.
     */
    helptext?: string;
    /**
     * Internal link applied to the label (e.g. the process detail page). Takes precedence over the block-explorer link.
     */
    href?: string;
}

export interface ITransactionDetailSummaryProps extends ComponentPropsWithoutRef<'dl'> {
    /**
     * Chain ID of the transaction, used to build the block-explorer links.
     */
    chainId: number;
    /**
     * Entity that executed the transaction, rendered on the `Executed by` row.
     */
    executedBy: ITransactionDetailSummaryExecutedBy;
    /**
     * Identifier of the proposal that triggered the execution (e.g. 'CRE-54'). The row is omitted when not set.
     */
    proposalId?: string;
    /**
     * Internal link applied to the proposal identifier (e.g. the proposal detail page).
     */
    proposalHref?: string;
    /**
     * Total number of actions bundled in the execution.
     */
    totalActions: number;
    /**
     * Hash of the execution transaction. Rendered truncated with an explorer link and a copy button.
     */
    transactionHash: Hash;
    /**
     * Date of the execution in ISO format or as a timestamp.
     */
    date: number | string;
}
