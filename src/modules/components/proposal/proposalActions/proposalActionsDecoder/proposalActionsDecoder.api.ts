import { type ComponentProps } from 'react';
import type { IProposalAction } from '../proposalActionsDefinitions';

export enum ProposalActionsDecoderView {
    DECODED = 'DECODED',
    RAW = 'RAW',
}

export enum ProposalActionsDecoderMode {
    READ = 'READ',
    EDIT = 'EDIT',
    WATCH = 'WATCH',
}

export interface IProposalActionsDecoderProps extends ComponentProps<'div'> {
    /**
     * Action to display the values for.
     */
    action: IProposalAction;
    /**
     * Prefix to be prepended to all the action values on edit mode.
     */
    formPrefix?: string;
    /**
     * Defines the behaviour of the decoder:
     * - READ: Displays the values as disabled using the values on the action property;
     * - EDIT: Displays the values as editable and updates the values on the form context;
     * - WATCH: Displays the values as disabled but each value listens to the changes on the form context;
     * @default READ
     */
    mode?: ProposalActionsDecoderMode;
    /**
     * Defines the action values to be displayed:
     * - DECODED: Displays the parameters of the action and the value field if the function is payable;
     * - RAW: Only displays the base values of the action (value and data);
     * @default RAW
     */
    view?: ProposalActionsDecoderView;
}
