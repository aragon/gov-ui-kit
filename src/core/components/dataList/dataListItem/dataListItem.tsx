import classNames from 'classnames';
import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { LinkBase } from '../../link';

export type DataListItemVariant = 'primary' | 'select';

interface IDataListItemVariantProp {
    /**
     * Visual variant of the item.
     * @default 'primary'
     */
    variant?: DataListItemVariant;
}

type DivPropsWithCustomClick = Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> & {
    onClick?: () => void;
};

export type IDataListItemProps = (AnchorHTMLAttributes<HTMLAnchorElement> | DivPropsWithCustomClick) &
    IDataListItemVariantProp;

export const DataListItem: React.FC<IDataListItemProps> = (props) => {
    const { className, variant = 'primary', ...otherProps } = props;

    const isLinkElement = 'href' in otherProps && otherProps.href != null && otherProps.href !== '';
    const isInteractiveElement = isLinkElement || props.onClick != null;

    const actionItemClasses = classNames(
        'w-full rounded-xl px-4 text-left transition-all', // Default all
        { 'border border-neutral-100 bg-neutral-0 shadow-neutral-sm': variant === 'primary' }, // Default primary
        { 'bg-transparent': variant === 'select' }, // Default select
        { 'focus-ring-primary cursor-pointer': isInteractiveElement }, // Interactive default state
        {
            'hover:border-neutral-200 hover:shadow-neutral active:border-neutral-300':
                isInteractiveElement && variant === 'primary',
        }, // Interactive hover state (primary)
        {
            'hover:bg-neutral-800/4 focus-visible:bg-neutral-800/4 active:bg-neutral-400/8':
                isInteractiveElement && variant === 'select',
        }, // Interactive hover state (select)
        { 'cursor-default focus:outline-hidden': !isInteractiveElement }, // Non-interactive default state
        'md:px-6', // Responsive
        className,
    );

    if (isLinkElement) {
        return <LinkBase className={actionItemClasses} {...otherProps} />;
    }

    if (isInteractiveElement) {
        const { onClick, onKeyDown, ...divProps } = otherProps as DivPropsWithCustomClick;

        const handleClick = () => {
            onClick?.();
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (onClick && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                onClick();
            }

            onKeyDown?.(event);
        };

        return (
            // biome-ignore lint/a11y/useSemanticElements: interactive div with keyboard support matching existing API
            <div
                className={actionItemClasses}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                {...divProps}
            />
        );
    }

    return <div className={actionItemClasses} {...(otherProps as HTMLAttributes<HTMLDivElement>)} />;
};
