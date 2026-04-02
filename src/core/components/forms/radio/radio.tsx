import { RadioGroupIndicator, RadioGroupItem } from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import { type ComponentProps, forwardRef } from 'react';
import { useRandomId } from '../../../hooks';
import { Icon, IconType } from '../../icon';

export interface IRadioProps extends ComponentProps<'button'> {
    /**
     * Radio label
     */
    label: string;
    /**
     * Indicates the position of the label
     * @default right
     */
    labelPosition?: 'left' | 'right';
    /**
     * The value of the radio item.
     */
    value: string;
    /**
     * Indicates if the radio is disabled.
     */
    disabled?: boolean;
}

export const Radio = forwardRef<HTMLButtonElement, IRadioProps>((props, ref) => {
    const { label, labelPosition = 'right', id, value, disabled, className, ...otherProps } = props;

    const randomId = useRandomId(id);

    const itemClasses = classNames(
        'group peer focus-ring-primary cursor-pointer rounded-full outline-hidden disabled:cursor-default',
        { 'order-2': labelPosition === 'left' },
    );

    const labelClasses = classNames(
        'cursor-pointer text-base text-neutral-500 leading-tight', // default
        'hover:text-neutral-800', // hover
        'peer-disabled:cursor-default peer-data-[state=unchecked]:peer-disabled:text-neutral-300', // unchecked and disabled
        { 'pr-2 md:pr-3': labelPosition === 'left' },
        { 'pl-2 md:pl-3': labelPosition === 'right' },
    );

    return (
        <div className={classNames('flex items-center px-0.5', className)}>
            <RadioGroupItem
                className={itemClasses}
                disabled={disabled}
                id={randomId}
                ref={ref}
                value={value}
                {...otherProps}
            >
                <Icon
                    className="text-neutral-300 group-hover:text-primary-400 group-disabled:text-neutral-300 group-data-[state=checked]:hidden"
                    icon={IconType.RADIO}
                />
                <RadioGroupIndicator className="text-primary-400 group-disabled:text-neutral-300">
                    <Icon icon={IconType.RADIO_SELECTED} />
                </RadioGroupIndicator>
            </RadioGroupItem>
            <label className={labelClasses} htmlFor={randomId}>
                {label}
            </label>
        </div>
    );
});

Radio.displayName = 'Radio';
