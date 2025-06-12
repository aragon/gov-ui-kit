import classNames from 'classnames';
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, useContext } from 'react';
import { LinkBase } from '../../link';
import { dataListContext } from '../dataListContext';

export type IDataListItemProps =
    | ButtonHTMLAttributes<HTMLButtonElement>
    | AnchorHTMLAttributes<HTMLAnchorElement>
    | HTMLAttributes<HTMLDivElement>;

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
        'w-full rounded-xl border border-neutral-100 bg-neutral-0 px-4 text-left shadow-neutral-sm transition-all', // Default
        { 'cursor-pointer focus-ring-primary': isInteractiveElement }, // Interactive default state
        { 'hover:border-neutral-200 hover:shadow-neutral active:border-neutral-300': isInteractiveElement }, // Interactive hover state
        { 'cursor-default focus:outline-hidden': !isInteractiveElement }, // Non-interactive default state
        'md:px-6', // Responsive
        className,
    );

    const commonProps = {
        className: actionItemClasses,
        'aria-hidden': isSkeletonElement,
        tabIndex: isSkeletonElement ? -1 : 0,
    };

    if (isLinkElement) {
        return <LinkBase {...commonProps} {...otherProps} />;
    }

    if (isInteractiveElement) {
        const { type = 'button', ...buttonProps } = otherProps as ButtonHTMLAttributes<HTMLButtonElement>;

        return <button type={type} {...commonProps} {...buttonProps} />;
    }

    return <div {...commonProps} {...(otherProps as HTMLAttributes<HTMLDivElement>)} />;
};
