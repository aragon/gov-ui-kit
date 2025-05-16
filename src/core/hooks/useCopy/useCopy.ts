import { useEffect, useRef, useState } from 'react';
import { IconType } from '../../components';
import { clipboardUtils } from '../../utils';

const resetTimeout = 2000;

export interface IUseCopyReturn {
    /**
     * Indicates whether the text has been copied. Resets after timeout of 2 seconds.
     */
    isCopied: boolean;
    /**
     * Default icon to be displayed based on the copied state.
     */
    icon: IconType;
    /**
     * Function to copy the text to the clipboard.
     */
    handleCopy: (text: string) => Promise<void>;
}

export const useCopy = (): IUseCopyReturn => {
    const [isCopied, setIsCopied] = useState(false);
    const timeoutId = useRef<NodeJS.Timeout>(undefined);

    useEffect(() => {
        return () => clearTimeout(timeoutId.current);
    }, []);

    const handleCopy = async (text: string) => {
        await clipboardUtils.copy(text);
        setIsCopied(true);
        timeoutId.current = setTimeout(() => setIsCopied(false), resetTimeout);
    };
    const icon = isCopied ? IconType.CHECKMARK : IconType.COPY;

    return { isCopied, icon, handleCopy };
};
