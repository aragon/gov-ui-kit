import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { testLogger } from '../../../../../core/test';
import { generateProposalActionsContext } from '../proposalActionsTestUtils';
import {
    type IProposalActionsContext,
    ProposalActionsContextProvider,
    useProposalActionsContext,
} from './proposalActionsContext';

describe('useProposalActionsContext hook', () => {
    const createTestWrapper = (context?: Partial<IProposalActionsContext>) =>
        function TestWrapper(props: { children: ReactNode }) {
            return (
                <ProposalActionsContextProvider value={generateProposalActionsContext(context)}>
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
        expect(result.current.actionsCount).toEqual(values.actionsCount);
        expect(result.current.expandedActions).toEqual(values.expandedActions);
        expect(result.current.setExpandedActions).toEqual(values.setExpandedActions);
    });
});
