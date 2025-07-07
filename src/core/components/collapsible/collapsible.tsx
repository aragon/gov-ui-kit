import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../button';
import { Icon, IconType } from '../icon';
import { type ICollapsibleProps } from './collapsible.api';

export const Collapsible: React.FC<ICollapsibleProps> = (props) => {
    const {
        collapsedLines = 3,
        collapsedPixels,
        isOpen: isOpenProp,
        defaultOpen = false,
        buttonLabelOpened,
        buttonLabelClosed,
        showOverlay = false,
        className,
        onToggle,
        children,
        ...otherProps
    } = props;

    const [isOpenState, setIsOpenState] = useState(defaultOpen);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [maxHeight, setMaxHeight] = useState(0);

    const isOpen = isOpenProp ?? isOpenState;
    const contentRef = useRef<HTMLDivElement>(null);

    const calculateCollapsedHeight = useCallback(() => {
        if (collapsedPixels != null) {
            return collapsedPixels;
        }

        const defaultLineHeight = 24;
        if (collapsedLines && contentRef.current) {
            const lineHeight = parseFloat(window.getComputedStyle(contentRef.current).lineHeight);

            if (!Number.isNaN(lineHeight)) {
                return lineHeight * collapsedLines;
            }
        }

        return collapsedLines * defaultLineHeight;
    }, [collapsedPixels, collapsedLines]);

    const [collapsedHeight, setCollapsedHeight] = useState(calculateCollapsedHeight());

    const toggle = useCallback(() => {
        setIsOpenState(!isOpen);
        onToggle?.(!isOpen);
    }, [isOpen, onToggle]);

    useEffect(() => {
        const content = contentRef.current;

        if (!content) {
            return;
        }

        const checkOverflow = () => {
            const currentCollapsedHeight = calculateCollapsedHeight();
            setCollapsedHeight(currentCollapsedHeight);

            const contentHeight = content.scrollHeight;
            const isContentOverflowing = contentHeight > currentCollapsedHeight;

            setIsOverflowing(isContentOverflowing);
            setMaxHeight(isContentOverflowing ? contentHeight : currentCollapsedHeight);
        };

        const observer = new ResizeObserver(() => checkOverflow());
        observer.observe(content);
        checkOverflow();

        return () => observer.disconnect();
    }, [collapsedLines, collapsedPixels, calculateCollapsedHeight]);

    const maxHeightProcessed = `${(isOpen ? maxHeight : collapsedHeight).toString()}px`;

    const footerClassName = classNames(
        {
            'left-0 z-[var(--guk-collapsible-overlay-z-index)] flex w-full items-end bg-linear-to-t from-neutral-0 from-40% to-transparent':
                showOverlay,
        },
        { 'absolute bottom-0 h-28 md:h-32': !isOpen && showOverlay },
        { 'h-auto md:h-auto mt-4': isOpen && showOverlay },
        { 'mt-4': isOverflowing && !showOverlay },
    );

    return (
        <div className={classNames('relative', { 'bg-neutral-0': showOverlay }, className)} {...otherProps}>
            <div ref={contentRef} style={{ maxHeight: maxHeightProcessed }} className="overflow-hidden transition-all">
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
                            className="group text-primary-400 hover:text-primary-600 active:text-primary-800 flex cursor-pointer items-center"
                        >
                            {isOpen ? buttonLabelOpened : buttonLabelClosed}
                            <Icon
                                icon={isOpen ? IconType.CHEVRON_UP : IconType.CHEVRON_DOWN}
                                size="sm"
                                className="text-primary-300 group-hover:text-primary-500 group-active:text-primary-700 ml-2"
                            />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
