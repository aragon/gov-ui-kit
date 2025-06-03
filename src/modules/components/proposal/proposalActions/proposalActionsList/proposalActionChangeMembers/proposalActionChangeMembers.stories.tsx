import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ProposalActionType } from '../../proposalActionsDefinitions';
import { ProposalActionChangeMembers } from './proposalActionChangeMembers';
import { generateProposalActionChangeMembers } from './proposalActionChangeMembers.testUtils';

const meta: Meta<typeof ProposalActionChangeMembers> = {
    title: 'Modules/Components/Proposal/ProposalActions/Actions/ChangeMembers',
    component: ProposalActionChangeMembers,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=17330-35891&t=tQiF5klPD9cjUit6-4',
        },
    },
};

type Story = StoryObj<typeof ProposalActionChangeMembers>;

/**
 * Usage example of the ProposalActions module component with mocked ChangeMembers action.
 */
export const Default: Story = {
    args: {
        action: generateProposalActionChangeMembers({
            members: [
                { address: '0xceB69F6342eCE283b2F5c9088Ff249B5d0Ae66ea', name: 'Coinbase Prime' },
                { address: '0x97fb9274ac39bB275AC76f56390e6713A2C417D9' },
            ],
        }),
    },
};

export const RemoveMembers: Story = {
    args: {
        action: generateProposalActionChangeMembers({
            type: ProposalActionType.REMOVE_MEMBERS,
            members: [
                { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', name: 'ensname.eth' },
                { address: '0x8C8D7C46219D9205f056f28fee5950aD564d7465' },
            ],
        }),
    },
};

export default meta;
