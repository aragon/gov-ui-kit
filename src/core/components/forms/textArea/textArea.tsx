import classNames from 'classnames';
import { forwardRef } from 'react';
import { useInputProps } from '../hooks';
import { type IInputComponentProps, InputContainer } from '../inputContainer';

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
                className={classNames('min-h-40 leading-normal', inputClassName)}
                ref={ref}
                type="text"
                {...otherInputProps}
            />
        </InputContainer>
    );
});

TextArea.displayName = 'TextArea';
