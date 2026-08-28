import classNames from 'classnames';
import { type AnchorHTMLAttributes, type HTMLAttributes, useId } from 'react';
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
    const { className, variant = 'primary', children, ...otherProps } = props;
    const contentId = useId();

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

    // The wrapper is display-contents so children lay out as direct children of the item, keeping consumer
    // flex/grid classes working. Nested interactive elements are raised above the overlay link/button.
    const interactiveContent = (
        <div
            className="pointer-events-none contents [&_[role=button]]:pointer-events-auto [&_[role=button]]:relative [&_[role=button]]:z-10 [&_a]:pointer-events-auto [&_a]:relative [&_a]:z-10 [&_button]:pointer-events-auto [&_button]:relative [&_button]:z-10"
            id={contentId}
        >
            {children}
        </div>
    );

    if (isLinkElement) {
        return (
            <div className={classNames(actionItemClasses, 'relative')}>
                <LinkBase
                    {...(otherProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
                    aria-labelledby={contentId}
                    className="absolute inset-0 z-0 cursor-pointer"
                />
                {interactiveContent}
            </div>
        );
    }

    if (isInteractiveElement) {
        const { onClick, onKeyDown, ...divProps } = otherProps as DivPropsWithCustomClick;

        const handleClick = () => {
            onClick?.();
        };

        return (
            <div className={classNames(actionItemClasses, 'relative')} {...divProps}>
                <button
                    aria-labelledby={contentId}
                    className="focus-ring-primary absolute inset-0 z-0 cursor-pointer border-0 bg-transparent p-0"
                    onClick={handleClick}
                    onKeyDown={onKeyDown as unknown as React.KeyboardEventHandler<HTMLButtonElement>}
                    type="button"
                />
                {interactiveContent}
            </div>
        );
    }

    return (
        <div className={actionItemClasses} {...(otherProps as HTMLAttributes<HTMLDivElement>)}>
            {children}
        </div>
    );
};
