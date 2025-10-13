import classNames from 'classnames';
import { type AnchorHTMLAttributes, type HTMLAttributes } from 'react';
import { LinkBase } from '../../link';

type DivPropsWithCustomClick = Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> & {
    onClick?: () => void;
};

export type IDataListItemProps = AnchorHTMLAttributes<HTMLAnchorElement> | DivPropsWithCustomClick;

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
        return (
            <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        (props as DivPropsWithCustomClick).onClick?.();
                    }
                }}
                className={actionItemClasses}
                {...(otherProps as HTMLAttributes<HTMLDivElement>)}
            />
        );
    }

    return <div className={actionItemClasses} {...(otherProps as HTMLAttributes<HTMLDivElement>)} />;
};
