import { useEffect, useRef, useState } from 'react';
import type { IUseCopyReturn } from './useCopy.api';

const resetTimeout = 2000;

export const useCopy = (): IUseCopyReturn => {
    const [isCopied, setIsCopied] = useState(false);
    const timeoutId = useRef<NodeJS.Timeout>(undefined);

    useEffect(() => {
        return () => clearTimeout(timeoutId.current);
    }, []);

    const handleCopy = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        timeoutId.current = setTimeout(() => setIsCopied(false), resetTimeout);
    };

    return { isCopied, handleCopy };
};
