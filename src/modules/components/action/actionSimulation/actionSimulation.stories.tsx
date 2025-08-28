import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateTime } from 'luxon';
import { ActionSimulation } from './actionSimulation';

const meta: Meta<typeof ActionSimulation> = {
    title: 'Modules/Components/Action/ActionSimulation',
    component: ActionSimulation,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=30069-34747&t=tQiF5klPD9cjUit6-4',
        },
    },
    args: {
        className: 'flex-1',
    },
};

type Story = StoryObj<typeof ActionSimulation>;

/**
 * Completed simulation with positive outcome
 */
export const Success: Story = {
    args: {
        totalActions: 3,
        lastSimulation: {
            timestamp: DateTime.now().minus({ seconds: 10 }).toMillis(),
            url: 'https://dashboard.tenderly.co/simulation/12345',
            status: 'success',
        },
    },
};

/**
 * Completed simulation with negative outcome (can't be executed)
 */
export const Failure: Story = {
    args: {
        totalActions: 2,
        lastSimulation: {
            timestamp: DateTime.now().minus({ seconds: 10 }).toMillis(),
            url: 'https://dashboard.tenderly.co/simulation/12345',
            status: 'failure',
        },
    },
};

/**
 * Loading state while simulation is running
 */
export const Loading: Story = {
    args: {
        totalActions: 5,
        isLoading: true,
    },
};

/**
 * No simulation has been run yet
 */
export const NoPreviousSimulation: Story = {
    args: {
        totalActions: 1,
    },
};

/**
 * With error message displayed
 */
export const WithErrorMessage: Story = {
    args: {
        totalActions: 2,
        lastSimulation: {
            timestamp: DateTime.now().minus({ weeks: 2 }).toMillis(),
            url: 'https://dashboard.tenderly.co/simulation/12345',
            status: 'success',
        },
        error: 'Simulation failed to run. Please try again.',
    },
};

/**
 * Not simulatable - only shows Tenderly link
 */
export const NotSimulatable: Story = {
    args: {
        totalActions: 3,
        lastSimulation: {
            timestamp: DateTime.now().minus({ hours: 2 }).toMillis(),
            url: 'https://dashboard.tenderly.co/simulation/12345',
            status: 'success',
        },
        isEnabled: false,
    },
};

export default meta;
