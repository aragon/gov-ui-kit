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
    const [overlayMinHeight, setOverlayMinHeight] = useState<number>(112);

    const defaultLineHeight = 24;

    const isOpen = isOpenProp ?? isOpenState;
    const contentRef = useRef<HTMLDivElement>(null);

    const calculateCollapsedHeight = useCallback(() => {
        let collapsedHeightBase: number;

        if (collapsedPixels != null) {
            collapsedHeightBase = collapsedPixels;
        } else if (collapsedLines && contentRef.current && typeof window !== 'undefined') {
            const lineHeight = parseFloat(window.getComputedStyle(contentRef.current).lineHeight);
            if (!Number.isNaN(lineHeight)) {
                collapsedHeightBase = lineHeight * collapsedLines;
            } else {
                collapsedHeightBase = collapsedLines * defaultLineHeight;
            }
        } else {
            collapsedHeightBase = collapsedLines * defaultLineHeight;
        }

        if (showOverlay && !isOpen) {
            // Clamp to the current overlay min height
            return Math.max(collapsedHeightBase, overlayMinHeight);
        }

        return collapsedHeightBase;
    }, [collapsedPixels, collapsedLines, defaultLineHeight, showOverlay, isOpen, overlayMinHeight]);

    useEffect(() => {
        if (!showOverlay) {
            return;
        }

        const mdBreakpointPx = 768; // Tailwind default 'md'
        const updateOverlayMinHeight = () => {
            if (typeof window === 'undefined') {
                return;
            }
            // Tailwind sizes: h-28 (base) => 7rem (112px), md:h-32 => 8rem (128px)
            const next = window.innerWidth >= mdBreakpointPx ? 128 : 112;
            setOverlayMinHeight(next);
        };

        updateOverlayMinHeight();
        window.addEventListener('resize', updateOverlayMinHeight);
        return () => window.removeEventListener('resize', updateOverlayMinHeight);
    }, [showOverlay]);

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
            const collapsedHeight = calculateCollapsedHeight();
            const contentHeight = content.scrollHeight;
            const isContentOverflowing = contentHeight > collapsedHeight;

            setIsOverflowing(isContentOverflowing);
            setMaxHeight(isContentOverflowing ? contentHeight : collapsedHeight);
        };

        const observer = new ResizeObserver(() => checkOverflow());
        observer.observe(content);
        checkOverflow();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', checkOverflow);
        }

        return () => {
            observer.disconnect();
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', checkOverflow);
            }
        };
    }, [collapsedLines, collapsedPixels, calculateCollapsedHeight]);

    const collapsedHeight = calculateCollapsedHeight();
    const maxHeightProcessed = `${isOpen ? maxHeight.toString() : collapsedHeight.toString()}px`;

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
