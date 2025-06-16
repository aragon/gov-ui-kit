import classNames from 'classnames';
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes } from 'react';
import { LinkBase } from '../../link';

export type IDataListItemProps =
    | ButtonHTMLAttributes<HTMLButtonElement>
    | AnchorHTMLAttributes<HTMLAnchorElement>
    | HTMLAttributes<HTMLDivElement>;

export const DataListItem: React.FC<IDataListItemProps> = (props) => {
    const { className, ...otherProps } = props;

    const isLinkElement = 'href' in otherProps && otherProps.href != null && otherProps.href !== '';
    const isInteractiveElement = isLinkElement || props.onClick != null;

    const actionItemClasses = classNames(
        'w-full rounded-xl border border-neutral-100 bg-neutral-0 px-4 text-left shadow-neutral-sm transition-all', // Default
        { 'cursor-pointer focus-ring-primary': isInteractiveElement }, // Interactive default state
        { 'hover:border-neutral-200 hover:shadow-neutral active:border-neutral-300': isInteractiveElement }, // Interactive hover state
        { 'cursor-default focus:outline-hidden': !isInteractiveElement }, // Non-interactive default state
        'md:px-6', // Responsive
        className,
    );

    if (isLinkElement) {
        return <LinkBase className={actionItemClasses} {...otherProps} />;
    }

    if (isInteractiveElement) {
        const { type = 'button', ...buttonProps } = otherProps as ButtonHTMLAttributes<HTMLButtonElement>;

        return <button type={type} className={actionItemClasses} {...buttonProps} />;
    }

    return <div className={actionItemClasses} {...(otherProps as HTMLAttributes<HTMLDivElement>)} />;
};
