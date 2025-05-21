import { render, screen } from '@testing-library/react';
import {
    type IProposalVotingStageStatusAdvanceableProps,
    ProposalVotingStageStatusAdvanceable,
} from './proposalVotingStageStatusAdvanceable';

describe('<ProposalVotingStageStatusAdvanceable /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingStageStatusAdvanceableProps>) => {
        const completeProps: IProposalVotingStageStatusAdvanceableProps = { ...props };

        return <ProposalVotingStageStatusAdvanceable {...completeProps} />;
    };

    it('correctly renders the advanceable state when there is < 90 days to advance', () => {
        const minAdvance = '2025-05-16T11:00:00.000Z';
        const maxAdvance = '2025-07-16T13:00:00.000Z';
        render(createTestComponent({ minAdvance, maxAdvance }));
        expect(screen.getByText('left to advance')).toBeInTheDocument();
        expect(screen.getByTestId('statePingAnimation')).toBeInTheDocument();
    });

    it('correctly renders the advanceable state when there is > 90 days to advance', () => {
        const minAdvance = '2025-05-16T11:00:00.000Z';
        const maxAdvance = '2025-12-16T13:00:00.000Z';
        render(createTestComponent({ minAdvance, maxAdvance }));
        expect(screen.getByText('Proposal')).toBeInTheDocument();
        expect(screen.getByText('is')).toBeInTheDocument();
        expect(screen.getByText('advanceable')).toBeInTheDocument();
        expect(screen.getByTestId('statePingAnimation')).toBeInTheDocument();
    });

    it('correctly renders the advanceable state when minAdvance is not reached', () => {
        const minAdvance = '2025-12-16T14:00:00.000Z';
        const maxAdvance = '2026-05-16T16:00:00.000Z';
        render(createTestComponent({ minAdvance, maxAdvance }));
        expect(screen.getByText('until advanceable')).toBeInTheDocument();
    });
});
