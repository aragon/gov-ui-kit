import { ssrUtils } from '../../utils/ssrUtils';
import {
    calculateCollapsedHeight,
    collapsibleDefaultLineHeight,
    computeContentOverflow,
    computeElementLineHeight,
    computeOverlayHeightPx,
    type OverlayHeightParams,
} from './collapsibleUtils';

describe('collapsibleUtils', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('computeElementLineHeight', () => {
        it('returns fallback when element is null', () => {
            const result = computeElementLineHeight(null, 30);
            expect(result).toBe(30);
        });

        it('returns fallback on server (SSR)', () => {
            const spy = jest.spyOn(ssrUtils, 'isServer').mockReturnValue(true);
            const div = document.createElement('div');
            const result = computeElementLineHeight(div, 28);
            expect(result).toBe(28);
            spy.mockRestore();
        });

        it('parses numeric line-height from computed styles', () => {
            const div = document.createElement('div');
            jest.spyOn(window, 'getComputedStyle').mockReturnValue({
                lineHeight: '19.5px',
            } as unknown as CSSStyleDeclaration);
            const result = computeElementLineHeight(div, 10);
            expect(result).toBe(19.5);
        });

        it('falls back when computed line-height is NaN', () => {
            const div = document.createElement('div');
            jest.spyOn(window, 'getComputedStyle').mockReturnValue({
                lineHeight: 'normal',
            } as unknown as CSSStyleDeclaration);
            const result = computeElementLineHeight(div, 22);
            expect(result).toBe(22);
        });

        it('prefers line-height from first paragraph over container', () => {
            const div = document.createElement('div');
            const p = document.createElement('p');
            div.appendChild(p);

            const getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle');

            // Container has 20px line-height
            getComputedStyleSpy.mockImplementation((element) => {
                if (element === p) {
                    return { lineHeight: '28px' } as unknown as CSSStyleDeclaration;
                }
                return { lineHeight: '20px' } as unknown as CSSStyleDeclaration;
            });

            const result = computeElementLineHeight(div, 10);
            // Should use paragraph's line-height (28px), not container's (20px)
            expect(result).toBe(28);
            expect(getComputedStyleSpy).toHaveBeenCalledWith(p);
        });

        it('uses container line-height when no paragraph exists', () => {
            const div = document.createElement('div');
            const span = document.createElement('span');
            div.appendChild(span);

            jest.spyOn(window, 'getComputedStyle').mockReturnValue({
                lineHeight: '25px',
            } as unknown as CSSStyleDeclaration);

            const result = computeElementLineHeight(div, 10);
            // Should use container's line-height since there's no <p> element
            expect(result).toBe(25);
        });

        it('handles multiple paragraphs by using the first one', () => {
            const div = document.createElement('div');
            const p1 = document.createElement('p');
            const p2 = document.createElement('p');
            div.appendChild(p1);
            div.appendChild(p2);

            const getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle');

            getComputedStyleSpy.mockImplementation((element) => {
                if (element === p1) {
                    return { lineHeight: '30px' } as unknown as CSSStyleDeclaration;
                }
                if (element === p2) {
                    return { lineHeight: '40px' } as unknown as CSSStyleDeclaration;
                }
                return { lineHeight: '20px' } as unknown as CSSStyleDeclaration;
            });

            const result = computeElementLineHeight(div, 10);
            // Should use first paragraph's line-height (30px)
            expect(result).toBe(30);
            expect(getComputedStyleSpy).toHaveBeenCalledWith(p1);
        });
    });

    describe('calculateCollapsedHeight', () => {
        it('uses collapsedPixels if provided', () => {
            expect(calculateCollapsedHeight(3, 20, 120)).toBe(120);
        });

        it('computes from lines when collapsedPixels is undefined', () => {
            expect(calculateCollapsedHeight(4, 18)).toBe(72);
        });
    });

    describe('computeContentOverflow', () => {
        it('returns false when within epsilon tolerance', () => {
            expect(computeContentOverflow(100.5, 100, 0.5)).toBe(false);
            expect(computeContentOverflow(100.49, 100, 0.5)).toBe(false);
        });

        it('returns true when above epsilon', () => {
            expect(computeContentOverflow(100.51, 100, 0.5)).toBe(true);
        });
    });

    describe('computeOverlayHeightPx', () => {
        const baseParams: Omit<OverlayHeightParams, 'overlayLines'> = {
            showOverlay: true,
            isOpen: false,
            collapsedLines: 5,
            lineHeight: 18,
            collapsedHeight: 90,
            fallbackLineHeight: collapsibleDefaultLineHeight,
        };

        it('returns 0 when overlay is hidden or open', () => {
            expect(computeOverlayHeightPx({ ...baseParams, showOverlay: false, overlayLines: 2 })).toBe(0);
            expect(computeOverlayHeightPx({ ...baseParams, isOpen: true, overlayLines: 2 })).toBe(0);
        });

        it('respects overlayLines when within safe bounds', () => {
            // collapsedLines=5, lineHeight=18 -> maxOverlayByHeight=4, maxVisibleLines=4
            expect(computeOverlayHeightPx({ ...baseParams, overlayLines: 2 })).toBe(36);
        });

        it('limits overlay height to not cover all visible content', () => {
            // overlayLines greater than maxVisibleLines (4) should clamp to 4
            expect(computeOverlayHeightPx({ ...baseParams, overlayLines: 10 })).toBe(72);
        });

        it('returns 0 when collapsedLines is 1 (no lines to cover safely)', () => {
            const params = { ...baseParams, collapsedLines: 1, collapsedHeight: 18 };
            expect(computeOverlayHeightPx({ ...params, overlayLines: 2 })).toBe(0);
        });

        it('uses fallback line height when provided lineHeight is not positive', () => {
            const params = { ...baseParams, lineHeight: 0, collapsedHeight: 72 };
            // fallback=24, collapsedLines=5 -> maxVisibleLines=4; maxOverlayByHeight=floor((72-24)/24)=2
            expect(computeOverlayHeightPx({ ...params, overlayLines: 3 })).toBe(48);
        });

        it('sanitizes negative overlayLines to 0', () => {
            expect(computeOverlayHeightPx({ ...baseParams, overlayLines: -5 })).toBe(0);
        });
    });
});
