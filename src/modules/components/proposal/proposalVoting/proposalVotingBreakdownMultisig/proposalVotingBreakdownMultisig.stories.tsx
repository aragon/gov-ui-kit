import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../../../../../core';
import { ProposalVoting } from '../index';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

const meta: Meta<typeof ProposalVoting.BreakdownMultisig> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting.BreakdownMultisig',
    component: ProposalVoting.BreakdownMultisig,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16738-17734&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.BreakdownMultisig>;

/**
 * Default usage example of the ProposalVoting.BreakdownMultisig component.
 */
export const Default: Story = {
    args: {
        approvalsAmount: 2,
        minApprovals: 4,
    },
    render: (args) => {
        return (
            <Tabs.Root defaultValue={ProposalVotingTab.BREAKDOWN} className="w-full">
                <ProposalVoting.BreakdownMultisig {...args} />
            </Tabs.Root>
        );
    },
};

export default meta;
