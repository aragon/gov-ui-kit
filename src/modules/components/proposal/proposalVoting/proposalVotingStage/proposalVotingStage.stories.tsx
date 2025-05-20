import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import type { DecoratorFunction } from 'storybook/internal/types';
import { Accordion } from '../../../../../core';
import { ProposalStatus } from '../../proposalUtils';
import { ProposalVoting } from '../index';

const ComponentWrapper: DecoratorFunction = (Story: ComponentType, context) => {
    const { isMultiStage } = context.args as { isMultiStage?: boolean };
    return (
        <Accordion.Container isMulti={isMultiStage ?? false}>
            <Story />
        </Accordion.Container>
    );
};

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
        startDate: '2024-07-17T08:34:22.719Z',
        endDate: '2024-07-20T08:34:22.719Z',
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
        startDate: '2024-07-17T08:34:22.719Z',
        endDate: '2024-07-20T08:34:22.719Z',
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
        startDate: '2025-05-16T10:00:00.000Z',
        minAdvance: '2025-05-16T11:00:00.000Z',
        maxAdvance: '2025-07-16T13:00:00.000Z',
        endDate: '2025-05-16T18:05:00.000Z',
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
        startDate: '2025-05-16T10:00:00.000Z',
        minAdvance: '2025-05-16T11:00:00.000Z',
        maxAdvance: '2025-12-16T13:00:00.000Z',
        endDate: '2025-05-16T18:05:00.000Z',
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
        startDate: '2025-05-16T10:00:00.000Z',
        minAdvance: '2025-12-16T14:00:00.000Z',
        maxAdvance: '2026-05-16T16:00:00.000Z',
        endDate: '2025-05-16T18:00:00.000Z',
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
        startDate: '2024-07-17T08:34:22.719Z',
        endDate: '2024-07-20T08:34:22.719Z',
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
        startDate: '2024-07-17T08:34:22.719Z',
        endDate: '2024-07-20T08:34:22.719Z',
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
        startDate: '2024-07-17T08:34:22.719Z',
        endDate: '2024-07-20T08:34:22.719Z',
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
        startDate: '2024-07-17T08:34:22.719Z',
        endDate: '2024-07-20T08:34:22.719Z',
        index: 0,
    },
};

export default meta;
