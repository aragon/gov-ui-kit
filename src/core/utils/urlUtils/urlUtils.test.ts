import { normalizeExternalHref } from './urlUtils';

describe('urlUtils.normalizeExternalHref', () => {
    it('returns https scheme for protocol-relative URLs', () => {
        expect(normalizeExternalHref('//example.com/path')).toBe('https://example.com/path');
    });

    it('keeps URLs with protocol unchanged', () => {
        expect(normalizeExternalHref('http://example.com')).toBe('http://example.com');
        expect(normalizeExternalHref('https://example.com')).toBe('https://example.com');
        expect(normalizeExternalHref('mailto:dev@example.com')).toBe('mailto:dev@example.com');
    });

    it('adds https to bare domains and hosts', () => {
        expect(normalizeExternalHref('example.com')).toBe('https://example.com');
        expect(normalizeExternalHref('sub.example.co.uk/path?x=1#y')).toBe('https://sub.example.co.uk/path?x=1#y');
        expect(normalizeExternalHref('localhost:3000/foo')).toBe('https://localhost:3000/foo');
        expect(normalizeExternalHref('127.0.0.1:8080')).toBe('https://127.0.0.1:8080');
    });

    it('returns trimmed input when not a host or protocol URL', () => {
        expect(normalizeExternalHref('   /relative/path  ')).toBe('/relative/path');
        expect(normalizeExternalHref('#hash')).toBe('#hash');
        expect(normalizeExternalHref('?q=1')).toBe('?q=1');
    });
});
