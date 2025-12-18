import classNames from 'classnames';
import { useState, type ChangeEvent, type InputHTMLAttributes } from 'react';
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

    const isControlled = value != null;
    const [uncontrolledInputLength, setUncontrolledInputLength] = useState(() => {
        const initialValue = inputElementProps.defaultValue ?? '';
        return initialValue.toString().length;
    });

    const handleOnChange = (event: ChangeEvent<TElement>) => {
        if (!isControlled) {
            setUncontrolledInputLength(event.target.value.length);
        }
        onChange?.(event);
    };

    const inputLength = isControlled ? value.toString().length : uncontrolledInputLength;

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

    return { containerProps, inputProps };
};
