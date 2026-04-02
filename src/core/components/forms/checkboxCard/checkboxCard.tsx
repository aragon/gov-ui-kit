import * as RadixCheckbox from '@radix-ui/react-checkbox';
import classNames from 'classnames';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';
import { useRandomId } from '../../../hooks';
import { Avatar } from '../../avatars';
import { Icon, IconType } from '../../icon';
import { type ITagProps, Tag } from '../../tag';
import type { CheckboxState } from '../checkbox/checkbox';

export interface ICheckboxCardProps extends ComponentProps<'button'> {
    /**
     * Avatar of the checkbox card.
     */
    avatar?: string;
    /**
     * Label of the checkbox.
     */
    label: string;
    /**
     * Description of the checkbox.
     */
    description?: string;
    /**
     * Optional tag for the checkbox.
     */
    tag?: ITagProps;
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
    /**
     * Additional children to render when the checkbox is checked.
     */
    children?: ReactNode;
}

export const CheckboxCard = forwardRef<HTMLButtonElement, ICheckboxCardProps>((props, ref) => {
    const {
        id,
        avatar,
        label,
        description,
        tag,
        className,
        checked,
        onCheckedChange,
        disabled,
        children,
        ...otherProps
    } = props;

    const randomId = useRandomId(id);
    const labelId = `${randomId}-label`;

    const containerClasses = classNames(
        'group flex min-w-0 cursor-pointer flex-col gap-3 outline-hidden transition-all', // Layout
        'focus-ring-primary rounded-xl border bg-neutral-0 px-4 py-3 md:gap-4 md:px-6 md:py-4', // Style
        'border-primary-400 shadow-primary hover:shadow-primary-md', // Checked/indeterminate & hover
        'data-[state=unchecked]:enabled:border-neutral-100 data-[state=unchecked]:enabled:shadow-neutral-sm', // Unchecked
        'data-[state=unchecked]:enabled:hover:shadow-neutral', // Unchecked hover
        'disabled:cursor-default disabled:border-neutral-300 disabled:bg-neutral-100 disabled:shadow-none', // Checked/indeterminate & disabled
        'disabled:data-[state=unchecked]:border-neutral-200', // Disabled & unchecked
        className,
    );

    const labelClasses = classNames(
        'max-w-full cursor-pointer truncate text-neutral-800 group-data-[state=unchecked]:text-neutral-800 md:text-base',
        'group-data-[state=unchecked]:group-data-disabled:text-neutral-300 group-data-disabled:cursor-default',
    );

    return (
        <RadixCheckbox.Root
            aria-labelledby={labelId}
            checked={checked}
            className={containerClasses}
            disabled={disabled}
            id={randomId}
            onCheckedChange={onCheckedChange}
            ref={ref}
            {...otherProps}
        >
            <div className={classNames('flex w-full min-w-0 flex-row gap-3', { 'items-center': !description })}>
                {avatar && <Avatar responsiveSize={{ md: 'md' }} size="sm" src={avatar} />}
                <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5 font-normal text-sm leading-tight md:gap-1">
                    <p className={labelClasses} id={randomId}>
                        {label}
                    </p>
                    {description && (
                        <p className="max-w-full truncate text-neutral-500 group-data-disabled:text-neutral-300">
                            {description}
                        </p>
                    )}
                </div>
                {tag && <Tag {...tag} className={classNames(tag.className, { 'self-start': description })} />}
                <Icon
                    className={classNames(
                        'mt-0.5 hidden text-neutral-400 group-data-[state=unchecked]:block group-data-disabled:text-neutral-300 md:mt-1',
                        { 'self-start': description },
                    )}
                    icon={IconType.CHECKBOX}
                    size="md"
                />
                <RadixCheckbox.Indicator
                    className={classNames('mt-0.5 text-primary-400 group-data-disabled:text-neutral-500 md:mt-1', {
                        'self-start': description,
                    })}
                >
                    <Icon
                        className="hidden group-data-[state=checked]:block"
                        icon={IconType.CHECKBOX_SELECTED}
                        size="md"
                    />
                    <Icon
                        className="hidden group-data-[state=indeterminate]:block"
                        icon={IconType.CHECKBOX_INDETERMINATE}
                        size="md"
                    />
                </RadixCheckbox.Indicator>
            </div>
            {children && <div className="hidden w-full group-data-[state=checked]:block">{children}</div>}
        </RadixCheckbox.Root>
    );
});

CheckboxCard.displayName = 'CheckboxCard';
