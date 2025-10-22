const hasProtocol = (value: string): boolean => /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(value);

const isLikelyHost = (value: string): boolean => {
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

export const normalizeExternalHref = (value: string): string => {
    const trimmed = value.trim();
    if (trimmed.startsWith('//')) {
        return `https:${trimmed}`;
    }
    if (hasProtocol(trimmed)) {
        return trimmed;
    }
    if (isLikelyHost(trimmed)) {
        return `https://${trimmed}`;
    }
    return trimmed;
};
