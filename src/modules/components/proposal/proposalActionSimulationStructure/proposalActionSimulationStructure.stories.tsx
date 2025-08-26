import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateTime } from 'luxon';
import { ProposalActionSimulationStructure } from './proposalActionSimulationStructure';

const meta: Meta<typeof ProposalActionSimulationStructure> = {
    title: 'Modules/Components/Proposal/ProposalActionSimulationStructure',
    component: ProposalActionSimulationStructure,
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

type Story = StoryObj<typeof ProposalActionSimulationStructure>;

/**
 * Success state showing a completed simulation with executable actions
 */
export const Success: Story = {
    args: {
        totalActions: 3,
        lastSimulation: DateTime.now().minus({ hours: 2 }),
        status: 'success',
    },
};

/**
 * Loading state while simulation is running
 */
export const Loading: Story = {
    args: {
        totalActions: 5,
        lastSimulation: DateTime.now().minus({ days: 1 }),
        status: 'unknown',
        isSimulating: true,
    },
};

/**
 * Failed simulation with non-executable actions
 */
export const Failed: Story = {
    args: {
        totalActions: 2,
        lastSimulation: DateTime.now().minus({ hours: 6 }),
        status: 'failure',
    },
};

/**
 * No simulation has been run yet
 */
export const NoSimulation: Story = {
    args: {
        totalActions: 1,
        status: 'unknown',
    },
};

/**
 * With error message displayed
 */
export const WithErrorMessage: Story = {
    args: {
        totalActions: 2,
        lastSimulation: DateTime.now(),
        status: 'unknown',
        error: 'Simulation failed due to network error. Please try again.',
    },
};

/**
 * With Tenderly URL for external link
 */
export const WithTenderlyUrl: Story = {
    args: {
        totalActions: 4,
        lastSimulation: DateTime.now().minus({ minutes: 30 }),
        status: 'success',
        tenderlyUrl: 'https://dashboard.tenderly.co/simulation/12345',
    },
};

/**
 * Recent simulation (shows "Now")
 */
export const RecentSimulation: Story = {
    args: {
        totalActions: 7,
        lastSimulation: DateTime.now().minus({ minutes: 5 }),
        status: 'success',
    },
};

/**
 * Old simulation (shows formatted date)
 */
export const OldSimulation: Story = {
    args: {
        totalActions: 2,
        lastSimulation: DateTime.now().minus({ weeks: 2 }),
        status: 'success',
    },
};

/**
 * Not simulatable - only shows Tenderly link
 */
export const NotSimulatable: Story = {
    args: {
        totalActions: 3,
        lastSimulation: DateTime.now().minus({ hours: 2 }),
        status: 'success',
        isSimulatable: false,
        tenderlyUrl: 'https://dashboard.tenderly.co/simulation/12345',
    },
};

/**
 * Not simulatable without previous simulation
 */
export const NotSimulatableNoSimulation: Story = {
    args: {
        totalActions: 1,
        status: 'unknown',
        isSimulatable: false,
        tenderlyUrl: 'https://dashboard.tenderly.co/simulation/12345',
    },
};

export default meta;
