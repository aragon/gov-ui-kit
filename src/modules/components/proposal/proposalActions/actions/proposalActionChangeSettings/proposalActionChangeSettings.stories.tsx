import type { Meta, StoryObj } from '@storybook/react';
import { generateProposalActionChangeSettings } from '../generators/proposalActionChangeSettings';
import { ProposalActionChangeSettings } from './proposalActionChangeSettings';

const meta: Meta<typeof ProposalActionChangeSettings> = {
    title: 'Modules/Components/Proposal/ProposalActions/Actions/ChangeSettings',
    component: ProposalActionChangeSettings,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActionChangeSettings>;

/**
 * Usage example of the ProposalActions module component with mocked settings.
 */
export const Default: Story = {
    args: {
        action: generateProposalActionChangeSettings(),
    },
};

export default meta;
