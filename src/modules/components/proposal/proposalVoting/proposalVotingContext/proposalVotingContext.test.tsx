import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { testLogger } from '../../../../../core/test';
import { ProposalVotingContextProvider, useProposalVotingContext } from './proposalVotingContext';
import type { IProposalVotingContextProviderProps } from './proposalVotingContext.api';

describe('proposalVotingContext hook', () => {
    const createTestWrapper = (providerProps?: Partial<IProposalVotingContextProviderProps>) =>
        function TestWrapper(props: { children: ReactNode }) {
            const completeProps: IProposalVotingContextProviderProps = { ...providerProps };

            return <ProposalVotingContextProvider {...completeProps}>{props.children}</ProposalVotingContextProvider>;
        };

    it('throws error when used outside the ProposalVoting context provider', () => {
        testLogger.suppressErrors();
        expect(() => renderHook(() => useProposalVotingContext())).toThrow();
    });

    it('returns the current values of the data list context', () => {
        const bodyList = ['body-1', 'body-2'];
        const { result } = renderHook(() => useProposalVotingContext(), { wrapper: createTestWrapper({ bodyList }) });
        expect(result.current.bodyList).toEqual(bodyList);
    });
});
