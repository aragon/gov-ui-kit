import type { IWeb3ComponentProps } from '../../../../types';
import type { ProposalActionsDecoderView } from '../proposalActionsDecoder';
import type { IProposalAction, ProposalActionComponent } from '../proposalActionsDefinitions';

export type ProposalActionsItemViewMode = 'BASIC' | ProposalActionsDecoderView;

export interface IProposalActionsArrayControl<TAction extends IProposalAction = IProposalAction> {
    /**
     * Label of the item.
     */
    label: string;
    /**
     * Callback called with the current action and its index on item click.
     */
    onClick: (action: TAction, index: number) => void;
    /**
     * Whether the item is disabled.
     */
    disabled: boolean;
}

export interface IProposalActionsArrayControls<TAction extends IProposalAction = IProposalAction> {
    /**
     * Move down control.
     */
    moveDown: IProposalActionsArrayControl<TAction>;
    /**
     * Move up control.
     */
    moveUp: IProposalActionsArrayControl<TAction>;
    /**
     * Remove control.
     */
    remove: IProposalActionsArrayControl<TAction>;
}

export interface IProposalActionsItemProps<TAction extends IProposalAction = IProposalAction>
    extends IWeb3ComponentProps {
    /**
     * Proposal action to be rendered.
     */
    action: TAction;
    /**
     * Function selector of the action to be displayed optionally.
     */
    actionFunctionSelector?: string;
    /**
     * Count of the action to be displayed optionally.
     */
    actionCount?: number;
    /**
     * Index of the action injected by the <ProposalActions.Container /> component.
     */
    index?: number;
    /**
     * Value of the action used as accordion item value, defaults to the index property if not provided.
     */
    value?: string;
    /**
     * Custom component for the action to be rendered on BASIC view.
     */
    CustomComponent?: ProposalActionComponent<TAction>;
    /**
     * Controls for the action to be moved up or down.
     */
    arrayControls?: IProposalActionsArrayControls<TAction>;
    /**
     * Enables the edit-mode when set to true. The RAW view will be editable only if the action has no DECODED view,
     * similarly the DECODED view will be editable only if the action has no BASIC view.
     * The component must be wrapped through a form context provider when the property is set to true.
     * @default false
     */
    editMode?: boolean;
    /**
     * Form prefix to be prepended to all proposal action text fields.
     */
    formPrefix?: string;
    /**
     * Chain ID for the blockchain network.
     * @default mainnet.id
     */
    chainId?: number;
}
