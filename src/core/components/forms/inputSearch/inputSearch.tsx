import classNames from 'classnames';
import { forwardRef, useRef, useState, type FocusEvent } from 'react';
import { mergeRefs } from '../../../utils';
import { Icon, IconType } from '../../icon';
import { Spinner } from '../../spinner';
import { useInputProps } from '../hooks';
import { InputContainer, type IInputComponentProps } from '../inputContainer';

export interface IInputSearchProps extends IInputComponentProps {
    /**
     * Displays a loading indicator when set to true.
     */
    isLoading?: boolean;
}

export const InputSearch = forwardRef<HTMLInputElement, IInputSearchProps>((props, ref) => {
    const { isLoading, ...otherProps } = props;
    const { containerProps, inputProps } = useInputProps(otherProps);

    const { inputLength = 0, ...otherContainerProps } = containerProps;
    const {
        className: inputClassName,
        onFocus: onInputFocus,
        onBlur: onInputBlur,
        disabled,
        ...otherInputProps
    } = inputProps;

    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onInputFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onInputBlur?.(event);
    };

    const handleClear = () => {
        if (inputRef.current == null) {
            return;
        }

        // Needed to trigger a native onChange event on clear input click (see https://stackoverflow.com/a/46012210)
        Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set?.call(inputRef.current, '');

        const event = new Event('input', { bubbles: true });
        inputRef.current.dispatchEvent(event);

        inputRef.current.focus();
    };

    const displayClearIcon = inputLength > 0 && !disabled;

    return (
        <InputContainer inputLength={inputLength} {...otherContainerProps}>
            {isLoading && <Spinner size="sm" variant="neutral" className="ml-4" />}
            {!isLoading && (
                <Icon
                    icon={IconType.SEARCH}
                    size="md"
                    className={classNames('ml-4 text-neutral-400 transition-all', { 'text-neutral-600': isFocused })}
                />
            )}
            <input
                type="search"
                className={classNames('search-cancel-hidden', inputClassName)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={mergeRefs([inputRef, ref])}
                disabled={disabled}
                {...otherInputProps}
            />
            {displayClearIcon && (
                <button className="mr-4 cursor-pointer" onClick={handleClear}>
                    <Icon icon={IconType.CLOSE} className="text-neutral-600" />
                </button>
            )}
        </InputContainer>
    );
});

InputSearch.displayName = 'InputSearch';
