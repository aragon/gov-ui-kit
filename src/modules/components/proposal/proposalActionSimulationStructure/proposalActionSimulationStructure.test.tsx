import { render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import { GukCoreProvider } from '../../../../core';
import type { IProposalActionSimulationStructureProps } from './proposalActionSimulationStructure';
import { ProposalActionSimulationStructure } from './proposalActionSimulationStructure';

describe('<ProposalActionSimulationStructure /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionSimulationStructureProps>) => {
        const completeProps: IProposalActionSimulationStructureProps = {
            totalActions: 3,
            ...props,
        };

        return (
            <GukCoreProvider>
                <ProposalActionSimulationStructure {...completeProps} />
            </GukCoreProvider>
        );
    };

    it('renders all definition list items', () => {
        render(createTestComponent());

        expect(screen.getByText('Total actions')).toBeInTheDocument();
        expect(screen.getByText('Last simulation')).toBeInTheDocument();
        expect(screen.getByText('Executable')).toBeInTheDocument();
    });

    it('renders the total actions count', () => {
        render(createTestComponent({ totalActions: 5 }));
        expect(screen.getByText('5 actions')).toBeInTheDocument();
    });

    it('renders singular action text for one action', () => {
        render(createTestComponent({ totalActions: 1 }));
        expect(screen.getByText('1 action')).toBeInTheDocument();
    });

    it('renders "Never" when no last simulation is provided', () => {
        render(createTestComponent());
        expect(screen.getByText('Never')).toBeInTheDocument();
    });

    it('renders relative time for recent simulation', () => {
        const recentTime = DateTime.now().minus({ days: 2 });
        render(createTestComponent({ 
            lastSimulation: {
                timestamp: recentTime.toMillis(),
                url: 'https://dashboard.tenderly.co/simulation/12345',
                status: 'success'
            }
        }));
        expect(screen.getByText('2 days ago')).toBeInTheDocument();
    });

    it('renders "Now" for very recent simulation', () => {
        const veryRecentTime = DateTime.now().minus({ seconds: 30 });
        render(createTestComponent({ 
            lastSimulation: {
                timestamp: veryRecentTime.toMillis(),
                url: 'https://dashboard.tenderly.co/simulation/12345',
                status: 'success'
            }
        }));
        expect(screen.getByText('Now')).toBeInTheDocument();
    });

    it('renders the execution status label', () => {
        render(
            createTestComponent({
                lastSimulation: {
                    timestamp: DateTime.now().toMillis(),
                    url: 'https://dashboard.tenderly.co/simulation/12345',
                    status: 'success'
                }
            }),
        );
        expect(screen.getByText('Likely to succeed')).toBeInTheDocument();
    });

    it('renders failure status label', () => {
        render(
            createTestComponent({
                lastSimulation: {
                    timestamp: DateTime.now().toMillis(),
                    url: 'https://dashboard.tenderly.co/simulation/12345',
                    status: 'failure'
                }
            }),
        );
        expect(screen.getByText('Likely to fail')).toBeInTheDocument();
    });

    it('renders unknown status when no lastSimulation is provided', () => {
        render(createTestComponent());
        expect(screen.getByText('Unknown')).toBeInTheDocument();
    });

    it('renders loading state when execution status is loading', () => {
        render(
            createTestComponent({
                isSimulating: true,
            }),
        );

        expect(screen.getAllByText('Simulating')).toHaveLength(3);
    });

    it('shows simulate button by default when isSimulatable is not specified', () => {
        render(createTestComponent());

        expect(screen.getByText(/simulate/i)).toBeInTheDocument();
    });

    it('hides simulate button when isSimulatable is false', () => {
        render(createTestComponent({ isSimulatable: false }));

        expect(screen.queryByText(/simulate/i)).toBeNull();
    });
});
