import { RadioGroupIndicator, RadioGroupItem, type RadioGroupItemProps } from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import { forwardRef, useId } from 'react';
import { Icon, IconType } from '../../icon';

export interface IRadioProps extends RadioGroupItemProps {
    /**
     * Radio label
     */
    label: string;
    /**
     * Indicates the position of the label
     * @default right
     */
    labelPosition?: 'left' | 'right';
}

/**
 * `Radio` component
 *
 * This component is based on the Radix-UI radio implementation.
 * An exhaustive list of its properties can be found in the corresponding Radix primitive
 * [documentation](https://www.radix-ui.com/primitives/docs/components/radio-group#item).
 *
 * **NOTE**: The component must be used inside a `<RadioGroup />` component in order to work properly.
 */

export const Radio = forwardRef<HTMLButtonElement, IRadioProps>(
    ({ label, labelPosition = 'right', id, value, className, ...rest }, ref) => {
        const randomId = useId();
        const processedId = id ?? randomId;

        const itemClasses = classNames(
            'group peer rounded-full outline-none', // default
            'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // focus
            { 'order-2': labelPosition === 'left' },
        );

        const labelClasses = classNames(
            'cursor-pointer text-base leading-tight text-neutral-500', // default
            'hover:text-neutral-800', // hover
            'peer-disabled:cursor-default peer-disabled:peer-data-[state=unchecked]:text-neutral-300', // unchecked and disabled
            { 'pr-2 md:pr-3': labelPosition === 'left' },
            { 'pl-2 md:pl-3': labelPosition === 'right' },
        );

        return (
            <div className={classNames('flex items-center px-0.5', className)}>
                <RadioGroupItem id={processedId} value={value} className={itemClasses} ref={ref} {...rest}>
                    <Icon
                        icon={IconType.RADIO_DEFAULT}
                        className="text-neutral-300 group-hover:text-primary-400 group-disabled:text-neutral-300 group-data-[state=checked]:hidden"
                    />
                    <RadioGroupIndicator className="text-primary-400 group-disabled:text-neutral-300">
                        <Icon icon={IconType.RADIO_SELECTED} />
                    </RadioGroupIndicator>
                </RadioGroupItem>
                <label className={labelClasses} htmlFor={processedId}>
                    {label}
                </label>
            </div>
        );
    },
);

Radio.displayName = 'Radio';
