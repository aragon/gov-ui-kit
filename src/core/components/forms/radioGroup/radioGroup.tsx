import { RadioGroup as PrimitiveRadioGroup } from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import { forwardRef, type ReactNode } from 'react';
import { useRandomId } from '../../../hooks';
import { type IInputContainerBaseProps, InputContainer } from '../inputContainer';

export interface IRadioGroupProps
    extends Pick<IInputContainerBaseProps, 'alert' | 'label' | 'helpText' | 'isOptional'> {
    /**
     * The value of the selected radio item.
     */
    value?: string;
    /**
     * The default value of the selected radio item.
     */
    defaultValue?: string;
    /**
     * Callback when the value changes.
     */
    onValueChange?: (value: string) => void;
    /**
     * The name of the radio group.
     */
    name?: string;
    /**
     * Whether the radio group is disabled.
     */
    disabled?: boolean;
    /**
     * Additional classes for the component.
     */
    className?: string;
    /**
     * Children of the component.
     */
    children?: ReactNode;
}

export const RadioGroup = forwardRef<HTMLDivElement, IRadioGroupProps>((props, ref) => {
    const { className, value, defaultValue, onValueChange, name, disabled, children, ...otherProps } = props;

    const randomId = useRandomId();

    return (
        <InputContainer id={randomId} useCustomWrapper={true} {...otherProps}>
            <PrimitiveRadioGroup
                ref={ref}
                id={randomId}
                value={value}
                defaultValue={defaultValue}
                onValueChange={onValueChange}
                name={name}
                disabled={disabled}
                className={classNames('flex min-w-0 flex-col gap-y-2 md:gap-y-3', className)}
            >
                {children}
            </PrimitiveRadioGroup>
        </InputContainer>
    );
});

RadioGroup.displayName = 'RadioGroup';
