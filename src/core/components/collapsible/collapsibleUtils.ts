import { ssrUtils } from '../../utils/ssrUtils';

export const collapsibleDefaultLineHeight = 24;

/**
 * Computes the line height of an element with intelligent fallback strategy.
 *
 * The function uses a multi-level approach to find the most accurate line-height:
 * 1. First, tries to get line-height from the first <p> child element
 *    - This is important because content often consists of paragraphs with specific typography styles
 *    - For example, `.prose p` classes in Tailwind Typography apply custom line-heights to paragraphs
 *    - Taking line-height from the first paragraph ensures accurate height calculations when content
 *      has different typography than the container
 *
 * 2. If no paragraph is found, falls back to the container element itself
 *    - This handles cases where content doesn't use paragraph tags (images, custom components, etc.)
 *
 * 3. If line-height cannot be computed (SSR, null element, or invalid value), uses the fallback
 *    - Ensures the component works gracefully in all environments
 *
 * @param element - The container element to compute the line height from
 * @param fallback - The fallback line height to use if computation fails (default: 24px)
 * @returns The computed line height in pixels
 */
export const computeElementLineHeight = (
    element: HTMLElement | null,
    fallback: number = collapsibleDefaultLineHeight,
): number => {
    if (element == null || ssrUtils.isServer()) {
        return fallback;
    }

    // Try to get line-height from the first paragraph child if it exists
    // This ensures accurate calculations when paragraphs have different typography than the container
    const firstParagraph = element.querySelector('p');
    const targetElement = firstParagraph ?? element;

    const computed = window.getComputedStyle(targetElement).lineHeight;
    const parsed = parseFloat(computed);
    return Number.isNaN(parsed) ? fallback : parsed;
};

/**
 * Calculates the collapsed height of an element.
 * @param collapsedLines - The number of lines to show while collapsed.
 * @param lineHeight - The line height of the element.
 * @param collapsedPixels - The collapsed pixels of the element.
 * @returns The collapsed height of the element.
 */
export const calculateCollapsedHeight = (
    collapsedLines: number,
    lineHeight: number,
    collapsedPixels?: number,
): number => collapsedPixels ?? lineHeight * collapsedLines;

/**
 * Computes the whether an element is overflowing.
 * @param fullHeight - The full height of the element.
 * @param collapsedHeight - The collapsed height of the element.
 * @param epsilon - The epsilon to use for the overflow.
 * @returns The whether an element is overflowing.
 */
export const computeContentOverflow = (fullHeight: number, collapsedHeight: number, epsilon = 0.5): boolean =>
    fullHeight > collapsedHeight + epsilon;

export interface OverlayHeightParams {
    showOverlay: boolean;
    isOpen: boolean;
    collapsedLines: number;
    overlayLines: number;
    lineHeight: number;
    collapsedHeight: number;
    fallbackLineHeight?: number;
}

export const computeOverlayHeightPx = (params: OverlayHeightParams): number => {
    const {
        showOverlay,
        isOpen,
        collapsedLines,
        overlayLines,
        lineHeight,
        collapsedHeight,
        fallbackLineHeight = collapsibleDefaultLineHeight,
    } = params;

    if (!showOverlay || isOpen) {
        return 0;
    }

    const safeLineHeight = lineHeight > 0 ? lineHeight : fallbackLineHeight;

    // Overlay must not cover all visible content in collapsed state
    const maxVisibleLines = Math.max(0, collapsedLines - 1);
    const sanitizedOverlayLines = Math.min(Math.max(overlayLines, 0), maxVisibleLines);
    const maxOverlayByHeight = Math.max(0, Math.floor((collapsedHeight - safeLineHeight) / safeLineHeight));
    const effectiveOverlayLines = Math.min(sanitizedOverlayLines, maxOverlayByHeight);

    return effectiveOverlayLines * safeLineHeight;
};

/**
 * Result of element height measurements for collapsible calculations.
 */
export interface MeasureHeightsResult {
    /**
     * The current rendered height of the element in the DOM (with clamp/max-height applied).
     */
    clampedClientHeight: number;
    /**
     * The full content height with no clamping and no max-height applied.
     */
    fullHeight: number;
}

/**
 * Measures the current (clamped) clientHeight and the full content height by
 * creating a hidden clone without clamping and without max-height.
 *
 * This allows overflow detection and overlay sizing for mixed-content
 * rich text (e.g. combinations of h1, ul/li, p, code) where a single
 * line-height is not representative.
 */
export const measureElementHeights = (element: HTMLElement | null): MeasureHeightsResult => {
    if (element == null || ssrUtils.isServer()) {
        return { clampedClientHeight: 0, fullHeight: 0 };
    }

    // Height currently rendered in the DOM (with clamp or max-height applied)
    const clampedClientHeight = element.clientHeight;

    // Create an off-DOM clone with identical width but without any clamping
    const clone = element.cloneNode(true) as HTMLElement;

    const inlineSize = element.clientWidth || element.getBoundingClientRect().width || 0;

    // Ensure the clone does not affect layout and renders its full height
    clone.style.cssText = [
        'position:absolute',
        'left:-99999px',
        'top:0',
        'visibility:hidden',
        'pointer-events:none',
        'contain:layout style size',
        `inline-size:${inlineSize.toString()}px`,
        'max-height:none',
        'overflow:visible',
        'display:block',
        '-webkit-line-clamp:unset',
        'WebkitLineClamp:unset',
        'WebkitBoxOrient:unset',
    ].join(';');

    // Append near the original to inherit as many styles as possible
    const parent = element.parentElement ?? document.body;
    parent.appendChild(clone);
    const fullHeight = clone.scrollHeight;
    clone.remove();

    return { clampedClientHeight, fullHeight };
};

export interface OverlayRatioParams {
    /** Number of lines visible when collapsed (requested). */
    collapsedLines: number;
    /** Number of lines used for overlay sizing (requested). */
    overlayLines: number;
    /** Actual rendered height of the collapsed block (in pixels). */
    clampedClientHeight: number;
    /** Minimum visible pixels of content above overlay to avoid full cover. */
    minVisiblePx?: number;
    /** Minimum overlay thickness in pixels (after clamping). */
    minOverlayPx?: number;
    /** Maximum overlay thickness in pixels (after clamping). */
    maxOverlayPx?: number;
}

/**
 * Computes overlay height as a ratio of the actual visible collapsed height
 * instead of relying on a single line-height. This makes the overlay robust
 * for mixed content where each line may have different heights.
 *
 * Constraints:
 * - overlayLines is clamped to [0, collapsedLines - 1]
 * - overlay cannot cover all visible content; we keep at least `minVisiblePx`
 * - final result is clamped within [minOverlayPx, maxOverlayPx]
 */
export const computeOverlayHeightByRatio = (params: OverlayRatioParams): number => {
    const {
        collapsedLines,
        overlayLines,
        clampedClientHeight,
        minVisiblePx = 12,
        minOverlayPx = 16,
        maxOverlayPx = 160,
    } = params;

    if (collapsedLines <= 1 || clampedClientHeight <= 0) {
        return 0;
    }

    const safeOverlayLines = Math.min(Math.max(overlayLines, 0), Math.max(0, collapsedLines - 1));
    if (safeOverlayLines === 0) {
        return 0;
    }

    const byRatio = (safeOverlayLines / collapsedLines) * clampedClientHeight;
    const notAllCovered = Math.max(clampedClientHeight - minVisiblePx, 0);
    const capped = Math.min(byRatio, notAllCovered);

    const result = Math.min(Math.max(capped, minOverlayPx), maxOverlayPx);
    return Math.round(result);
};
