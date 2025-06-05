import { type ComponentProps } from 'react';

export type CollapsedSize = 'sm' | 'md' | 'lg';

export interface ICollapsibleProps extends Omit<ComponentProps<'div'>, 'onToggle'> {
    /**
     * The initial height of the collapsible container while closed.
     * @default md
     */
    collapsedSize?: CollapsedSize;
    /**
     * Custom pixel height for the collapsible container that will override collapsedSize prop if defined.
     */
    customCollapsedHeight?: number;
    /**
     * Number of text lines to show while collapsed. Overrides
     * `collapsedSize` and `customCollapsedHeight` when defined.
     */
    collapsedLines?: number;
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
