import type { IconType } from '../../../../../core';
import type { IWeb3ComponentProps } from '../../../../types';
import type { ProposalActionsDecoderView } from '../proposalActionsDecoder';
import type { IProposalAction, ProposalActionComponent } from '../proposalActionsDefinitions';

export type ProposalActionsItemViewMode = 'BASIC' | ProposalActionsDecoderView;

export interface IProposalActionsItemDropdownItem<TAction extends IProposalAction = IProposalAction> {
    /**
     * Label of the item.
     */
    label: string;
    /**
     * Icon of the item.
     */
    icon: IconType;
    /**
     * Callback called with the current action and its index on item click.
     */
    onClick: (action: TAction, index: number) => void;
}

export interface IProposalActionsItemProps<TAction extends IProposalAction = IProposalAction>
    extends IWeb3ComponentProps {
    /**
     * Proposal action to be rendered.
     */
    action: TAction;
    /**
     * Index of the action injected by the <ProposalActions.Container /> component.
     */
    index?: number;
    /**
     * Custom component for the action to be rendered on BASIC view.
     */
    CustomComponent?: ProposalActionComponent<TAction>;
    /**
     * Items displayed beside the "View as" menu.
     */
    dropdownItems?: Array<IProposalActionsItemDropdownItem<TAction>>;
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
}
