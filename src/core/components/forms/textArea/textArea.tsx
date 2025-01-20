import classNames from 'classnames';
import { forwardRef } from 'react';
import { useInputProps } from '../hooks';
import { InputContainer, type IInputComponentProps } from '../inputContainer';

export interface ITextAreaProps extends IInputComponentProps<HTMLTextAreaElement> {}

export const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>((props, ref) => {
    const { containerProps, inputProps } = useInputProps(props);

    const { className: inputClassName, ...otherInputProps } = inputProps;
    const { wrapperClassName: containerWrapperClassName, ...otherContainerProps } = containerProps;

    return (
        <InputContainer
            wrapperClassName={classNames('grow overflow-auto rounded-br-none', containerWrapperClassName)}
            {...otherContainerProps}
        >
            <textarea
                type="text"
                className={classNames('min-h-[160px] leading-normal', inputClassName)}
                ref={ref}
                {...otherInputProps}
            />
        </InputContainer>
    );
});

TextArea.displayName = 'TextArea';
