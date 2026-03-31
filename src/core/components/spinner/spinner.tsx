import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import type { ResponsiveAttribute, ResponsiveAttributeClassMap } from '../../types';
import { responsiveUtils } from '../../utils';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'neutral' | 'primary' | 'primaryInverted' | 'success' | 'warning' | 'critical';

export interface ISpinnerProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Size of the spinner.
     * @default md
     */
    size?: SpinnerSize;
    /**
     * Size of the spinner depending on the current breakpoint.
     */
    responsiveSize?: ResponsiveAttribute<SpinnerSize>;
    /**
     * Variant of the spinner.
     * @default neutral
     */
    variant?: SpinnerVariant;
    /**
     * Defines if the spinner is in the loading state or not.
     * @default true
     */
    isLoading?: boolean;
}

const responsiveSizeClassNames: ResponsiveAttributeClassMap<SpinnerSize> = {
    sm: {
        default: 'size-4 border-[1.6px]',
        sm: 'sm:size-4 sm:border-[1.6px]',
        md: 'md:size-4 md:border-[1.6px]',
        lg: 'lg:size-4 lg:border-[1.6px]',
        xl: 'xl:size-4 xl:border-[1.6px]',
        '2xl': '2xl:size-4 2xl:border-[1.6px]',
    },
    md: {
        default: 'size-5 border-2',
        sm: 'sm:size-5 sm:border-2',
        md: 'md:size-5 md:border-2',
        lg: 'lg:size-5 lg:border-2',
        xl: 'xl:size-5 xl:border-2',
        '2xl': '2xl:size-5 2xl:border-2',
    },
    lg: {
        default: 'size-6 border-[2.4px]',
        sm: 'sm:size-6 sm:border-[2.4px]',
        md: 'md:size-6 md:border-[2.4px]',
        lg: 'lg:size-6 lg:border-[2.4px]',
        xl: 'xl:size-6 xl:border-[2.4px]',
        '2xl': '2xl:size-6 2xl:border-[2.4px]',
    },
    xl: {
        default: 'size-8 border-[3.2px]',
        sm: 'sm:size-8 sm:border-[3.2px]',
        md: 'md:size-8 md:border-[3.2px]',
        lg: 'lg:size-8 lg:border-[3.2px]',
        xl: 'xl:size-8 xl:border-[3.2px]',
        '2xl': '2xl:size-8 2xl:border-[3.2px]',
    },
};

const variantToClassNames: Record<SpinnerVariant, string> = {
    neutral: 'border-neutral-100',
    primary: 'border-primary-100',
    primaryInverted: 'border-primary-300',
    success: 'border-success-300',
    warning: 'border-warning-300',
    critical: 'border-critical-300',
};

const variantToLoadingClassNames: Record<SpinnerVariant, string> = {
    neutral: 'border-t-neutral-500',
    primary: 'border-t-primary-400',
    primaryInverted: 'border-t-neutral-0',
    success: 'border-t-success-800',
    warning: 'border-t-warning-800',
    critical: 'border-t-critical-800',
};

/**
 * Spinner UI component
 */
export const Spinner: React.FC<ISpinnerProps> = (props) => {
    const { size = 'md', isLoading = true, responsiveSize, variant = 'neutral', className, ...otherProps } = props;

    const sizeClassNames = responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClassNames);

    const spinnerClassNames = classNames(
        'shrink-0 animate-spin rounded-full',
        isLoading && variantToLoadingClassNames[variant],
        variantToClassNames[variant],
        sizeClassNames,
        className,
    );

    return <div className={spinnerClassNames} role="progressbar" {...otherProps} />;
};
