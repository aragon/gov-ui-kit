import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';
import { testLogger } from '../../../core/test';
import { generateFormContext } from '../../testUtils';
import { useFormContext, type UseFormContextReturn } from './useFormContext';

describe('useFormContext hook', () => {
    const createHookWrapper = (context?: Partial<UseFormContextReturn>) =>
        function hookWrapper(props: { children: ReactNode }) {
            const completeContext: UseFormContextReturn = generateFormContext(context);

            return <FormProvider {...completeContext}>{props.children}</FormProvider>;
        };

    it('throws error when enabled property is set to true and hook is not used inside a form context provider', () => {
        testLogger.suppressErrors();
        expect(() => renderHook(() => useFormContext(true))).toThrow();
    });

    it('returns empty object when enabled property is false and hook is not used inside a form context provider', () => {
        const { result } = renderHook(() => useFormContext(false));
        expect(result.current).toEqual({});
    });

    it('correctly returns the form context values', () => {
        const formContext = generateFormContext();
        const { result } = renderHook(() => useFormContext(true), { wrapper: createHookWrapper(formContext) });
        expect(result.current).toEqual(formContext);
    });
});
