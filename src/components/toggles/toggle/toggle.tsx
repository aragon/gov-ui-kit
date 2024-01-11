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
        'flex h-10 items-center rounded-[40px] border border-neutral-100 px-4', // Default
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus state
        'hover:enabled:border-neutral-200 hover:enabled:shadow-primary-md', // Hover state
        'data-[state=off]:enabled:bg-neutral-0 data-[state=off]:enabled:text-neutral-600', // Default state
        'data-[state=on]:enabled:bg-neutral-100 data-[state=on]:enabled:text-neutral-800', // Active state
        'disabled:bg-neutral-100 disabled:text-neutral-300', // Disabled state
        className,
    );

    return (
        <RadixToggle className={toggleClasses} disabled={disabled} value={value} {...otherProps}>
            <p className="text-sm font-semibold leading-normal md:text-base">{label}</p>
        </RadixToggle>
    );
};
