import type { IconType } from '../../icon';
import type { IInputComponentProps } from '../inputContainer';

export interface IInputTextProps extends IInputComponentProps {
    /**
     * Text to be rendered beside the input field.
     */
    addon?: string;
    /**
     * Position of the addon element in relation to the input field.
     * @default 'left'
     */
    addonPosition?: 'left' | 'right';
    /**
     * Icon to be rendered on the left side of the input field.
     */
    iconLeft?: IconType;
    /**
     * Icon to be rendered on the right side of the input field.
     */
    iconRight?: IconType;
}
