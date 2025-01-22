import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { ResponsiveAttributeClassMap } from '../../../../types';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IDialogRootProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Children of the component.
     */
    children?: ReactNode;
    /**
     * Additional CSS class names for custom styling of the dialog's content container.
     */
    containerClassName?: string;
    /**
     * Size of the dialog.
     * @default lg
     */
    size?: DialogSize;

    /**
     * Determines whether interactions with elements outside of the dialog will be disabled.
     * @default true
     */
    modal?: boolean;
    /**
     * Manages the visibility state of the dialog.
     */
    open?: boolean;
    /**
     * Additional CSS class names for custom styling of the overlay behind the dialog.
     */
    overlayClassName?: string;
    /**
     * Handler called when focus moves to the trigger after closing
     */
    onCloseAutoFocus?: (e: Event) => void;
    /**
     * Handler called when the escape key is pressed while the dialog is opened. Closes the dialog by default.
     */
    onEscapeKeyDown?: (e: KeyboardEvent) => void;
    /**
     * Handler called when an interaction (pointer or focus event) happens outside the bounds of the component
     */
    onInteractOutside?: (e: Event) => void;
    /**
     * Handler called when focus moves into the component after opening
     */
    onOpenAutoFocus?: (e: Event) => void;
    /**
     * Callback function invoked when the open state of the dialog changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Handler called when a pointer event occurs outside the bounds of the component
     */
    onPointerDownOutside?: (e: Event) => void;
    /**
     * Keeps the focus inside the Dialog when set to true.
     * @default true
     */
    useFocusTrap?: boolean;
}

export const responsiveSizeDialogClassNames: ResponsiveAttributeClassMap<DialogSize> = {
    sm: {
        default: 'max-w-[400px]',
        sm: 'sm:max-w-[400px]',
        md: 'md:max-w-[400px]',
        lg: 'lg:max-w-[400px]',
        xl: 'xl:max-w-[400px]',
        '2xl': 'xl:max-w-[400px]',
    },
    md: {
        default: 'max-w-[480px]',
        sm: 'sm:max-w-[480px]',
        md: 'md:max-w-[480px]',
        lg: 'lg:max-w-[480px]',
        xl: 'xl:max-w-[480px]',
        '2xl': 'xl:max-w-[480px]',
    },
    lg: {
        default: 'max-w-[640px]',
        sm: 'sm:max-w-[640px]',
        md: 'md:max-w-[640px]',
        lg: 'lg:max-w-[640px]',
        xl: 'xl:max-w-[640px]',
        '2xl': 'xl:max-w-[640px]',
    },
    xl: {
        default: 'max-w-[880px]',
        sm: 'sm:max-w-[880px]',
        md: 'md:max-w-[880px]',
        lg: 'lg:max-w-[880px]',
        xl: 'xl:max-w-[880px]',
        '2xl': 'xl:max-w-[880px]',
    },
};
