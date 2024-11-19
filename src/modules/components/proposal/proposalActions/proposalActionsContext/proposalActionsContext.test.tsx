import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { testLogger } from '../../../../../core/test';
import {
    type IProposalActionsContext,
    ProposalActionsContextProvider,
    useProposalActionsContext,
} from './proposalActionsContext';

describe('useProposalActionsContext hook', () => {
    const createTestWrapper = (context?: Partial<IProposalActionsContext>) =>
        function TestWrapper(props: { children: ReactNode }) {
            const completeContext: IProposalActionsContext = {
                actionsCount: 0,
                expandedActions: [],
                setExpandedActions: jest.fn(),
                ...context,
            };

            return (
                <ProposalActionsContextProvider value={completeContext}>
                    {props.children}
                </ProposalActionsContextProvider>
            );
        };

    it('throws error when used outside the data list context provider', () => {
        testLogger.suppressErrors();
        expect(() => renderHook(() => useProposalActionsContext())).toThrow();
    });

    it('returns the current values of the data list context', () => {
        const values = { actionsCount: 24, expandedActions: ['1'], setExpandedActions: jest.fn() };
        const { result } = renderHook(() => useProposalActionsContext(), { wrapper: createTestWrapper(values) });
        expect(result.current).toEqual(values);
    });
});
