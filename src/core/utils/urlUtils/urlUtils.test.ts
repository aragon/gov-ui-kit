import { urlUtils } from './urlUtils';

describe('urlUtils', () => {
    describe('normalizeExternalHref', () => {
        it('returns https scheme for protocol-relative URLs', () => {
            expect(urlUtils.normalizeExternalHref('//example.com/path')).toBe('https://example.com/path');
        });

        it('keeps URLs with protocol unchanged', () => {
            expect(urlUtils.normalizeExternalHref('http://example.com')).toBe('http://example.com');
            expect(urlUtils.normalizeExternalHref('https://example.com')).toBe('https://example.com');
            expect(urlUtils.normalizeExternalHref('mailto:dev@example.com')).toBe('mailto:dev@example.com');
        });

        it('adds https to bare domains and hosts', () => {
            expect(urlUtils.normalizeExternalHref('example.com')).toBe('https://example.com');
            expect(urlUtils.normalizeExternalHref('sub.example.co.uk/path?x=1#y')).toBe(
                'https://sub.example.co.uk/path?x=1#y',
            );
            expect(urlUtils.normalizeExternalHref('localhost:3000/foo')).toBe('https://localhost:3000/foo');
            expect(urlUtils.normalizeExternalHref('127.0.0.1:8080')).toBe('https://127.0.0.1:8080');
        });

        it('returns trimmed input when not a host or protocol URL', () => {
            expect(urlUtils.normalizeExternalHref('   /relative/path  ')).toBe('/relative/path');
            expect(urlUtils.normalizeExternalHref('#hash')).toBe('#hash');
            expect(urlUtils.normalizeExternalHref('?q=1')).toBe('?q=1');
        });

        it('returns undefined for null, undefined, or empty string input', () => {
            expect(urlUtils.normalizeExternalHref(undefined)).toBe(undefined);
            expect(urlUtils.normalizeExternalHref(null)).toBe(undefined);
            expect(urlUtils.normalizeExternalHref('')).toBe(undefined);
            expect(urlUtils.normalizeExternalHref('   ')).toBe(undefined);
        });
    });
});
