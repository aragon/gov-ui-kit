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
    computeOverlayHeightByRatio,
    computeOverlayHeightPx,
    measureElementHeights,
    calculateCollapsedHeight as utilsCalculateCollapsedHeight,
} from './collapsibleUtils';

/**
 * Collapsible component that can wrap any content and visually collapse it for space-saving purposes.
 *
 * @param props - The component props
 * @param props.collapsedLines - Number of text lines to show while collapsed (default: 3)
 * @param props.collapsedPixels - Exact pixel height for the collapsible container that will override collapsedLines prop if defined
 * @param props.overlayLines - Number of text lines used for the gradient overlay height when collapsed (default: 2)
 * @param props.isOpen - Controlled state of the collapsible container (default: false)
 * @param props.defaultOpen - Default state of the collapsible container (default: false)
 * @param props.buttonLabelClosed - The label to display on the trigger button when the collapsible container is closed
 * @param props.buttonLabelOpened - The label to display on the trigger button when the collapsible container is open
 * @param props.showOverlay - Show overlay when the collapsible container is open (default: false)
 * @param props.onToggle - Callback function that is called when the collapsible container is toggled
 * @param props.children - The content to be collapsible
 * @returns The rendered Collapsible component
 */
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

        // Compute requested collapsed height for open-state maxHeight and overflow comparisons
        const collapsedHeight = utilsCalculateCollapsedHeight(collapsedLines, lh, collapsedPixels);

        // Measure actual DOM heights with current state (clamped or not)
        const { clampedClientHeight: clampedH, fullHeight } = measureElementHeights(content);

        // Overflow: compare full height to requested collapsed height
        const overflowing = computeContentOverflow(fullHeight, collapsedHeight);
        setIsOverflowing(overflowing);
        setMaxHeightPx(overflowing ? fullHeight : collapsedHeight);

        // Overlay height by ratio of actual clamped height to requested overlayLines
        const overlayHeightByRatio = computeOverlayHeightByRatio({
            collapsedLines,
            overlayLines,
            clampedClientHeight: clampedH,
        });

        // Fallback to legacy computation if ratio returns 0 but overlay should show
        const legacyOverlayFallback = computeOverlayHeightPx({
            showOverlay,
            isOpen,
            collapsedLines,
            overlayLines,
            lineHeight: lh,
            collapsedHeight,
        });

        const finalOverlayHeight = !showOverlay || isOpen ? 0 : overlayHeightByRatio || legacyOverlayFallback;
        setOverlayHeightPx(finalOverlayHeight);
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
                data-testid="collapsible-content"
                style={{
                    ...(isOpen
                        ? { maxHeight: maxHeightPx }
                        : useLineClamp
                          ? {}
                          : { maxHeight: collapsedHeightComputed }),
                    ...collapsedClampStyle,
                }}
                className="relative overflow-hidden transition-all"
            >
                {children}
                {isOverflowing && !isOpen && showOverlay && (
                    <div
                        className={classNames(
                            overlayClassName,
                            'from-neutral-0/98 via-neutral-0/85 to-neutral-0/30 bg-gradient-to-t',
                        )}
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
