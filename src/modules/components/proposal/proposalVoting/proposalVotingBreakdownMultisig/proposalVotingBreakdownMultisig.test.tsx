import { render, screen } from '@testing-library/react';
import { IconType, Tabs } from '../../../../../core';
import { testLogger } from '../../../../../core/test';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import {
    type IProposalVotingBreakdownMultisigProps,
    ProposalVotingBreakdownMultisig,
} from './proposalVotingBreakdownMultisig';

describe('<ProposalVotingBreakdownMultisig /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingBreakdownMultisigProps>) => {
        const completeProps: IProposalVotingBreakdownMultisigProps = {
            approvalsAmount: 0,
            minApprovals: 1,
            membersCount: 2,
            ...props,
        };

        return (
            <Tabs.Root defaultValue={ProposalVotingTab.BREAKDOWN}>
                <ProposalVotingBreakdownMultisig {...completeProps} />
            </Tabs.Root>
        );
    };

    it('renders a breakdown tab', () => {
        render(createTestComponent());
        const tabPabel = screen.getByRole('tabpanel');
        expect(tabPabel).toBeInTheDocument();
        expect(tabPabel.id).toContain(ProposalVotingTab.BREAKDOWN);
    });

    it('throws error when membersCount is set to 0', () => {
        testLogger.suppressErrors();
        const membersCount = 0;
        expect(() => render(createTestComponent({ membersCount }))).toThrow();
    });

    it('renders a progress based on the current approvals amount and the members count', () => {
        const approvalsAmount = 2;
        const membersCount = 6;
        render(createTestComponent({ approvalsAmount, membersCount }));

        const progressbar = screen.getByRole('progressbar');
        expect(progressbar).toBeInTheDocument();
        expect(progressbar.dataset.value).toEqual(((approvalsAmount / membersCount) * 100).toString());
    });

    it('renders the correct labels', () => {
        const approvalsAmount = 1000;
        const membersCount = 12345;
        render(createTestComponent({ approvalsAmount, membersCount }));
        expect(screen.getByText('Approval')).toBeInTheDocument();
        expect(screen.getByText('1K')).toBeInTheDocument();
        expect(screen.getByText('of 12.35K members')).toBeInTheDocument();
    });

    it('renders Veto label when isVeto is true', () => {
        const approvalsAmount = 2;
        const membersCount = 6;
        render(createTestComponent({ approvalsAmount, membersCount, isVeto: true }));
        expect(screen.getByText('Veto')).toBeInTheDocument();
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
