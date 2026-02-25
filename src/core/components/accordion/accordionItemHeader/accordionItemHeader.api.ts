import type { ComponentPropsWithRef } from 'react';

export interface IAccordionItemHeaderRemoveControl {
    /**
     * Label of the remove control.
     */
    label: string;
    /**
     * Callback called with the current item and its index on remove button click.
     */
    onClick: (index: number) => void;
    /**
     * Whether the remove control is disabled.
     */
    disabled: boolean;
}

export interface IAccordionItemHeaderProps extends ComponentPropsWithRef<'button'> {
    /**
     * Remove control to be displayed in edit mode.
     */
    removeControl?: IAccordionItemHeaderRemoveControl;
    /**
     * The index of the accordion item.
     */
    index?: number;
}
