import type { Meta, StoryObj } from '@storybook/react';
import { generateProposalActionTokenMint } from '../generators';
import { ProposalActionTokenMint } from './proposalActionTokenMint';

const meta: Meta<typeof ProposalActionTokenMint> = {
    title: 'Modules/Components/Proposal/ProposalActions/Actions/TokenMint',
    component: ProposalActionTokenMint,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActionTokenMint>;

/**
 * Usage example of the ProposalActions module component with mocked TokenMint actions.
 */
export const Default: Story = {
    args: {
        action: generateProposalActionTokenMint({
            receiver: {
                currentBalance: '0',
                newBalance: '5',
                address: '0x32c2FE388ABbB3e678D44DF6a0471086D705316a',
            },
        }),
    },
};

export default meta;
