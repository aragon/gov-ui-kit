import { type ComponentProps } from 'react';

export interface ICollapsibleProps extends Omit<ComponentProps<'div'>, 'onToggle'> {
    /**
     * Number of text lines to show while collapsed.
     * @default 3
     */
    collapsedLines?: number;
    /**
     * Exact pixel height for the collapsible container that will override collapsedLines prop if defined.
     */
    collapsedPixels?: number;
    /**
     * Controlled state of the collapsible container.
     * @default false
     */
    isOpen?: boolean;
    /**
     * Default state of the collapsible container.
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * The label to display on the trigger button when the collapsible container is closed.
     */
    buttonLabelClosed?: string;
    /**
     * The label to display on the trigger button when the collapsible container is open.
     */
    buttonLabelOpened?: string;
    /**
     * Show overlay when the collapsible container is open.
     * @default false
     */
    showOverlay?: boolean;
    /**
     * Callback function that is called when the collapsible container is toggled.
     */
    onToggle?: (isOpen: boolean) => void;
}
