import classNames from 'classnames';
import { forwardRef, useRef } from 'react';
import { mergeRefs } from '../../../utils';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { useInputProps } from '../hooks';
import { type IInputComponentProps, InputContainer } from '../inputContainer';

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
                className={classNames('calendar-icon-hidden', inputClassName)}
                disabled={disabled}
                ref={mergeRefs([inputRef, ref])}
                type="time"
                {...otherInputProps}
            />
            {!disabled && (
                <Button
                    className="mr-2 shrink-0"
                    iconLeft={IconType.CLOCK}
                    onClick={handleClockClick}
                    size="sm"
                    variant="tertiary"
                />
            )}
        </InputContainer>
    );
});

InputTime.displayName = 'InputTime';
