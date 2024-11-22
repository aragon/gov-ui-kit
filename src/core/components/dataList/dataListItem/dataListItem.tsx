import classNames from 'classnames';
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, useContext } from 'react';
import { LinkBase } from '../../link';
import { dataListContext } from '../dataListContext';

export type IDataListItemProps = ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>;

export const DataListItem: React.FC<IDataListItemProps> = (props) => {
    const { className, ...otherProps } = props;

    // Use the dataListContext directly to support usage of DataListItem component outside the DataListContextProvider.
    const { state, childrenItemCount } = useContext(dataListContext) ?? {};

    // The DataListElement is a skeleton element on initial loading or loading state when no items are being
    // rendered (e.g. after a reset filters action)
    const isSkeletonElement = state === 'initialLoading' || (state === 'loading' && childrenItemCount === 0);

    const isLinkElement = 'href' in otherProps && otherProps.href != null && otherProps.href !== '';
    const isInteractiveElement = !isSkeletonElement && (isLinkElement || props.onClick != null);

    const actionItemClasses = classNames(
        'w-full rounded-xl border border-neutral-100 bg-neutral-0 px-4 text-left shadow-neutral-sm outline-none transition-all focus:outline-none', // Default
        { 'focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset': isInteractiveElement }, // Interactive focus state
        { 'hover:border-neutral-200 hover:shadow-neutral active:border-neutral-300': isInteractiveElement }, // Interactive hover state
        { 'cursor-pointer': isInteractiveElement }, // Interactive default state
        { 'cursor-default': !isInteractiveElement }, // Non-interactive default state
        'md:px-6', // Responsive
        className,
    );

    const commonProps = {
        className: actionItemClasses,
        'aria-hidden': isSkeletonElement,
        tabIndex: isSkeletonElement ? -1 : 0,
    };

    if (!isLinkElement) {
        const { type = 'button', ...buttonProps } = otherProps as ButtonHTMLAttributes<HTMLButtonElement>;

        return <button type={type} {...commonProps} {...buttonProps} />;
    }

    return <LinkBase {...commonProps} {...otherProps} />;
};
