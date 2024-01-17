import classNames from 'classnames';
import { forwardRef, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { InputContainer, type IInputComponentProps } from '../inputContainer';
import { useInputProps } from '../useInputProps';

export interface IInputDateProps extends Omit<IInputComponentProps, 'maxLength'> {}

export const InputDate: React.FC<IInputDateProps> = forwardRef((props, ref) => {
    const { containerProps, inputProps } = useInputProps(props);

    const { className: containerClassName, ...otherContainerProps } = containerProps;
    const { className: inputClassName, disabled, ...otherInputProps } = inputProps;

    const inputRef = useRef<HTMLInputElement>(null);

    const handleCalendarClick = () => {
        inputRef.current?.showPicker();
    };

    return (
        // Using absolute and relative positions to hide native date-picker icon on Firefox as it cannot be customised
        // (see Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1812397)
        <InputContainer className={classNames('relative', containerClassName)} {...otherContainerProps}>
            <input
                type="date"
                className={classNames('absolute calendar-icon:hidden calendar-icon:appearance-none', inputClassName)}
                ref={mergeRefs([inputRef, ref])}
                disabled={disabled}
                {...otherInputProps}
            />
            <Button
                variant="tertiary"
                size="sm"
                iconLeft={IconType.CALENDAR}
                className="absolute right-2"
                onClick={handleCalendarClick}
                state={disabled ? 'disabled' : undefined}
            />
        </InputContainer>
    );
});

InputDate.displayName = 'InputDate';
