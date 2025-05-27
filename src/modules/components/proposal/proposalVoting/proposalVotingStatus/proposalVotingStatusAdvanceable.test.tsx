import { render, screen } from '@testing-library/react';
import {
    type IProposalVotingStatusAdvanceableProps,
    ProposalVotingStatusAdvanceable,
} from './proposalVotingStatusAdvanceable';

describe('<ProposalVotingStatusAdvanceable /> component', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-05-21T12:00:00Z'));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    const createTestComponent = (props?: Partial<IProposalVotingStatusAdvanceableProps>) => {
        const completeProps: IProposalVotingStatusAdvanceableProps = { ...props };

        return <ProposalVotingStatusAdvanceable {...completeProps} />;
    };

    it('correctly renders the advanceable state when there is < 90 days to advance', () => {
        const minAdvance = '2025-05-20T00:00:00Z';
        const maxAdvance = '2025-07-01T00:00:00Z';
        render(createTestComponent({ minAdvance, maxAdvance }));

        expect(screen.getByText('left to advance')).toBeInTheDocument();
        expect(screen.getByTestId('statePingAnimation')).toBeInTheDocument();
    });

    it('correctly renders the advanceable state when there is > 90 days to advance', () => {
        const minAdvance = '2025-05-20T00:00:00Z';
        const maxAdvance = '2025-12-01T00:00:00Z';
        render(createTestComponent({ minAdvance, maxAdvance }));

        expect(screen.getByText('Proposal')).toBeInTheDocument();
        expect(screen.getByText('is')).toBeInTheDocument();
        expect(screen.getByText('advanceable')).toBeInTheDocument();
        expect(screen.getByTestId('statePingAnimation')).toBeInTheDocument();
    });

    it('correctly renders the advanceable state when minAdvance is not reached', () => {
        const minAdvance = '2025-06-10T00:00:00Z';
        const maxAdvance = '2025-08-01T00:00:00Z';
        render(createTestComponent({ minAdvance, maxAdvance }));

        expect(screen.getByText('until advanceable')).toBeInTheDocument();
    });

    it('renders nothing if advance window has expired', () => {
        const minAdvance = '2024-01-01T00:00:00.000Z';
        const maxAdvance = '2024-01-15T00:00:00.000Z';
        const { container } = render(createTestComponent({ minAdvance, maxAdvance }));
        expect(container).toBeEmptyDOMElement();
    });

    it('throws error if minAdvance is not passed', () => {
        const minAdvance = undefined;
        const maxAdvance = '2024-01-15T00:00:00.000Z';
        expect(() => render(createTestComponent({ maxAdvance, minAdvance }))).toThrow();
    });
});
