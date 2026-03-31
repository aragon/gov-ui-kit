import classNames from 'classnames';
import { forwardRef, useRef } from 'react';
import { mergeRefs } from '../../../utils';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { useInputProps } from '../hooks';
import { type IInputComponentProps, InputContainer } from '../inputContainer';

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
                className={classNames('calendar-icon-hidden absolute', inputClassName)}
                disabled={disabled}
                ref={mergeRefs([inputRef, ref])}
                type="date"
                {...otherInputProps}
            />
            {!disabled && (
                <Button
                    className="absolute right-2"
                    iconLeft={IconType.CALENDAR}
                    onClick={handleCalendarClick}
                    size="sm"
                    variant="tertiary"
                />
            )}
        </InputContainer>
    );
});

InputDate.displayName = 'InputDate';
