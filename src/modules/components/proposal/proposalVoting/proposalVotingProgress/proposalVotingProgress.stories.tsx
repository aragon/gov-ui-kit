import type { Meta, StoryObj } from '@storybook/react';
import { ProposalVotingProgress } from '../index';

const meta: Meta<typeof ProposalVotingProgress.Item> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVotingProgress.Item',
    component: ProposalVotingProgress.Item,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16752-18392&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVotingProgress.Item>;

/**
 * Default usage example of the ProposalVotingProgressItem component.
 */
export const TokenVotingSupport: Story = {
    args: {
        name: 'Support',
        description: {
            value: '75',
            text: 'of 100 ETH',
        },
        value: 75,
        thresholdIndicator: 50,
        variant: 'primary',
        showPercentage: true,
        showStatusIcon: true,
    },
};

/**
 * Default usage example of the ProposalVotingProgressItem component.
 */
export const MultisigApproval: Story = {
    args: {
        name: 'Minimum Approval',
        description: {
            value: '2',
            text: 'of 5 members',
        },
        value: 40,
        variant: 'neutral',
        showStatusIcon: true,
    },
};

export default meta;
