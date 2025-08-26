import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateTime } from 'luxon';
import { GukCoreProvider } from '../../../../core';
import type { IProposalActionSimulationStructureProps } from './proposalActionSimulationStructure';
import { ProposalActionSimulationStructure } from './proposalActionSimulationStructure';

describe('<ProposalActionSimulationStructure /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionSimulationStructureProps>) => {
        const completeProps: IProposalActionSimulationStructureProps = {
            totalActions: 3,
            status: 'success',
            ...props,
        };

        return (
            <GukCoreProvider>
                <ProposalActionSimulationStructure {...completeProps} />
            </GukCoreProvider>
        );
    };

    it('renders the total actions count', () => {
        render(createTestComponent({ totalActions: 5 }));
        expect(screen.getByText('5 actions')).toBeInTheDocument();
    });

    it('renders singular action text for one action', () => {
        render(createTestComponent({ totalActions: 1 }));
        expect(screen.getByText('1 action')).toBeInTheDocument();
    });

    it('renders "No simulation yet" when no last simulation is provided', () => {
        render(createTestComponent());
        expect(screen.getByText('No simulation yet')).toBeInTheDocument();
    });

    it('renders relative time for recent simulation', () => {
        const recentTime = DateTime.now().minus({ minutes: 30 });
        render(createTestComponent({ lastSimulation: recentTime }));
        expect(screen.getByText('Now')).toBeInTheDocument();
    });

    it('renders "Now" for very recent simulation', () => {
        const veryRecentTime = DateTime.now().minus({ minutes: 15 });
        render(createTestComponent({ lastSimulation: veryRecentTime }));
        expect(screen.getByText('Now')).toBeInTheDocument();
    });

    it('renders hours ago for simulation within a day', () => {
        const hoursAgo = DateTime.now().minus({ hours: 3 });
        render(createTestComponent({ lastSimulation: hoursAgo }));
        expect(screen.getByText('3 hours ago')).toBeInTheDocument();
    });

    it('renders days ago for simulation within a week', () => {
        const daysAgo = DateTime.now().minus({ days: 2 });
        render(createTestComponent({ lastSimulation: daysAgo }));
        expect(screen.getByText('2 days ago')).toBeInTheDocument();
    });

    it('renders the execution status label', () => {
        render(
            createTestComponent({
                status: 'success',
            }),
        );
        expect(screen.getByText('Likely to succeed')).toBeInTheDocument();
    });

    it('renders loading state when execution status is loading', () => {
        render(
            createTestComponent({
                status: 'unknown',
                isSimulating: true,
            }),
        );

        // Check that the loading text is shown
        expect(screen.getByText('Simulating...')).toBeInTheDocument();

        // The success icon should not be present during loading
        expect(screen.queryByTestId('SUCCESS')).not.toBeInTheDocument();
    });

    it('renders success icon when executable', () => {
        render(
            createTestComponent({
                status: 'success',
            }),
        );
        expect(screen.getByTestId('SUCCESS')).toBeInTheDocument();
    });

    it('renders critical icon when failed', () => {
        render(
            createTestComponent({
                status: 'failure',
            }),
        );
        expect(screen.getByTestId('CRITICAL')).toBeInTheDocument();
        expect(screen.getByText('Likely to fail')).toBeInTheDocument();
    });

    it('renders info icon when unknown', () => {
        render(
            createTestComponent({
                status: 'unknown',
            }),
        );
        expect(screen.getByTestId('INFO')).toBeInTheDocument();
        expect(screen.getByText('Not simulated')).toBeInTheDocument();
    });

    it('calls onSimulateAgain when simulate again button is clicked', async () => {
        const user = userEvent.setup();
        const onSimulateAgain = jest.fn();

        render(createTestComponent({ onSimulate: onSimulateAgain }));

        const simulateButton = screen.getByRole('button', { name: /simulate again/i });
        await user.click(simulateButton);

        expect(onSimulateAgain).toHaveBeenCalledTimes(1);
    });

    it('opens tenderly URL in new window when tenderlyUrl is provided', async () => {
        const user = userEvent.setup();
        const mockOpen = jest.fn();
        const originalOpen = window.open;
        window.open = mockOpen;

        const tenderlyUrl = 'https://dashboard.tenderly.co/simulation/12345';
        render(createTestComponent({ tenderlyUrl }));

        const tenderlyButton = screen.getByRole('button', { name: /view on tenderly/i });
        await user.click(tenderlyButton);

        expect(mockOpen).toHaveBeenCalledWith(tenderlyUrl, '_blank');

        window.open = originalOpen;
    });

    it('shows loading state on simulate again button when isSimulating is true', () => {
        render(createTestComponent({ isSimulating: true }));

        const simulateButton = screen.getByRole('button', { name: /simulate again/i });
        expect(simulateButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders all definition list items', () => {
        render(createTestComponent());

        expect(screen.getByText('Total actions')).toBeInTheDocument();
        expect(screen.getByText('Last simulation')).toBeInTheDocument();
        expect(screen.getByText('Executable')).toBeInTheDocument();
    });

    it('handles string ISO date input', () => {
        const isoDate = '2024-01-15T10:30:00Z';
        render(createTestComponent({ lastSimulation: isoDate }));

        // Should render some form of the date, not "No simulation yet"
        expect(screen.queryByText('No simulation yet')).not.toBeInTheDocument();
    });

    it('handles timestamp number input', () => {
        const timestamp = DateTime.now().minus({ hours: 1 }).toMillis();
        render(createTestComponent({ lastSimulation: timestamp }));

        expect(screen.getByText('1 hour ago')).toBeInTheDocument();
    });
});
