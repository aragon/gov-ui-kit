import type { Meta, StoryObj } from '@storybook/react';
import { ProposalActionWithdrawToken } from './proposalActionWithdrawToken';
import { generateProposalActionWithdrawToken } from './proposalActionWithdrawToken.testUtils';

const meta: Meta<typeof ProposalActionWithdrawToken> = {
    title: 'Modules/Components/Proposal/ProposalActions/Actions/WithdrawToken',
    component: ProposalActionWithdrawToken,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActionWithdrawToken>;

/**
 * Usage example of the ProposalActions module component with mocked TokenWithdraw actions.
 */
export const Default: Story = {
    args: {
        action: generateProposalActionWithdrawToken(),
    },
};

export default meta;
