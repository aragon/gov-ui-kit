import classNames from 'classnames';
import { forwardRef, useRef } from 'react';
import { mergeRefs } from '../../../utils';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { useInputProps } from '../hooks';
import { InputContainer, type IInputComponentProps } from '../inputContainer';

export interface IInputTimeProps extends Omit<IInputComponentProps, 'maxLength' | 'inputLength'> {}

export const InputTime = forwardRef<HTMLInputElement, IInputTimeProps>((props, ref) => {
    const { containerProps, inputProps } = useInputProps(props);

    const { className: containerClassName, ...otherContainerProps } = containerProps;
    const { className: inputClassName, disabled, ...otherInputProps } = inputProps;

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClockClick = () => {
        inputRef.current?.showPicker();
    };

    return (
        <InputContainer className={containerClassName} {...otherContainerProps}>
            <input
                type="time"
                ref={mergeRefs([inputRef, ref])}
                disabled={disabled}
                className={classNames('calendar-icon-hidden', inputClassName)}
                {...otherInputProps}
            />
            {!disabled && (
                <Button
                    variant="tertiary"
                    size="sm"
                    iconLeft={IconType.CLOCK}
                    className="mr-2 shrink-0"
                    onClick={handleClockClick}
                />
            )}
        </InputContainer>
    );
});

InputTime.displayName = 'InputTime';
