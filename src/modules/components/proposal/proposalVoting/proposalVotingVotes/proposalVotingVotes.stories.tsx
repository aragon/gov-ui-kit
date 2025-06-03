import type { Meta, StoryObj } from '@storybook/react-webpack5';
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
        <Tabs.Root defaultValue={ProposalVotingTab.VOTES} className="w-full">
            <ProposalVoting.Votes {...args}>
                <DataList.Root itemsCount={1} entityLabel="Votes">
                    <DataList.Container>
                        <VoteDataListItem.Structure
                            voter={{ address: '0xF6ad40D5D477ade0C640eaD49944bdD0AA1fBF05' }}
                            voteIndicator="yes"
                        />
                    </DataList.Container>
                </DataList.Root>
            </ProposalVoting.Votes>
        </Tabs.Root>
    ),
};

export default meta;
