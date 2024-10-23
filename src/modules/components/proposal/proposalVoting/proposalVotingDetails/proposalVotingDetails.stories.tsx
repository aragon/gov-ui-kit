import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import { Tabs } from '../../../../../core';
import { ProposalVoting } from '../index';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { ProposalVotingStageContextProvider } from '../proposalVotingStageContext';

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
            { term: 'Strategy', definition: '1 Address → 1 Vote' },
            { term: 'Voting options', definition: 'Approve' },
            { term: 'Minimum approval', definition: '3 of 5' },
        ],
    },
    render: (args) => {
        return (
            <ProposalVotingStageContextProvider
                value={{
                    startDate: DateTime.now().plus({ days: 4 }).toMillis(),
                    endDate: DateTime.now().plus({ days: 7 }).toMillis(),
                }}
            >
                <Tabs.Root defaultValue={ProposalVotingTab.DETAILS} className="w-full">
                    <ProposalVoting.Details {...args} />
                </Tabs.Root>
            </ProposalVotingStageContextProvider>
        );
    },
};

export default meta;
