import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../../../../../core';
import { ProposalVoting } from '../index';
import { ProposalVotingContextProvider } from '../proposalVotingContext';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

const meta: Meta<typeof ProposalVoting.Details> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting.Details',
    component: ProposalVoting.Details,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16738-17822&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.Details>;

/**
 * Default usage example of the ProposalVoting.Details component.
 */
export const Default: Story = {
    args: {
        settings: [
            { term: 'Plugin', definition: '0xC94e...15', copyValue: '0xC94eBB328aC25b95DB0E0AA968371885Fa516215' },
            { term: 'Strategy', definition: '1 Address → 1 Vote' },
            { term: 'Voting options', definition: 'Approve' },
            { term: 'Minimum approval', definition: '3 of 5' },
        ],
    },
    render: (args) => {
        return (
            <ProposalVotingContextProvider>
                <Tabs.Root defaultValue={ProposalVotingTab.DETAILS} className="w-full">
                    <ProposalVoting.Details {...args} />
                </Tabs.Root>
            </ProposalVotingContextProvider>
        );
    },
};

export default meta;
