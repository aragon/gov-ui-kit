import classNames from 'classnames';
import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, type Ref } from 'react';
import type { Breakpoint, ResponsiveAttribute, ResponsiveAttributeClassMap } from '../../types';
import { responsiveUtils } from '../../utils';
import { Icon, type IconSize } from '../icon';
import { LinkBase } from '../link';
import { Spinner } from '../spinner';
import type { SpinnerSize, SpinnerVariant } from '../spinner/spinner';
import type { ButtonContext, ButtonSize, ButtonVariant, IButtonProps } from './button.api';

// Using aria-disabled: instead of disabled: modifier in order to make the modifier work for buttons and links
const variantToClassNames: Record<ButtonVariant, string[]> = {
    primary: [
        'bg-primary-400 text-neutral-0 border-primary-400 shadow-primary-sm', // Default
        'hover:bg-primary-500 hover:border-primary-500 hover:shadow-primary', // Hover
        'active:bg-primary-800 active:border-primary-800', // Active
        'focus-visible:ring-primary', // Focus
        'aria-disabled:bg-neutral-100 aria-disabled:text-neutral-300 aria-disabled:border-neutral-100', // Disabled
    ],
    secondary: [
        'bg-neutral-0 text-primary-400 border-primary-100 shadow-primary-sm', // Default
        'hover:border-primary-200 hover:bg-primary-50 hover:shadow-primary', // Hover
        'active:border-primary-400 active:bg-neutral-0', // Active
        'focus-visible:ring-primary', // Focus
        'aria-disabled:bg-neutral-100 aria-disabled:text-neutral-300 aria-disabled:border-neutral-100', // Disabled
    ],
    tertiary: [
        'bg-neutral-0 text-neutral-500 border-neutral-100 shadow-neutral-sm', // Default
        'hover:bg-neutral-50 hover:border-neutral-200 hover:shadow-neutral', // Hover
        'active:bg-neutral-0 active:border-neutral-400 active:text-neutral-800', // Active
        'focus-visible:ring-primary', // Focus
        'aria-disabled:bg-neutral-100 aria-disabled:text-neutral-300 aria-disabled:border-neutral-100', // Disabled
    ],
    ghost: [
        'bg-transparent border-transparent text-primary-400', // Default
        'hover:bg-neutral-0', // Hover
        'active:bg-neutral-0 active:text-primary-600', // Active
        'focus-visible:ring-primary', // Focus
        'aria-disabled:text-neutral-300', // Disabled
    ],
    success: [
        'bg-success-100 text-success-800 border-success-300 shadow-success-sm', // Default
        'hover:border-success-500 hover:shadow-success', // Hover
        'active:bg-neutral-0 active:border-success-600', // Active
        'focus-visible:ring-success', // Focus
        'aria-disabled:bg-neutral-100 aria-disabled:text-neutral-300 aria-disabled:border-neutral-100', // Disabled
    ],
    warning: [
        'bg-warning-100 text-warning-800 border-warning-300 shadow-warning-sm', // Default
        'hover:border-warning-500 hover:shadow-warning', // Hover
        'active:bg-neutral-0 active:border-warning-600', // Active
        'focus-visible:ring-warning', // Focus
        'aria-disabled:bg-neutral-100 aria-disabled:text-neutral-300 aria-disabled:border-neutral-100', // Disabled
    ],
    critical: [
        'bg-critical-100 text-critical-800 border-critical-300 shadow-critical-sm', // Default
        'hover:border-critical-500 hover:shadow-critical', // Hover
        'active:bg-neutral-0 active:border-critical-600', // Active
        'focus-visible:ring-critical', // Focus
        'aria-disabled:bg-neutral-100 aria-disabled:text-neutral-300 aria-disabled:border-neutral-100', // Disabled
    ],
};

const variantToIconClassNames: Record<ButtonVariant, string> = {
    primary: 'text-neutral-0',
    secondary: 'text-primary-300 group-hover:text-primary-400 group-active:text-primary-400',
    tertiary: 'text-neutral-300 group-hover:text-neutral-500 group-active:text-neutral-500',
    ghost: 'text-neutral-300 group-hover:text-neutral-400 group-active:text-neutral-400',
    success: 'text-success-500 group-hover:text-success-600 group-active:text-success-600',
    warning: 'text-warning-500 group-hover:text-warning-600 group-active:text-warning-600',
    critical: 'text-critical-500 group-hover:text-critical-600 group-active:text-critical-600',
};

const variantToSpinnerVariant: Record<ButtonVariant, SpinnerVariant> = {
    primary: 'primaryInverted',
    secondary: 'primary',
    tertiary: 'neutral',
    ghost: 'primary',
    success: 'success',
    warning: 'warning',
    critical: 'critical',
};

const responsiveSizeClassNames: ResponsiveAttributeClassMap<ButtonSize> = {
    sm: {
        default: 'h-[32px] text-sm rounded-lg gap-0.5',
        sm: 'sm:h-[32px] sm:text-sm sm:rounded-lg sm:gap-0.5',
        md: 'md:h-[32px] md:text-sm md:rounded-lg md:gap-0.5',
        lg: 'lg:h-[32px] lg:text-sm lg:rounded-lg lg:gap-0.5',
        xl: 'xl:h-[32px] xl:text-sm xl:rounded-lg xl:gap-0.5',
        '2xl': '2xl:h-[32px] 2xl:text-sm 2xl:rounded-lg 2xl:gap-0.5',
    },
    md: {
        default: 'h-[40px] text-base rounded-xl gap-1',
        sm: 'sm:h-[40px] sm:text-base sm:rounded-xl sm:gap-1',
        md: 'md:h-[40px] md:text-base md:rounded-xl md:gap-1',
        lg: 'lg:h-[40px] lg:text-base lg:rounded-xl lg:gap-1',
        xl: 'xl:h-[40px] xl:text-base xl:rounded-xl xl:gap-1',
        '2xl': '2xl:h-[40px] 2xl:text-base 2xl:rounded-xl 2xl:gap-1',
    },
    lg: {
        default: 'h-[48px] text-base rounded-xl gap-1',
        sm: 'sm:h-[48px] sm:text-base sm:rounded-xl sm:gap-1',
        md: 'md:h-[48px] md:text-base md:rounded-xl md:gap-1',
        lg: 'lg:h-[48px] lg:text-base lg:rounded-xl lg:gap-1',
        xl: 'xl:h-[48px] xl:text-base xl:rounded-xl xl:gap-1',
        '2xl': '2xl:h-[48px] 2xl:text-base 2xl:rounded-xl 2xl:gap-1',
    },
};

const responsiveDefaultContextClassNames: ResponsiveAttributeClassMap<ButtonSize> = {
    sm: {
        default: 'min-w-[80px] px-2',
        sm: 'sm:min-w-[80px] sm:px-2',
        md: 'md:min-w-[80px] md:px-2',
        lg: 'lg:min-w-[80px] lg:px-2',
        xl: 'xl:min-w-[80px] xl:px-2',
        '2xl': '2xl:min-w-[80px] 2xl:px-2',
    },
    md: {
        default: 'min-w-[96px] px-3',
        sm: 'sm:min-w-[96px] sm:px-3',
        md: 'md:min-w-[96px] md:px-3',
        lg: 'lg:min-w-[96px] lg:px-3',
        xl: 'xl:min-w-[96px] xl:px-3',
        '2xl': '2xl:min-w-[96px] 2xl:px-3',
    },
    lg: {
        default: 'min-w-[112px] px-4',
        sm: 'sm:min-w-[112px] sm:px-4',
        md: 'md:min-w-[112px] md:px-4',
        lg: 'lg:min-w-[112px] lg:px-4',
        xl: 'xl:min-w-[112px] xl:px-4',
        '2xl': '2xl:min-w-[112px] 2xl:px-4',
    },
};

const responsiveOnlyIconContextClassNames: ResponsiveAttributeClassMap<ButtonSize> = {
    sm: {
        default: 'w-[32px]',
        sm: 'sm:w-[32px]',
        md: 'md:w-[32px]',
        lg: 'lg:w-[32px]',
        xl: 'xl:w-[32px]',
        '2xl': '2xl:w-[32px]',
    },
    md: {
        default: 'w-[40px]',
        sm: 'sm:w-[40px]',
        md: 'md:w-[40px]',
        lg: 'lg:w-[40px]',
        xl: 'xl:w-[40px]',
        '2xl': '2xl:w-[40px]',
    },
    lg: {
        default: 'w-[48px]',
        sm: 'sm:w-[48px]',
        md: 'md:w-[48px]',
        lg: 'lg:w-[48px]',
        xl: 'xl:w-[48px]',
        '2xl': '2xl:w-[48px]',
    },
};

const sizeToIconSize: Record<ButtonSize, Record<ButtonContext, IconSize>> = {
    lg: {
        default: 'md',
        onlyIcon: 'lg',
    },
    md: {
        default: 'md',
        onlyIcon: 'md',
    },
    sm: {
        default: 'sm',
        onlyIcon: 'sm',
    },
};

const sizeToSpinnerSize: Record<ButtonSize, SpinnerSize> = {
    lg: 'md',
    md: 'md',
    sm: 'sm',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, IButtonProps>((props, ref) => {
    const {
        variant = 'primary',
        size = 'lg',
        responsiveSize = {},
        iconRight,
        iconLeft,
        className,
        children,
        isLoading,
        disabled,
        ...otherProps
    } = props;

    const isOnlyIcon = children == null || children === '';
    const isDisabled = disabled === true || isLoading === true;
    const buttonContext = isOnlyIcon ? 'onlyIcon' : 'default';

    const commonClasses = [
        'flex flex-row items-center justify-center group', // Layout
        'leading-tight font-normal', // Typography
        'border transition-all cursor:pointer', // Commons
        'outline-none focus:outline-none focus-visible:ring focus-visible:ring-offset', // States
        'active:shadow-none aria-disabled:shadow-none', // Active/Disabled states
    ];

    const variantClasses = variantToClassNames[variant].filter((classes) => {
        // Do not apply specific state classes when button is on a disabled or loading state. Even though this
        // might be done through the tailwind enabled: modifier, it won't work when the button is a link.
        if (disabled) {
            return !classes.includes('hover');
        } else if (isLoading) {
            return !classes.includes('disabled') && !classes.includes('hover') && !classes.includes('active');
        }

        return true;
    });

    const iconClassNames = classNames(
        'transition-all group-aria-disabled:text-neutral-300',
        variantToIconClassNames[variant],
    );

    const sizeClassNames = responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClassNames);
    const contextClassNames = responsiveUtils.generateClassNames(
        size,
        responsiveSize,
        isOnlyIcon ? responsiveOnlyIconContextClassNames : responsiveDefaultContextClassNames,
    );

    const classes = classNames(commonClasses, variantClasses, sizeClassNames, contextClassNames, className, {
        'cursor-progress': isLoading,
    });

    const iconSize = sizeToIconSize[size][buttonContext];
    const iconResponsiveSize = Object.keys(responsiveSize).reduce<ResponsiveAttribute<IconSize>>(
        (current, breakpoint) => ({
            ...current,
            [breakpoint]: sizeToIconSize[responsiveSize[breakpoint as Breakpoint]!][buttonContext],
        }),
        {},
    );

    const spinnerSize = sizeToSpinnerSize[size];
    const spinnerResponsiveSize = Object.keys(responsiveSize).reduce<ResponsiveAttribute<SpinnerSize>>(
        (current, breakpoint) => ({
            ...current,
            [breakpoint]: sizeToSpinnerSize[responsiveSize[breakpoint as Breakpoint]!],
        }),
        {},
    );

    const displayIconLeft = !isLoading && iconLeft != null;
    const displayIconRight = !isLoading && iconRight != null && !isOnlyIcon;

    const commonProps = { className: classes, 'aria-disabled': isDisabled };
    const commonIconProps = { size: iconSize, responsiveSize: iconResponsiveSize, className: iconClassNames };

    const buttonContent = (
        <>
            {displayIconLeft && <Icon icon={iconLeft} {...commonIconProps} />}
            {isLoading && (
                <Spinner
                    size={spinnerSize}
                    responsiveSize={spinnerResponsiveSize}
                    variant={variantToSpinnerVariant[variant]}
                />
            )}
            {!isOnlyIcon && <div className="px-1">{children}</div>}
            {displayIconRight && <Icon icon={iconRight} {...commonIconProps} />}
        </>
    );

    const handleLinkClick =
        (onClick?: (event: MouseEvent<HTMLAnchorElement>) => void) => (event: MouseEvent<HTMLAnchorElement>) => {
            if (isDisabled) {
                event.preventDefault();
            } else {
                onClick?.(event);
            }
        };

    if ('href' in otherProps && otherProps.href != null && otherProps.href !== '') {
        const { onClick, href, ...linkProps } = otherProps;
        return (
            <LinkBase
                href={href}
                onClick={handleLinkClick(onClick)}
                ref={ref as Ref<HTMLAnchorElement>}
                {...commonProps}
                {...linkProps}
            >
                {buttonContent}
            </LinkBase>
        );
    }

    const { type = 'button', ...buttonProps } = otherProps as ButtonHTMLAttributes<HTMLButtonElement>;

    return (
        <button disabled={isDisabled} ref={ref as Ref<HTMLButtonElement>} type={type} {...commonProps} {...buttonProps}>
            {buttonContent}
        </button>
    );
});

Button.displayName = 'Button';
