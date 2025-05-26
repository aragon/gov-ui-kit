import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../../../../../core';
import { ProposalVoting } from '../index';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

const meta: Meta<typeof ProposalVoting.BreakdownToken> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting.BreakdownToken',
    component: ProposalVoting.BreakdownToken,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16752-18392&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.BreakdownToken>;

/**
 * Default usage example of the ProposalVoting.BreakdownToken component.
 */
export const Default: Story = {
    args: {
        totalYes: '9864531',
        totalNo: '4539651',
        totalAbstain: '4531',
        supportThreshold: 50,
        minParticipation: 15,
        tokenSymbol: 'ARA',
        tokenTotalSupply: '45132986',
        isVeto: false,
    },
    render: (args) => {
        return (
            <Tabs.Root defaultValue={ProposalVotingTab.BREAKDOWN} className="w-full">
                <ProposalVoting.BreakdownToken {...args} />
            </Tabs.Root>
        );
    },
};

export default meta;
