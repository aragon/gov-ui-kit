import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { AlertInline } from '../../alerts';
import { useGukCoreContext } from '../../gukCoreProvider';
import { Tag } from '../../tag';
import type { IInputContainerProps, InputVariant } from './inputContainer.api';

const variantToClassNames: Record<InputVariant | 'disabled', string[]> = {
    default: [
        'border-neutral-100 bg-neutral-0 shadow-neutral-sm', // Default state
        'hover:border-neutral-200 hover:shadow-neutral', // Hover state
        'focus-within:border-primary-400 focus-within:shadow-primary', // Focus state
        'focus-within:hover:border-primary-400 focus-within:hover:shadow-primary', // Focus + Hover state
    ],
    warning: [
        'border-warning-500 bg-neutral-0 shadow-warning-sm', // Default state
        'hover:border-warning-600 hover:shadow-warning', // Hover state
        'focus-within:border-warning-600 focus-within:shadow-warning', // Focus state
        'focus-within:hover:border-warning-500 focus-within:hover:shadow-warning', // Focus + Hover state
    ],
    critical: [
        'border-critical-500 bg-neutral-0 shadow-critical-sm', // Default state
        'hover:border-critical-600 hover:shadow-critical', // Hover state
        'focus-within:border-critical-600 focus-within:shadow-critical', // Focus state
        'focus-within:hover:border-critical-500 focus-within:hover:shadow-critical', // Focus + Hover state
    ],
    disabled: ['border-neutral-200 bg-neutral-100'],
};

/**
 * The InputContainer component provides a consistent and shared styling foundation for various input components, such
 * as `InputText`, `InputNumber` and others. It also manages properties that are shared across all input components,
 * including `label`, `helpText` and more.
 */
export const InputContainer = forwardRef<HTMLDivElement, IInputContainerProps>((props, ref) => {
    const { copy } = useGukCoreContext();
    const {
        label,
        variant = 'default',
        helpText,
        isOptional,
        maxLength,
        inputLength = 0,
        alert,
        disabled,
        children,
        className,
        wrapperClassName,
        id,
        useCustomWrapper,
        ...otherProps
    } = props;

    const processedVariant = disabled ? 'disabled' : variant;
    const containerClasses = classNames(
        'flex min-h-12 w-full flex-row items-center', // Layout
        'rounded-xl border text-neutral-500 transition-all', // Styling
        'text-base font-normal leading-tight', // Typography
        variantToClassNames[processedVariant],
        wrapperClassName,
    );

    const counterClasses = classNames('text-xs font-normal leading-tight text-neutral-500 md:text-sm', {
        'animate-shake': inputLength === maxLength,
    });

    const InputWrapper = useCustomWrapper ? React.Fragment : 'div';
    const containerProps = useCustomWrapper ? {} : { className: containerClasses };

    return (
        <div className={classNames('flex grow flex-col gap-2 md:gap-3', className)} ref={ref} {...otherProps}>
            {(label != null || helpText != null) && (
                <label className="flex flex-col gap-0.5 md:gap-1" htmlFor={id}>
                    {label && (
                        <div className="flex flex-row items-center gap-3">
                            <p className="text-base font-normal leading-tight text-neutral-800 md:text-lg">{label}</p>
                            {isOptional && <Tag variant="neutral" label={copy.inputContainer.optionalLabel} />}
                        </div>
                    )}
                    {helpText && (
                        <p className="text-sm font-normal leading-normal text-neutral-500 md:text-base">{helpText}</p>
                    )}
                </label>
            )}
            <InputWrapper {...containerProps}>{children}</InputWrapper>
            {maxLength != null && !alert && (
                <p className={counterClasses}>
                    {inputLength}/{maxLength}
                </p>
            )}
            {alert && <AlertInline variant={alert.variant} message={alert.message} />}
        </div>
    );
});

InputContainer.displayName = 'InputContainer';
