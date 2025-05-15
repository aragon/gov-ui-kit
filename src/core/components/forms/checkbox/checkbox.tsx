import * as RadixCheckbox from '@radix-ui/react-checkbox';
import classNames from 'classnames';
import { forwardRef, type ComponentProps } from 'react';
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
                id={randomId}
                checked={checked}
                onCheckedChange={onCheckedChange}
                disabled={disabled}
                className={classNames(
                    'group/checkbox peer focus-ring-primary cursor-pointer rounded-md disabled:cursor-default',
                )}
                ref={ref}
                {...otherProps}
            >
                <Icon
                    icon={IconType.CHECKBOX}
                    size="md"
                    className={classNames(
                        'hidden text-neutral-400 group-data-[state=unchecked]/checkbox:block',
                        'group-hover/root:text-primary-400 group-data-disabled/checkbox:text-neutral-300',
                    )}
                />
                <RadixCheckbox.Indicator className="text-primary-400 group-data-disabled/checkbox:text-neutral-300">
                    <Icon
                        icon={IconType.CHECKBOX_SELECTED}
                        size="md"
                        className="hidden group-data-[state=checked]/checkbox:block"
                    />
                    <Icon
                        icon={IconType.CHECKBOX_INDETERMINATE}
                        size="md"
                        className="hidden group-data-[state=indeterminate]/checkbox:block"
                    />
                </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
            <label
                htmlFor={randomId}
                className={classNames(
                    'cursor-pointer text-sm leading-tight font-normal text-neutral-500 md:text-base',
                    'group-hover/root:text-neutral-800',
                    'peer-data-disabled:cursor-default peer-data-disabled:text-neutral-500 peer-data-[state=unchecked]:peer-data-disabled:text-neutral-300',
                    { 'pl-2 md:pl-3': labelPosition === 'right' },
                    { 'pr-2 md:pr-3': labelPosition === 'left' },
                )}
            >
                {label}
            </label>
        </div>
    );
});

Checkbox.displayName = 'Checkbox';
