import type { Meta, StoryObj } from '@storybook/react';
import { VoteProposalDataListItem } from '..';

const meta: Meta<typeof VoteProposalDataListItem.Structure> = {
    title: 'Modules/Components/Vote/VoteProposalDataListItem/VoteProposalDataListItem.Structure',
    component: VoteProposalDataListItem.Structure,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=17239-29368',
        },
    },
};

type Story = StoryObj<typeof VoteProposalDataListItem.Structure>;

/**
 * Usage example of the VoteDataListItem component.
 */
export const Default: Story = {
    args: {
        proposalId: 'PIP-06',
        proposalTitle: 'Introduction of Layer 2 Scaling Solutions',
        voteIndicator: 'yes',
        date: 1613984914000,
    },
};

/**
 * Usage example of the VotesDataListItem module component with a custom label.
 */
export const CustomLabel: Story = {
    args: {
        proposalId: 'PIP-06',
        proposalTitle: 'Add Member to Council',
        voteIndicator: 'no',
        date: 1704961234000,
        confirmationLabel: 'Selected',
    },
};

/**
 * Usage example of the VotesDataListItem module component with a custom indicator description.
 */
export const VoteIndicatorDescription: Story = {
    args: {
        proposalId: 'PIP-06',
        proposalTitle: 'Add Member to Council',
        voteIndicator: 'no',
        voteIndicatorDescription: 'to approve',
        date: 1704961234000,
    },
};

/**
 * Usage example of the VotesDataListItem module component with a custom indicator description (veto mode).
 */
export const VoteIndicatorDescriptionVeto: Story = {
    args: {
        proposalId: 'PIP-06',
        proposalTitle: 'Add Member to Council',
        voteIndicator: 'yesVeto',
        voteIndicatorDescription: 'to veto',
        date: 1704961234000,
    },
};

/**
 * Usage of the VoteProposalDataListItem component with long proposal IDs.
 */
export const LongProposalId: Story = {
    args: {
        proposalId:
            '0x7617b0ed30e178ca91d1de3ae8ec7552b0626c693b7f3b6e29a3c7a8383e88fe-0xad3c46774dC00a16248766E1a83F2B1E04d15C4A-73144785007199445908234261408001196016186536834058203434500863241524295589949',
        proposalTitle: 'Funds Withdrawal',
        voteIndicator: 'approve',
        date: 1730807735000,
    },
};

export default meta;
