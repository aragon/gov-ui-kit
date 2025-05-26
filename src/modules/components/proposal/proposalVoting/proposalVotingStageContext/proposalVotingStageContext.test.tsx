import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { testLogger } from '../../../../../core/test';
import {
    type IProposalVotingStageContext,
    ProposalVotingStageContextProvider,
    useProposalVotingStageContext,
} from './proposalVotingStageContext';

describe('proposalVotingStageContext hook', () => {
    const createTestWrapper = (context?: Partial<IProposalVotingStageContext>) =>
        function TestWrapper(props: { children: ReactNode }) {
            const completeContext: IProposalVotingStageContext = { ...context };

            return (
                <ProposalVotingStageContextProvider value={completeContext}>
                    {props.children}
                </ProposalVotingStageContextProvider>
            );
        };

    it('throws error when used outside the ProposalVotingStage context provider', () => {
        testLogger.suppressErrors();
        expect(() => renderHook(() => useProposalVotingStageContext())).toThrow();
    });

    it('returns the current values of the data list context', () => {
        const values = { bodyList: ['body-1', 'body-2'] };
        const { result } = renderHook(() => useProposalVotingStageContext(), { wrapper: createTestWrapper(values) });
        expect(result.current).toEqual(values);
    });
});
