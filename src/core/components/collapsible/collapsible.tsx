import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRandomId } from '../../hooks';
import { Button } from '../button';
import { Icon, IconType } from '../icon';
import { type ICollapsibleProps } from './collapsible.api';
import {
    collapsibleDefaultLineHeight,
    computeContentOverflow,
    computeElementLineHeight,
    computeOverlayHeightPx,
    calculateCollapsedHeight as utilsCalculateCollapsedHeight,
} from './collapsibleUtils';

export const Collapsible: React.FC<ICollapsibleProps> = (props) => {
    const {
        collapsedLines = 3,
        collapsedPixels,
        overlayLines = 2,
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
    const [maxHeightPx, setMaxHeightPx] = useState(0);
    const [lineHeightPx, setLineHeightPx] = useState<number>(collapsibleDefaultLineHeight);
    const [overlayHeightPx, setOverlayHeightPx] = useState<number>(0);

    const isOpen = isOpenProp ?? isOpenState;
    const contentRef = useRef<HTMLDivElement>(null);
    const contentId = useRandomId();

    const getLineHeight: () => number = useCallback(
        () => computeElementLineHeight(contentRef.current, collapsibleDefaultLineHeight),
        [],
    );

    const recalcMeasurements: () => void = useCallback(() => {
        const content = contentRef.current;
        if (!content) {
            return;
        }

        const lh = getLineHeight();
        setLineHeightPx(lh);

        const collapsedHeight = utilsCalculateCollapsedHeight(collapsedLines, lh, collapsedPixels);
        const fullHeight = content.scrollHeight;
        const overflowing = computeContentOverflow(fullHeight, collapsedHeight);
        setIsOverflowing(overflowing);
        setMaxHeightPx(overflowing ? fullHeight : collapsedHeight);

        const overlayHeight = computeOverlayHeightPx({
            showOverlay,
            isOpen,
            collapsedLines,
            overlayLines,
            lineHeight: lh,
            collapsedHeight,
        });
        setOverlayHeightPx(overlayHeight);
    }, [collapsedLines, collapsedPixels, overlayLines, showOverlay, isOpen, getLineHeight]);

    const toggle: () => void = useCallback(() => {
        setIsOpenState(!isOpen);
        onToggle?.(!isOpen);
    }, [isOpen, onToggle]);

    useEffect(() => {
        const content = contentRef.current;
        if (!content) {
            return;
        }

        const observer = new ResizeObserver(() => recalcMeasurements());
        observer.observe(content);
        recalcMeasurements();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', recalcMeasurements);
        }

        return () => {
            observer.disconnect();
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', recalcMeasurements);
            }
        };
    }, [recalcMeasurements]);

    const collapsedHeightComputed = utilsCalculateCollapsedHeight(collapsedLines, lineHeightPx, collapsedPixels);
    const maxHeightProcessed: number = isOpen ? maxHeightPx : collapsedHeightComputed;

    const useLineClamp = collapsedPixels == null;
    const collapsedClampStyle: React.CSSProperties =
        !isOpen && useLineClamp
            ? {
                  display: '-webkit-box',
                  WebkitLineClamp: collapsedLines,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
              }
            : {};

    const overlayClassName = classNames(
        'pointer-events-none absolute bottom-0 left-0 z-[var(--guk-collapsible-overlay-z-index)] w-full',
    );

    const triggerClassName = classNames(
        { 'mt-0': showOverlay && !isOpen },
        { 'mt-4': (showOverlay && isOpen) || (!showOverlay && isOverflowing) },
    );

    return (
        <div className={classNames('relative', { 'bg-neutral-0': showOverlay }, className)} {...otherProps}>
            <div
                id={contentId}
                ref={contentRef}
                style={{ maxHeight: maxHeightProcessed, ...collapsedClampStyle }}
                className="relative overflow-hidden transition-all"
            >
                {children}
                {isOverflowing && !isOpen && showOverlay && (
                    <div
                        className={classNames(overlayClassName, 'from-neutral-0 to-neutral-0/80 bg-gradient-to-t')}
                        style={{ height: overlayHeightPx }}
                        data-testid="collapsible-overlay"
                    />
                )}
            </div>
            {isOverflowing && (
                <div className={triggerClassName}>
                    {showOverlay ? (
                        <Button
                            onClick={toggle}
                            variant="tertiary"
                            size="md"
                            iconRight={isOpen ? IconType.CHEVRON_UP : IconType.CHEVRON_DOWN}
                            aria-expanded={isOpen}
                            aria-controls={contentId}
                            className="relative z-[1]"
                        >
                            {isOpen ? buttonLabelOpened : buttonLabelClosed}
                        </Button>
                    ) : (
                        <button
                            onClick={toggle}
                            className="group text-primary-400 hover:text-primary-600 active:text-primary-800 flex cursor-pointer items-center"
                            aria-expanded={isOpen}
                            aria-controls={contentId}
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
