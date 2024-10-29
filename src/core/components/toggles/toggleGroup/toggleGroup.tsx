import { ToggleGroup as RadixToggleGroup } from '@radix-ui/react-toggle-group';
import classNames from 'classnames';
import type { ComponentProps } from 'react';

export type ToggleGroupValue<TMulti extends boolean> = TMulti extends true ? string[] | undefined : string | undefined;

export interface IToggleGroupBaseProps<TMulti extends boolean>
    extends Omit<ComponentProps<'div'>, 'value' | 'onChange' | 'defaultValue' | 'ref' | 'dir'> {
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
    const { value, defaultValue, onChange, isMultiSelect, className, ...otherProps } = props;
    const classes = classNames('flex flex-row flex-wrap gap-2 md:gap-3', className);

    if (isMultiSelect) {
        return (
            <RadixToggleGroup
                type="multiple"
                className={classes}
                value={value}
                onValueChange={onChange}
                defaultValue={defaultValue}
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
            {...otherProps}
        />
    );
};
