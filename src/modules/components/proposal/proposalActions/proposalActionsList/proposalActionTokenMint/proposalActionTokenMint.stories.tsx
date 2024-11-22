import type { Meta, StoryObj } from '@storybook/react';
import { ProposalActionTokenMint } from './proposalActionTokenMint';
import { generateProposalActionTokenMint } from './proposalActionTokenMint.testUtils';

const meta: Meta<typeof ProposalActionTokenMint> = {
    title: 'Modules/Components/Proposal/ProposalActions/Actions/TokenMint',
    component: ProposalActionTokenMint,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=17330-115946&t=tQiF5klPD9cjUit6-4',
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
            tokenSymbol: 'GTT',
            receiver: {
                currentBalance: '0',
                newBalance: '500000000',
                address: '0x32c2FE388ABbB3e678D44DF6a0471086D705316a',
            },
        }),
    },
};

export default meta;
