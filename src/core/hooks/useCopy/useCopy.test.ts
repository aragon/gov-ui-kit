import { act, renderHook } from '@testing-library/react';
import { useCopy } from './useCopy';

describe('useCopy hook', () => {
    const writeTextSpy = jest.fn();

    Object.assign(navigator, {
        clipboard: {
            writeText: writeTextSpy,
        },
    });

    afterEach(() => {
        writeTextSpy.mockReset();
    });

    it('should copy text to clipboard and set isCopied to true', async () => {
        const { result } = renderHook(() => useCopy());

        await act(async () => {
            await result.current.handleCopy('test text');
        });

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
        expect(result.current.isCopied).toBe(true);
    });
});
