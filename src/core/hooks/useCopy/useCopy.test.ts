import { act, renderHook } from '@testing-library/react';
import { clipboardUtils } from '../../utils';
import { useCopy } from './useCopy';

describe('useCopy hook', () => {
    const copyMock = jest.spyOn(clipboardUtils, 'copy');

    afterEach(() => {
        copyMock.mockReset();
    });

    it('handleCopy copies text to clipboard and set isCopied to true', async () => {
        const { result } = renderHook(() => useCopy());

        await act(async () => {
            await result.current.handleCopy('test text');
        });

        expect(copyMock).toHaveBeenCalledWith('test text');
        expect(result.current.isCopied).toBe(true);
    });

    it('resets isCopied to false after timeout', async () => {
        jest.useFakeTimers();
        const { result } = renderHook(() => useCopy());

        await act(async () => {
            await result.current.handleCopy('test text');
        });

        expect(result.current.isCopied).toBe(true);

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(result.current.isCopied).toBe(false);

        jest.useRealTimers();
    });
});
