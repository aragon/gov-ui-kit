import type { Meta, StoryObj } from '@storybook/react';
import { ProposalVoting } from '../index';

const meta: Meta<typeof ProposalVoting.Container> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting.Container',
    component: ProposalVoting.Container,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16752-20193&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.Container>;

/**
 * Default usage example of the ProposalVoting.Container component.
 */
export const Default: Story = {};

export default meta;
