import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { testLogger } from '../../../../test';
import { DialogAlertContextProvider, useDialogAlertContext, type IDialogAlertContext } from './dialogAlertContext';

describe('useDialogAlertContext hook', () => {
    const createTestWrapper = (context?: Partial<IDialogAlertContext>) =>
        function TestWrapper(props: { children: ReactNode }) {
            const completeContext: IDialogAlertContext = {
                variant: 'info',
                ...context,
            };

            return <DialogAlertContextProvider value={completeContext}>{props.children}</DialogAlertContextProvider>;
        };

    it('throws error when used outside the dialog alert context provider', () => {
        testLogger.suppressErrors();
        expect(() => renderHook(() => useDialogAlertContext())).toThrow();
    });

    it('returns the current values of the dialog alert context', () => {
        const values = { variant: 'critical' as const };
        const { result } = renderHook(() => useDialogAlertContext(), { wrapper: createTestWrapper(values) });
        expect(result.current).toEqual(values);
    });
});
