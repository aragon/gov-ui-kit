import * as RadixCheckbox from '@radix-ui/react-checkbox';
import classNames from 'classnames';
import { type ComponentProps, forwardRef } from 'react';
import { useRandomId } from '../../../hooks';
import { Icon, IconType } from '../../icon';

export type CheckboxState = boolean | 'indeterminate';

export interface ICheckboxProps extends ComponentProps<'button'> {
    /**
     * Label of the checkbox.
     */
    label: string;
    /**
     * Position of the label.
     * @default right
     */
    labelPosition?: 'right' | 'left';
    /**
     * The checked state of the checkbox.
     */
    checked?: CheckboxState;
    /**
     * Callback when the checked state changes.
     */
    onCheckedChange?: (checked: CheckboxState) => void;
    /**
     * Indicates if the checkbox is disabled.
     */
    disabled?: boolean;
    /**
     * Id of the checkbox.
     */
    id?: string;
}

export const Checkbox = forwardRef<HTMLButtonElement, ICheckboxProps>((props, ref) => {
    const { label, labelPosition = 'right', checked, onCheckedChange, disabled, id, className, ...otherProps } = props;

    const randomId = useRandomId(id);

    return (
        <div
            className={classNames(
                'group/root flex items-center',
                { 'flex-row': labelPosition === 'right' },
                { 'flex-row-reverse': labelPosition === 'left' },
                className,
            )}
        >
            <RadixCheckbox.Root
                checked={checked}
                className={classNames(
                    'group/checkbox peer focus-ring-primary cursor-pointer rounded-md disabled:cursor-default',
                )}
                disabled={disabled}
                id={randomId}
                onCheckedChange={onCheckedChange}
                ref={ref}
                {...otherProps}
            >
                <Icon
                    className={classNames(
                        'hidden text-neutral-400 group-data-[state=unchecked]/checkbox:block',
                        'group-hover/root:text-primary-400 group-data-disabled/checkbox:text-neutral-300',
                    )}
                    icon={IconType.CHECKBOX}
                    size="md"
                />
                <RadixCheckbox.Indicator className="text-primary-400 group-data-disabled/checkbox:text-neutral-300">
                    <Icon
                        className="hidden group-data-[state=checked]/checkbox:block"
                        icon={IconType.CHECKBOX_SELECTED}
                        size="md"
                    />
                    <Icon
                        className="hidden group-data-[state=indeterminate]/checkbox:block"
                        icon={IconType.CHECKBOX_INDETERMINATE}
                        size="md"
                    />
                </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
            <label
                className={classNames(
                    'cursor-pointer font-normal text-neutral-500 text-sm leading-tight md:text-base',
                    'group-hover/root:text-neutral-800',
                    'peer-data-[state=unchecked]:peer-data-disabled:text-neutral-300 peer-data-disabled:cursor-default peer-data-disabled:text-neutral-500',
                    { 'pl-2 md:pl-3': labelPosition === 'right' },
                    { 'pr-2 md:pr-3': labelPosition === 'left' },
                )}
                htmlFor={randomId}
            >
                {label}
            </label>
        </div>
    );
});

Checkbox.displayName = 'Checkbox';
