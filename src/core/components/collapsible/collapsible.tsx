import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../button';
import { Icon, IconType } from '../icon';
import { type ICollapsibleProps } from './collapsible.api';

const sizedCollapsedHeights = {
    sm: 128,
    md: 256,
    lg: 384,
};

export const Collapsible: React.FC<ICollapsibleProps> = ({
    collapsedSize = 'md',
    customCollapsedHeight,
    isOpen: controlledIsOpen,
    defaultOpen = false,
    buttonLabelOpened,
    buttonLabelClosed,
    showOverlay = false,
    className,
    onToggle,
    children,
    ...otherProps
}) => {
    const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
    const [isOverflowing, setIsOverflowing] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState<number | null>();
    const maxCollapsedHeight = customCollapsedHeight ?? sizedCollapsedHeights[collapsedSize];

    const toggle = useCallback(() => {
        const newIsOpen = !isOpen;
        if (!isControlled) {
            setInternalIsOpen(newIsOpen);
        }
        onToggle?.(newIsOpen);
    }, [isOpen, isControlled, onToggle]);

    useEffect(() => {
        const content = contentRef.current;

        const checkOverflow = () => {
            if (content) {
                const contentHeight = content.scrollHeight;
                const isContentOverflowing = contentHeight > maxCollapsedHeight;

                setIsOverflowing(isContentOverflowing);
                setMaxHeight(isContentOverflowing ? contentHeight : maxCollapsedHeight);
            }
        };

        const observer = new ResizeObserver(() => checkOverflow());
        if (content) {
            observer.observe(content);
        }

        checkOverflow();

        return () => {
            observer.disconnect();
        };
    }, [maxCollapsedHeight]);

    const parsedMaxHeight = !isOpen ? `${maxCollapsedHeight}px` : `${maxHeight}px`;

    const outerClassName = classNames('relative', { 'bg-neutral-0': showOverlay }, className);
    const contentClassNames = classNames(
        'overflow-hidden transition-all', // base
    );

    const footerClassName = classNames(
        {
            'left-0 z-[var(--guk-collapsible-overlay-z-index)] flex w-full items-end bg-gradient-to-t from-neutral-0 from-40% to-transparent':
                showOverlay,
        },
        { 'absolute bottom-0 h-28 md:h-32': !isOpen && showOverlay },
        { 'h-auto md:h-auto mt-4': isOpen && showOverlay },
        { 'mt-4': isOverflowing && !showOverlay },
    );

    return (
        <div className={outerClassName} {...otherProps}>
            <div ref={contentRef} style={{ maxHeight: parsedMaxHeight }} className={contentClassNames}>
                {children}
            </div>
            {isOverflowing && (
                <div className={footerClassName}>
                    {showOverlay ? (
                        <Button
                            onClick={toggle}
                            variant="tertiary"
                            size="md"
                            iconRight={isOpen ? IconType.CHEVRON_UP : IconType.CHEVRON_DOWN}
                        >
                            {isOpen ? buttonLabelOpened : buttonLabelClosed}
                        </Button>
                    ) : (
                        <button
                            onClick={toggle}
                            className="group flex items-center text-primary-400 hover:text-primary-600 active:text-primary-800"
                        >
                            {isOpen ? buttonLabelOpened : buttonLabelClosed}
                            <Icon
                                icon={isOpen ? IconType.CHEVRON_UP : IconType.CHEVRON_DOWN}
                                size="sm"
                                className="ml-2 text-primary-300 group-hover:text-primary-500 group-active:text-primary-700"
                            />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
