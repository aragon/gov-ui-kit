import { render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import { GukCoreProvider } from '../../../../core';
import { modulesCopy } from '../../../assets';
import { ActionSimulation } from './actionSimulation';
import type { IActionSimulationProps } from './actionSimulation.api';

const { actionSimulation: actionSimulationCopy } = modulesCopy;

describe('<ActionSimulation /> component', () => {
    const createTestComponent = (props?: Partial<IActionSimulationProps>) => {
        const completeProps: IActionSimulationProps = {
            totalActions: 3,
            ...props,
        };

        return (
            <GukCoreProvider>
                <ActionSimulation {...completeProps} />
            </GukCoreProvider>
        );
    };

    it('renders all definition list items', () => {
        render(createTestComponent());

        expect(screen.getByText(actionSimulationCopy.totalActionsTerm)).toBeInTheDocument();
        expect(screen.getByText(actionSimulationCopy.lastSimulationTerm)).toBeInTheDocument();
        expect(screen.getByText(actionSimulationCopy.executableTerm)).toBeInTheDocument();
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
        expect(screen.getByText(actionSimulationCopy.never)).toBeInTheDocument();
    });

    it('renders the execution status label', () => {
        render(
            createTestComponent({
                lastSimulation: {
                    timestamp: DateTime.now().toMillis(),
                    url: 'https://dashboard.tenderly.co/simulation/12345',
                    status: 'success',
                },
            }),
        );
        expect(screen.getByText(actionSimulationCopy.likelyToSucceed)).toBeInTheDocument();
    });

    it('renders failure status label', () => {
        render(
            createTestComponent({
                lastSimulation: {
                    timestamp: DateTime.now().toMillis(),
                    url: 'https://dashboard.tenderly.co/simulation/12345',
                    status: 'failed',
                },
            }),
        );
        expect(screen.getByText(actionSimulationCopy.likelyToFail)).toBeInTheDocument();
    });

    it('renders unknown status when no lastSimulation is provided', () => {
        render(createTestComponent());
        expect(screen.getByText(actionSimulationCopy.unknown)).toBeInTheDocument();
    });

    it('renders loading state when execution status is loading', () => {
        render(
            createTestComponent({
                isLoading: true,
            }),
        );

        expect(screen.getAllByText(actionSimulationCopy.simulating)).toHaveLength(3);
    });

    it('shows simulate button by default when isSimulatable is not specified', () => {
        render(createTestComponent());

        expect(screen.getByText(actionSimulationCopy.simulate)).toBeInTheDocument();
    });

    it('hides simulate button when isSimulatable is false', () => {
        render(createTestComponent({ isEnabled: false }));

        expect(screen.queryByText(actionSimulationCopy.simulate)).toBeNull();
    });
});
