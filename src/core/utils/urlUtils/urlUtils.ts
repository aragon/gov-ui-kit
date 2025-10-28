class UrlUtils {
    private hasProtocol = (value: string): boolean => /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(value);

    private isLikelyHost = (value: string): boolean => {
        const trimmed = value.trim();
        if (trimmed.length === 0) {
            return false;
        }
        if (trimmed.startsWith('/') || trimmed.startsWith('#') || trimmed.startsWith('?')) {
            return false;
        }
        const domainRegex = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:[:/][^\s]*)?$/;
        const localhostRegex = /^localhost(?::\d+)?(?:\/.*)?$/i;
        const ipv4Regex = /^(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?(?:\/.*)?$/;
        return domainRegex.test(trimmed) || localhostRegex.test(trimmed) || ipv4Regex.test(trimmed);
    };

    /**
     * Normalizes external URLs by adding appropriate protocols.
     * @param value - The URL string to normalize
     * @returns Normalized URL string or undefined if input is invalid
     */
    normalizeExternalHref = (value: string | null | undefined): string | undefined => {
        if (value == null) {
            return undefined;
        }

        const trimmed = value.trim();
        if (trimmed.length === 0) {
            return undefined;
        }

        if (trimmed.startsWith('//')) {
            return `https:${trimmed}`;
        }
        if (this.hasProtocol(trimmed)) {
            return trimmed;
        }
        if (this.isLikelyHost(trimmed)) {
            return `https://${trimmed}`;
        }
        return trimmed;
    };
}

export const urlUtils = new UrlUtils();
