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
