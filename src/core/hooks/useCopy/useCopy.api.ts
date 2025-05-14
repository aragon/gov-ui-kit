export interface IUseCopyReturn {
    /**
     * Indicates whether the text has been copied. Resets after timeout of 2 seconds.
     */
    isCopied: boolean;
    /**
     * Function to copy the text to the clipboard.
     */
    handleCopy: (text: string) => Promise<void>;
}
