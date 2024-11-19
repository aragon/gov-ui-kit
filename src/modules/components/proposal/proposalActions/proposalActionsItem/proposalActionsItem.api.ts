import type { IconType } from '../../../../../core';
import type { IWeb3ComponentProps } from '../../../../types';
import type { IProposalAction, ProposalActionComponent } from '../types';

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
     * Custom component for the action
     */
    CustomComponent?: ProposalActionComponent<TAction>;
    /**
     * Items displayed beside the "View as" menu.
     */
    dropdownItems?: Array<IProposalActionsItemDropdownItem<TAction>>;
}
