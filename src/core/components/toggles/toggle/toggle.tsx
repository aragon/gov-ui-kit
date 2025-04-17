import { ToggleGroupItem as RadixToggle } from '@radix-ui/react-toggle-group';
import classNames from 'classnames';
import type { ComponentProps } from 'react';

export interface IToggleProps extends Omit<ComponentProps<'button'>, 'ref'> {
    /**
     * Value of the toggle.
     */
    value: string;
    /**
     * Label of the toggle.
     */
    label: string;
}

/**
 * The Toggle component is a button that handles the "on" and "off" states.
 *
 * **NOTE**: The component must be used inside a `<ToggleGroup />` component in order to work properly.
 */
export const Toggle: React.FC<IToggleProps> = (props) => {
    const { className, label, value, disabled, ...otherProps } = props;

    const toggleClasses = classNames(
        'flex h-10 items-center rounded-[40px] border px-4 outline-hidden transition-all', // Default
        'focus:outline-hidden focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus state
        'data-[state=off]:enabled:border-neutral-100 data-[state=off]:enabled:bg-neutral-0 data-[state=off]:enabled:text-neutral-500 data-state-off:enabled:shadow-neutral-sm', // Default state
        'data-[state=off]:hover:enabled:border-neutral-200 data-[state=off]:hover:enabled:shadow-neutral', // Default hover state
        'data-[state=on]:enabled:border-primary-400 data-[state=on]:enabled:bg-neutral-0 data-[state=on]:enabled:text-primary-400 data-state-on:enabled:shadow-primary-sm', // Active state
        'data-[state=on]:hover:enabled:shadow-primary', // Active hover state
        'disabled:border-neutral-100 disabled:bg-neutral-100 disabled:text-neutral-300', // Disabled state
        className,
    );

    return (
        <RadixToggle className={toggleClasses} disabled={disabled} value={value} {...otherProps}>
            <p className="text-sm leading-normal font-normal md:text-base">{label}</p>
        </RadixToggle>
    );
};
