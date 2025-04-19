import { RadioGroupIndicator, RadioGroupItem } from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import { useRandomId } from '../../../hooks';
import { Avatar } from '../../avatars';
import { Icon, IconType } from '../../icon';
import { Tag, type ITagProps } from '../../tag';

export interface IRadioCardProps extends ComponentProps<'button'> {
    /**
     * Radio card avatar image source
     */
    avatar?: string;
    /**
     * Description
     */
    description?: string;
    /**
     * Radio label
     */
    label: string;
    /**
     * Radio card tag
     */
    tag?: ITagProps;
    /**
     * The value of the radio item.
     */
    value: string;
    /**
     * Indicates if the radio is disabled.
     */
    disabled?: boolean;
    /**
     * Additional children to render when the radio is selected.
     */
    children?: ReactNode;
}

export const RadioCard = forwardRef<HTMLButtonElement, IRadioCardProps>((props, ref) => {
    const { value, id, className, tag, avatar, label, description, disabled, children, ...rest } = props;

    const randomId = useRandomId(id);
    const labelId = `${randomId}-label`;

    const containerClasses = classNames(
        'group flex w-full flex-col gap-3 rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 focus-ring-primary', // default
        'shadow-neutral-sm outline-hidden transition-all cursor-pointer md:rounded-2xl md:px-6 md:py-4', // default
        'data-[state=checked]:border-primary-400 data-[state=checked]:shadow-primary', // checked
        'hover:border-neutral-200 hover:shadow-neutral hover:data-[state=checked]:shadow-primary-md', // hover
        'disabled:cursor-default disabled:border-neutral-200 disabled:bg-neutral-100 disabled:shadow-none', // disabled
        'disabled:data-[state=checked]:border-neutral-300 disabled:data-[state=checked]:shadow-none', // disabled & checked
        className,
    );

    const baseTextClasses =
        'text-sm leading-tight text-left text-neutral-500 md:text-base w-full group-disabled:text-neutral-300 truncate';

    const labelClasses = classNames(
        baseTextClasses,
        'group-data-[state=checked]:text-neutral-800 group-data-[state=checked]:group-disabled:text-neutral-800',
    );

    return (
        <RadioGroupItem
            id={randomId}
            ref={ref}
            value={value}
            disabled={disabled}
            className={containerClasses}
            aria-labelledby={labelId}
            {...rest}
        >
            <div className="flex size-full items-center gap-x-3 md:gap-x-4">
                {avatar && <Avatar size="sm" responsiveSize={{ md: 'md' }} src={avatar} />}
                <div
                    className={classNames('flex min-w-0 flex-1 gap-x-0.5 md:gap-x-4', {
                        'items-center': !description,
                    })}
                >
                    <div className="flex min-w-0 flex-1 flex-col gap-y-0.5 md:gap-y-1">
                        <p className={labelClasses} id={labelId}>
                            {label}
                        </p>
                        {description && <p className={baseTextClasses}>{description}</p>}
                    </div>
                    {tag && <Tag {...tag} />}
                </div>
                <span className={classNames({ 'h-full': description })}>
                    <Icon icon={IconType.RADIO} className="text-neutral-300 group-data-[state=checked]:hidden" />
                    <RadioGroupIndicator>
                        <Icon
                            icon={IconType.RADIO_SELECTED}
                            className="text-primary-400 group-disabled:text-neutral-500"
                        />
                    </RadioGroupIndicator>
                </span>
            </div>
            {children && <div className="hidden group-data-[state=checked]:block">{children}</div>}
        </RadioGroupItem>
    );
});

RadioCard.displayName = 'RadioCard';
