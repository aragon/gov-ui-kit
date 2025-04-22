import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../../../../../core';
import { ProposalVotingStatus } from '../../proposalUtils';
import { ProposalVoting } from '../index';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

const meta: Meta<typeof ProposalVoting.BreakdownExternal> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting.BreakdownExternal',
    component: ProposalVoting.BreakdownExternal,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=26269-47411&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.BreakdownExternal>;

/**
 * Default usage example of the ProposalVoting.BreakdownExternal component.
 */
export const Default: Story = {
    args: {
        status: ProposalVotingStatus.ACCEPTED,
        isOptimistic: false,
    },
    render: (args) => {
        return (
            <Tabs.Root defaultValue={ProposalVotingTab.BREAKDOWN} className="w-full">
                <ProposalVoting.BreakdownExternal {...args} />
            </Tabs.Root>
        );
    },
};

export default meta;
