import { render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import { ProposalStatus } from '../../proposalUtils';
import { type IProposalVotingStageStatusProps, ProposalVotingStageStatus } from './proposalVotingStageStatus';

describe('<ProposalVotingStageStatus /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingStageStatusProps>) => {
        const completeProps: IProposalVotingStageStatusProps = {
            endDate: 0,
            ...props,
        };

        return <ProposalVotingStageStatus {...completeProps} />;
    };

    it('correctly renders the pending state for single-stage proposals', () => {
        const status = ProposalStatus.PENDING;
        const isMultiStage = false;
        render(createTestComponent({ status, isMultiStage }));
        expect(screen.getByText('Proposal')).toBeInTheDocument();
        expect(screen.getByText('is pending')).toBeInTheDocument();
    });

    it('correctly renders the pending state for multi-stage proposals', () => {
        const status = ProposalStatus.PENDING;
        const isMultiStage = true;
        render(createTestComponent({ status, isMultiStage }));
        expect(screen.getByText('Stage')).toBeInTheDocument();
        expect(screen.getByText('is pending')).toBeInTheDocument();
    });

    it('correctly renders the active state with remaining time to vote', () => {
        const status = ProposalStatus.ACTIVE;
        const endDate = DateTime.now().plus({ hours: 3, second: 20 }).toMillis();
        render(createTestComponent({ status, endDate }));
        expect(screen.getByText('3 hours')).toBeInTheDocument();
        expect(screen.getByText('left to vote')).toBeInTheDocument();
        expect(screen.getByTestId('statePingAnimation')).toBeInTheDocument();
    });

    it('handles undefined end date when state is active', () => {
        const status = ProposalStatus.ACTIVE;
        const endDate = undefined;
        render(createTestComponent({ status, endDate }));
        expect(screen.getByText('-')).toBeInTheDocument();
        expect(screen.getByText('left to vote')).toBeInTheDocument();
        expect(screen.getByTestId('statePingAnimation')).toBeInTheDocument();
    });

    it('correctly renders the accepted state', () => {
        const status = ProposalStatus.ACCEPTED;
        render(createTestComponent({ status }));
        expect(screen.getByText('Proposal')).toBeInTheDocument();
        expect(screen.getByText('has been')).toBeInTheDocument();
        expect(screen.getByText('accepted')).toBeInTheDocument();
    });

    it('correctly renders the rejected state', () => {
        const status = ProposalStatus.REJECTED;
        render(createTestComponent({ status }));
        expect(screen.getByText('Proposal')).toBeInTheDocument();
        expect(screen.getByText('has been')).toBeInTheDocument();
        expect(screen.getByText('rejected')).toBeInTheDocument();
    });

    it('correctly renders the vetoed state', () => {
        const status = ProposalStatus.VETOED;
        render(createTestComponent({ status }));
        expect(screen.getByText('Proposal')).toBeInTheDocument();
        expect(screen.getByText('has been')).toBeInTheDocument();
        expect(screen.getByText('vetoed')).toBeInTheDocument();
    });

    it('correctly renders the expired state', () => {
        const status = ProposalStatus.EXPIRED;
        render(createTestComponent({ status }));
        expect(screen.getByText('Proposal')).toBeInTheDocument();
        expect(screen.getByText('has')).toBeInTheDocument();
        expect(screen.getByText('expired')).toBeInTheDocument();
    });

    it('correctly renders the unreached state', () => {
        const status = ProposalStatus.UNREACHED;
        render(createTestComponent({ status }));
        expect(screen.getByText('Stage')).toBeInTheDocument();
        expect(screen.getByText('not reached')).toBeInTheDocument();
    });

    it('defaults to pending state when status property is not defined', () => {
        const status = undefined;
        render(createTestComponent({ status }));
        expect(screen.getByText('is pending')).toBeInTheDocument();
    });
});
