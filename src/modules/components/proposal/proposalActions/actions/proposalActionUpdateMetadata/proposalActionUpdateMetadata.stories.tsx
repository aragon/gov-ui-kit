import type { Meta, StoryObj } from '@storybook/react';
import { generateProposalActionUpdateMetadata } from '../generators';
import { ProposalActionUpdateMetadata } from './proposalActionUpdateMetadata';

const meta: Meta<typeof ProposalActionUpdateMetadata> = {
    title: 'Modules/Components/Proposal/ProposalActions/Actions/UpdateMetadata',
    component: ProposalActionUpdateMetadata,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActionUpdateMetadata>;

/**
 * Usage example of the ProposalActions module component with mocked UpdateMetadata actions.
 */
export const Default: Story = {
    args: {
        action: generateProposalActionUpdateMetadata(),
    },
};

export default meta;
