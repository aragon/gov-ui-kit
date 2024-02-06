import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export interface IRadioGroupProps extends Omit<ComponentPropsWithoutRef<'div'>, 'dir' | 'onChange'> {
    /**
     * Default value of the radio group. This value is used when the component is initially
     * rendered and no `value` prop is provided.
     */
    defaultValue?: string;
    /**
     * Disables all radio buttons in the group.
     */
    disabled?: boolean;
    /**
     * Loops focus from the last radio button to the first (and vice versa)
     * when navigating with the keyboard
     */
    loop?: boolean;
    /**
     * Name of the group
     */
    name?: string;
    /**
     * Currently selected value in the radio group. Providing this property allows
     * the component to be controlled.
     */
    value?: string;
    /**
     *  Callback function that is called when the selected value changes
     * @param value - new selected radio button value
     */
    onValueChange?: (value: string) => void;
}

/**
 * `RadioGroup` component
 */
export const RadioGroup = forwardRef<HTMLDivElement, IRadioGroupProps>(({ className, ...rest }, ref) => {
    return (
        <RadixRadioGroup.Root
            {...rest}
            ref={ref}
            className={classNames('flex min-w-0 flex-col gap-y-2 md:gap-y-3', className)}
        />
    );
});

RadioGroup.displayName = 'RadioGroup';
