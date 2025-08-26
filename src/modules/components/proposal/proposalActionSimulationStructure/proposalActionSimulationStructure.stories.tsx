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
        onSimulateAgain: () => {
            // Mock action
        },
        onViewOnTenderly: () => {
            // Mock action
        },
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
        executionStatus: {
            label: 'Likely to succeed',
            isExecutable: true,
        },
    },
};

/**
 * Loading state while simulation is running
 */
export const Loading: Story = {
    args: {
        totalActions: 5,
        lastSimulation: DateTime.now().minus({ days: 1 }),
        executionStatus: {
            label: 'Simulating...',
            isLoading: true,
        },
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
        executionStatus: {
            label: 'Likely to fail',
            isExecutable: false,
        },
    },
};

/**
 * No simulation has been run yet
 */
export const NoSimulation: Story = {
    args: {
        totalActions: 1,
        executionStatus: {
            label: 'Not simulated',
            isExecutable: false,
        },
    },
};

/**
 * With Tenderly URL for external link
 */
export const WithTenderlyUrl: Story = {
    args: {
        totalActions: 4,
        lastSimulation: DateTime.now().minus({ minutes: 30 }),
        executionStatus: {
            label: 'Likely to succeed',
            isExecutable: true,
        },
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
        executionStatus: {
            label: 'Likely to succeed',
            isExecutable: true,
        },
    },
};

/**
 * Old simulation (shows formatted date)
 */
export const OldSimulation: Story = {
    args: {
        totalActions: 2,
        lastSimulation: DateTime.now().minus({ weeks: 2 }),
        executionStatus: {
            label: 'Likely to succeed',
            isExecutable: true,
        },
    },
};

export default meta;
