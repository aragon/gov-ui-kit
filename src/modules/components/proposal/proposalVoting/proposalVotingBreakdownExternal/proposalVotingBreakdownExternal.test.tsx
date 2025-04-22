import { render, screen } from '@testing-library/react';
import { IconType, Tabs } from '../../../../../core';
import { testLogger } from '../../../../../core/test';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import {
    type IProposalVotingBreakdownExternalProps,
    ProposalVotingBreakdownExternal,
} from './proposalVotingBreakdownExternal';

describe('<ProposalVotingBreakdownMultisig /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingBreakdownExternalProps>) => {
        const completeProps: IProposalVotingBreakdownExternalProps = {
            approvalsAmount: 0,
            minApprovals: 1,
            ...props,
        };

        return (
            <Tabs.Root defaultValue={ProposalVotingTab.BREAKDOWN}>
                <ProposalVotingBreakdownExternal {...completeProps} />
            </Tabs.Root>
        );
    };

    it('renders a breakdown tab', () => {
        render(createTestComponent());
        const tabPabel = screen.getByRole('tabpanel');
        expect(tabPabel).toBeInTheDocument();
        expect(tabPabel.id).toContain(ProposalVotingTab.BREAKDOWN);
    });

    it('throws error when minApprovals is set to 0', () => {
        testLogger.suppressErrors();
        const minApprovals = 0;
        expect(() => render(createTestComponent({ minApprovals }))).toThrow();
    });

    it('renders a progress based on the current approvals amount and the min approvals', () => {
        const approvalsAmount = 2;
        const minApprovals = 6;
        render(createTestComponent({ approvalsAmount, minApprovals }));

        const progressbar = screen.getByRole('progressbar');
        expect(progressbar).toBeInTheDocument();
        expect(progressbar.dataset.value).toEqual(((approvalsAmount / minApprovals) * 100).toString());
    });

    it('renders the correct labels', () => {
        const approvalsAmount = 1000;
        const minApprovals = 12345;
        render(createTestComponent({ approvalsAmount, minApprovals }));
        expect(screen.getByText('Minimum Approval')).toBeInTheDocument();
        expect(screen.getByText('1K')).toBeInTheDocument();
        expect(screen.getByText('of 12.35K members')).toBeInTheDocument();
    });

    it('renders success indicator on min approvals reached', () => {
        const approvalsAmount = 6;
        const minApprovals = 3;
        render(createTestComponent({ approvalsAmount, minApprovals }));
        expect(screen.getByTestId(IconType.CHECKMARK)).toBeInTheDocument();
    });

    it('renders failure indicator when min approvals is not reached', () => {
        const approvalsAmount = 2;
        const minApprovals = 3;
        render(createTestComponent({ approvalsAmount, minApprovals }));
        expect(screen.getByTestId(IconType.CLOSE)).toBeInTheDocument();
    });
});
