import type { ComponentPropsWithRef, InputHTMLAttributes, ReactNode } from 'react';
import type { AlertVariant } from '../../alerts';

export type InputVariant = 'default' | 'warning' | 'critical';

export interface IInputContainerAlert {
    /**
     * Message to be displayed.
     */
    message: string;
    /**
     * Variant of the alert.
     */
    variant: Exclude<AlertVariant, 'info' | 'success'>;
}

export interface IInputContainerBaseProps {
    /**
     * Label of the input.
     */
    label?: string;
    /**
     * Variant of the input.
     * @default default
     */
    variant?: InputVariant;
    /**
     * Help text displayed above the input.
     */
    helpText?: string;
    /**
     * Displays the optional tag when set to true.
     */
    isOptional?: boolean;
    /**
     * Displays the input as disabled when set to true.
     */
    disabled?: boolean;
    /**
     * Alert displayed below the input.
     */
    alert?: IInputContainerAlert;
    /**
     * Id of the input field.
     */
    id: string;
    /**
     * Displays an input length counter when set.
     */
    maxLength?: number;
    /**
     * Current input length displayed when maxLength property is set.
     */
    inputLength?: number;
    /**
     * Children of the component.
     */
    children?: ReactNode;
    /**
     * Classes for the component.
     */
    className?: string;
    /**
     * Classes for the input wrapper.
     */
    wrapperClassName?: string;
    /**
     * Does not render the default input wrapper when set to true, to be used for using the base input container
     * properties (label, helpText, ..) for components without a input wrapper (e.g. file inputs).
     */
    useCustomWrapper?: boolean;
}

export interface IInputContainerProps extends IInputContainerBaseProps, Omit<ComponentPropsWithRef<'div'>, 'id'> {}

export type InputComponentElement = HTMLInputElement | HTMLTextAreaElement;

export interface IInputComponentProps<TElement extends InputComponentElement = HTMLInputElement>
    extends Omit<IInputContainerBaseProps, 'children' | 'id' | 'inputLength' | 'useCustomWrapper'>,
        Omit<InputHTMLAttributes<TElement>, 'type'> {
    /**
     * Classes for the input element.
     */
    inputClassName?: string;
}
