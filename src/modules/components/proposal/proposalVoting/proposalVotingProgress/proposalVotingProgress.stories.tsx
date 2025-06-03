import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ProposalVotingProgress } from '../index';

const meta: Meta<typeof ProposalVotingProgress.Item> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVotingProgress',
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
 * Usage example showing token voting progress.
 */
export const TokenVotingProgress: Story = {
    args: {
        name: 'Support',
        description: { value: '75', text: 'of 100 ETH' },
        value: 75,
        thresholdIndicator: 50,
        showPercentage: true,
        showStatus: true,
    },
    render: (args) => (
        <ProposalVotingProgress.Container className="min-w-96">
            <ProposalVotingProgress.Item {...args} />
        </ProposalVotingProgress.Container>
    ),
};

/**
 * Usage example showing multisig approval progress.
 */
export const MultisigApprovalProgress: Story = {
    args: {
        name: 'Minimum Approval',
        description: { value: '2', text: 'of 5 members' },
        value: 40,
        thresholdIndicator: 50,
        showPercentage: false,
        showStatus: true,
    },
    render: (args) => (
        <ProposalVotingProgress.Container className="min-w-96">
            <ProposalVotingProgress.Item {...args} />
        </ProposalVotingProgress.Container>
    ),
};

export default meta;
