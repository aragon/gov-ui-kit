import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../../../../../core';
import { ProposalVotingStatus } from '../../proposalUtils';
import { ProposalVoting } from '../index';

const meta: Meta<typeof ProposalVoting.Stage> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting.Stage',
    component: ProposalVoting.Stage,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16738-17822&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.Stage>;

/**
 * Default usage example of the ProposalVoting.Stage component.
 */
export const Default: Story = {
    args: {
        name: 'Community voting',
        status: ProposalVotingStatus.ACCEPTED,
        startDate: '2024-07-17T08:34:22.719Z',
        endDate: '2024-07-20T08:34:22.719Z',
        index: 0,
    },
    render: (args) => {
        return (
            <Accordion.Container isMulti={false}>
                <ProposalVoting.Stage {...args} />
            </Accordion.Container>
        );
    },
};

export default meta;
