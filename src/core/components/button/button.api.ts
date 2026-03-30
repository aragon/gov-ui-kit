import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import type { ResponsiveAttribute } from '../../types';
import type { IconType } from '../icon';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'success' | 'warning' | 'critical';
export type ButtonContext = 'default' | 'onlyIcon';
export type ButtonSize = 'lg' | 'md' | 'sm';

export interface IButtonBaseProps {
    /**
     * Variant of the button.
     * @default primary
     */
    variant?: ButtonVariant;
    /**
     * Size of the button.
     * @default lg
     */
    size?: ButtonSize;
    /**
     * Applies responsiveness to the size of the button.
     */
    responsiveSize?: ResponsiveAttribute<ButtonSize>;
    /**
     * Icon displayed on the right side of the button. This icon is hidden in case the button has no children element
     * set (only-icon variant) and the iconLeft icon is displayed instead.
     */
    iconRight?: IconType;
    /**
     * Icon displayed on the left side of the button. This icon is displayed in case the button has no children element
     * set (only-icon variant)
     */
    iconLeft?: IconType;
    /**
     * A boolean indicating whether the button is loading.
     */
    isLoading?: boolean;
    /**
     * A boolean indicating whether the button is disabled.
     */
    disabled?: boolean;
}

export type IButtonAsButtonProps = IButtonBaseProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
        target?: never;
        rel?: never;
        download?: never;
        hrefLang?: never;
        media?: never;
        ping?: never;
        referrerPolicy?: never;
    };

export type IButtonAsLinkProps = IButtonBaseProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
    };

export type IButtonElementProps = IButtonAsButtonProps | IButtonAsLinkProps;

export type IButtonProps = IButtonElementProps;
