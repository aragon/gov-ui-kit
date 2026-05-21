import classNames from 'classnames';
import type { ComponentProps, ReactNode } from 'react';
import { Icon, type IconType } from '../../icon';

export type DataListActionItemVariant = 'primary' | 'neutral';

export interface IDataListActionItemProps extends ComponentProps<'button'> {
    /**
     * Icon rendered inside the circular avatar on the left.
     */
    icon: IconType;
    /**
     * Visual variant — `primary` for affirmative actions (e.g. add),
     * `neutral` for back/secondary actions.
     */
    variant: DataListActionItemVariant;
    /**
     * Row label rendered next to the avatar.
     */
    children: ReactNode;
}

const variantRowClasses: Record<DataListActionItemVariant, string> = {
    primary: 'text-primary-400 hover:bg-primary-400/4 active:bg-primary-400/8',
    neutral: 'text-neutral-500 hover:bg-neutral-800/4 active:bg-neutral-800/8',
};

const variantAvatarClasses: Record<DataListActionItemVariant, string> = {
    primary: 'bg-primary-50',
    neutral: 'bg-neutral-50',
};

const variantIconClasses: Record<DataListActionItemVariant, string> = {
    primary: 'text-primary-400',
    neutral: 'text-neutral-500',
};

export const DataListActionItem: React.FC<IDataListActionItemProps> = (props) => {
    const { className, type = 'button', icon, variant, children, ...otherProps } = props;

    return (
        <button
            className={classNames(
                'group flex w-full items-center gap-3 rounded-xl bg-transparent px-4 py-3 text-base leading-tight transition-colors',
                'focus-ring-primary md:gap-4 md:px-6 md:py-5 md:text-lg',
                variantRowClasses[variant],
                className,
            )}
            type={type}
            {...otherProps}
        >
            <span
                className={classNames(
                    'flex size-6 shrink-0 items-center justify-center rounded-full transition-colors md:size-8',
                    'group-hover:bg-neutral-0 group-focus-visible:bg-neutral-0 group-active:bg-neutral-0',
                    variantAvatarClasses[variant],
                )}
            >
                <Icon className={classNames('size-3 md:size-4', variantIconClasses[variant])} icon={icon} />
            </span>
            <span className="flex-1 truncate text-left">{children}</span>
        </button>
    );
};
