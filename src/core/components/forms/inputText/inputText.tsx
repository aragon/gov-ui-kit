import classNames from 'classnames';
import { forwardRef } from 'react';
import { Icon } from '../../icon';
import { useInputProps } from '../hooks';
import { InputContainer, type InputVariant } from '../inputContainer';
import type { IInputTextProps } from './inputText.api';

const variantToAddonClassNames: Record<InputVariant | 'disabled', string> = {
    default: 'bg-neutral-50 border-neutral-100 text-neutral-500',
    warning: 'bg-warning-100 border-warning-600 text-warning-600',
    critical: 'bg-critical-100 border-critical-600 text-critical-600',
    disabled: 'bg-neutral-50 border-neutral-200 text-neutral-500',
};

const variantToIconClassNames: Record<InputVariant | 'disabled', string> = {
    default: 'text-neutral-400',
    warning: 'text-warning-600',
    critical: 'text-critical-600',
    disabled: 'text-neutral-300',
};

export const InputText = forwardRef<HTMLInputElement, IInputTextProps>((props, ref) => {
    const { addonPosition = 'left', addon, iconLeft, iconRight, ...otherProps } = props;
    const { containerProps, inputProps } = useInputProps(otherProps);

    const {
        wrapperClassName: containerWrapperClassName,
        variant = 'default',
        disabled,
        ...otherContainerProps
    } = containerProps;

    const showAddon = addon && addon.trim() !== '';
    const variantKey = disabled ? 'disabled' : variant;

    const addonClasses = classNames(
        'flex h-full shrink-0 items-center justify-center px-3 font-normal text-base leading-tight',
        variantToAddonClassNames[variantKey],
        { 'border-r-[1px]': addonPosition === 'left' },
        { 'order-last border-l-[1px]': addonPosition === 'right' },
    );

    const iconClasses = classNames('shrink-0', variantToIconClassNames[variantKey]);

    return (
        <InputContainer
            disabled={disabled}
            variant={variant}
            wrapperClassName={classNames('overflow-hidden', containerWrapperClassName)}
            {...otherContainerProps}
        >
            {showAddon && (
                <div className={addonClasses} data-testid="input-addon">
                    {addon}
                </div>
            )}
            {iconLeft != null && <Icon className={classNames(iconClasses, 'ml-4')} icon={iconLeft} size="md" />}
            <input ref={ref} type="text" {...inputProps} />
            {iconRight != null && <Icon className={classNames(iconClasses, 'mr-4')} icon={iconRight} size="md" />}
        </InputContainer>
    );
});

InputText.displayName = 'InputText';
