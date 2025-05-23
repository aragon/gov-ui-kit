import { ToggleGroup as RadixToggleGroup } from '@radix-ui/react-toggle-group';
import classNames from 'classnames';
import type { ComponentProps } from 'react';

export type ToggleGroupValue<TMulti extends boolean> = TMulti extends true ? string[] | undefined : string | undefined;

export interface IToggleGroupBaseProps<TMulti extends boolean>
    extends Omit<ComponentProps<'div'>, 'value' | 'onChange' | 'defaultValue' | 'ref' | 'dir'> {
    /**
     * Variant of the component defining the spacing between the toggle items.
     * @default fixed
     */
    variant?: 'fixed' | 'space-between';
    /**
     * Orientation of the toggle group.
     * @default horizontal
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * Allows multiple toggles to be selected at the same time when set to true.
     */
    isMultiSelect: TMulti;
    /**
     * Current value of the toggle selection.
     */
    value?: ToggleGroupValue<TMulti>;
    /**
     * Default toggle selection.
     */
    defaultValue?: ToggleGroupValue<TMulti>;
    /**
     * Callback called on toggle selection change.
     */
    onChange?: (value: ToggleGroupValue<TMulti>) => void;
}

export type IToggleGroupProps = IToggleGroupBaseProps<true> | IToggleGroupBaseProps<false>;

export const ToggleGroup = (props: IToggleGroupProps) => {
    const {
        variant = 'fixed',
        orientation,
        value,
        defaultValue,
        onChange,
        isMultiSelect,
        className,
        ...otherProps
    } = props;

    const classes = classNames(
        'flex flex-wrap',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        { 'gap-2 md:gap-3': variant === 'fixed' },
        { 'justify-between gap-y-2': variant === 'space-between' },
        className,
    );

    if (isMultiSelect) {
        return (
            <RadixToggleGroup
                type="multiple"
                className={classes}
                value={value}
                onValueChange={onChange}
                defaultValue={defaultValue}
                orientation={orientation}
                {...otherProps}
            />
        );
    }

    return (
        <RadixToggleGroup
            type="single"
            className={classes}
            value={value}
            onValueChange={onChange}
            defaultValue={defaultValue}
            orientation={orientation}
            {...otherProps}
        />
    );
};
