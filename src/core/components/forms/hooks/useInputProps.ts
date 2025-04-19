import classNames from 'classnames';
import { useEffect, useState, type ChangeEvent, type InputHTMLAttributes } from 'react';
import { useRandomId } from '../../../hooks';
import type { IInputComponentProps, IInputContainerProps, InputComponentElement } from '../inputContainer';

export interface IUseInputPropsResult<TElement extends InputComponentElement> {
    /**
     * Properties for the InputContainer component.
     */
    containerProps: IInputContainerProps;
    /**
     * Properties for the input element.
     */
    inputProps: InputHTMLAttributes<TElement>;
}

/**
 * Processes the InputComponent properties object to split it into container-specific and input-element-specific properties.
 * @param props The InputComponent properties
 * @returns The InputContainer and input element properties.
 */
export const useInputProps = <TElement extends InputComponentElement>(
    props: IInputComponentProps<TElement>,
): IUseInputPropsResult<TElement> => {
    const {
        label,
        variant,
        helpText,
        isOptional,
        alert,
        disabled,
        inputClassName,
        id,
        className,
        maxLength,
        onChange,
        value,
        wrapperClassName,
        ...inputElementProps
    } = props;

    const randomId = useRandomId(id);

    const [inputLength, setInputLength] = useState(0);

    const handleOnChange = (event: ChangeEvent<TElement>) => {
        setInputLength(event.target.value.length);
        onChange?.(event);
    };

    const containerProps = {
        label,
        variant,
        helpText,
        isOptional,
        alert,
        disabled,
        id: randomId,
        maxLength,
        className,
        inputLength,
        wrapperClassName,
    };

    const inputClasses = classNames(
        'size-full rounded-xl bg-transparent px-4 py-3 caret-neutral-500 outline-hidden', // Default
        'placeholder:text-base placeholder:font-normal placeholder:leading-tight placeholder:text-neutral-300', // Placeholder
        inputClassName, // Prop
    );

    const inputProps = {
        id: randomId,
        disabled: disabled,
        className: inputClasses,
        onChange: handleOnChange,
        maxLength,
        value,
        ...inputElementProps,
    };

    // Update input length on value change for controlled inputs
    useEffect(() => {
        setInputLength(value?.toString().length ?? 0);
    }, [value]);

    return { containerProps, inputProps };
};
