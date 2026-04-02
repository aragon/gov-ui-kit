import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { testLogger } from '../../../test';
import { dataListTestUtils } from '../dataListTestUtils';
import { DataListContextProvider, type IDataListContext, useDataListContext } from './dataListContext';

describe('useDataListContext hook', () => {
    const createTestWrapper = (context?: Partial<IDataListContext>) =>
        function TestWrapper(props: { children: ReactNode }) {
            const completeContext = dataListTestUtils.generateContextValues(context);

            return <DataListContextProvider value={completeContext}>{props.children}</DataListContextProvider>;
        };

    it('throws error when used outside the data list context provider', () => {
        testLogger.suppressErrors();
        expect(() => renderHook(() => useDataListContext())).toThrow();
    });

    it('returns the current values of the data list context', () => {
        const values = dataListTestUtils.generateContextValues({ currentPage: 3, pageSize: 12 });
        const { result } = renderHook(() => useDataListContext(), { wrapper: createTestWrapper(values) });
        expect(result.current).toEqual(values);
    });
});
