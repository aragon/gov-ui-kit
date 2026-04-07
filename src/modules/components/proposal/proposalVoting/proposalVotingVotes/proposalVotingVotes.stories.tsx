import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataList, Tabs } from '../../../../../core';
import { VoteDataListItem } from '../../../vote';
import { ProposalVoting, ProposalVotingTab } from '../index';

const meta: Meta<typeof ProposalVoting.Votes> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting.Votes',
    component: ProposalVoting.Votes,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16738-17849&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.Votes>;

/**
 * Default usage example of the ProposalVoting.Votes component.
 */
export const Default: Story = {
    render: (args) => (
        <Tabs.Root className="w-full" defaultValue={ProposalVotingTab.VOTES}>
            <ProposalVoting.Votes {...args}>
                <DataList.Root entityLabel="Votes" itemsCount={1}>
                    <DataList.Container>
                        <VoteDataListItem.Structure
                            voteIndicator="yes"
                            voter={{ address: '0xF6ad40D5D477ade0C640eaD49944bdD0AA1fBF05' }}
                        />
                    </DataList.Container>
                </DataList.Root>
            </ProposalVoting.Votes>
        </Tabs.Root>
    ),
};

export default meta;
