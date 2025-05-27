import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import type { DecoratorFunction } from 'storybook/internal/types';
import { Accordion } from '../../../../../core';
import { ProposalStatus } from '../../proposalUtils';
import { ProposalVoting } from '../index';

const ComponentWrapper: DecoratorFunction = (Story, context) => {
    const { isMultiStage } = context.args as { isMultiStage?: boolean };
    return (
        <Accordion.Container isMulti={isMultiStage ?? false}>
            <Story />
        </Accordion.Container>
    );
};

const now = DateTime.now();
const twoDaysAgo = now.minus({ days: 2 }).toISO();
const oneMonthAhead = now.plus({ months: 1 }).toISO();
const sixMonthsAhead = now.plus({ months: 6 }).toISO();
const fiveYearsAhead = now.plus({ years: 5 }).toISO();

const meta: Meta<typeof ProposalVoting.Stage> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting.Stage',
    component: ProposalVoting.Stage,
    decorators: ComponentWrapper,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16738-17822&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.Stage>;

/**
 * Default usage example of the ProposalVoting.Stage component.
 */
export const Default: Story = {
    args: {
        name: 'Community voting',
        isMultiStage: true,
        status: ProposalStatus.ACCEPTED,
        index: 0,
    },
};

/**
 * Usage example of the ProposalVoting.Stage component that is pending.
 */
export const Pending: Story = {
    args: {
        name: 'Community voting',
        status: ProposalStatus.PENDING,
        index: 0,
    },
};

/**
 * Usage example of the ProposalVoting.Stage component that is active.
 */
export const Active: Story = {
    args: {
        name: 'Community voting',
        status: ProposalStatus.ACTIVE,
        startDate: '2024-07-17T08:34:22.719Z',
        endDate: '2024-07-20T08:34:22.719Z',
        index: 0,
    },
};

/**
 * Usage example of the ProposalVoting.Stage component that can advance now with a < 90day window.
 */
export const AdvanceableShort: Story = {
    args: {
        name: 'Community voting',
        status: ProposalStatus.ADVANCEABLE,
        minAdvance: twoDaysAgo,
        maxAdvance: oneMonthAhead,
        index: 0,
    },
};

/**
 * Usage example of the ProposalVoting.Stage component that can advance now with a long window.
 */
export const AdvanceableLong: Story = {
    args: {
        name: 'Community voting',
        status: ProposalStatus.ADVANCEABLE,
        minAdvance: twoDaysAgo,
        maxAdvance: sixMonthsAhead,
        index: 0,
    },
};

/**
 * Usage example of the ProposalVoting.Stage component that can advance in the future.
 */
export const AdvanceableInFuture: Story = {
    args: {
        name: 'Community voting',
        status: ProposalStatus.ADVANCEABLE,
        minAdvance: sixMonthsAhead,
        maxAdvance: fiveYearsAhead,
        index: 0,
    },
};

/**
 * Usage example of the ProposalVoting.Stage component that has expired.
 */
export const Expired: Story = {
    args: {
        name: 'Community voting',
        status: ProposalStatus.EXPIRED,
        index: 0,
    },
};

/**
 * Usage example of the ProposalVoting.Stage component that has been rejected.
 */
export const Rejected: Story = {
    args: {
        name: 'Community voting',
        status: ProposalStatus.REJECTED,
        index: 0,
    },
};

/**
 * Usage example of the ProposalVoting.Stage component that has been vetoed.
 */
export const Vetoed: Story = {
    args: {
        name: 'Community voting',
        status: ProposalStatus.VETOED,
        index: 0,
    },
};

/**
 * Usage example of the ProposalVoting.Stage component that has been unreached.
 */
export const Unreached: Story = {
    args: {
        name: 'Community voting',
        status: ProposalStatus.UNREACHED,
        index: 0,
    },
};

/**
 * Usage example of the ProposalVoting.Stage component that has been executed.
 */
export const Executed: Story = {
    args: {
        name: 'Community voting',
        status: ProposalStatus.EXECUTED,
        index: 0,
    },
};

/**
 * Usage example of the ProposalVoting.Stage component that is executable.
 */
export const Executable: Story = {
    args: {
        name: 'Community voting',
        status: ProposalStatus.EXECUTABLE,
        index: 0,
    },
};

export default meta;
