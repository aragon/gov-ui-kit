import type { Meta, StoryObj } from '@storybook/react';
import { ProposalActionChangeSettings } from './proposalActionChangeSettings';
import { generateProposalActionChangeSettings } from './proposalActionChangeSettings.testUtils';

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
        action: generateProposalActionChangeSettings({
            existingSettings: [
                { term: 'Approval threshold', definition: '> 50%' },
                { term: 'Minimum participation', definition: '≥ 15% (≥ 300.5K UNI)' },
                { term: 'Minimum duration', definition: '3 days, 0 hours, 0 minutes' },
            ],
            proposedSettings: [
                { term: 'Approval threshold', definition: '> 55%' },
                { term: 'Minimum participation', definition: '≥ 15% (≥ 300.5K UNI)' },
                { term: 'Minimum duration', definition: '1 days, 12 hours, 0 minutes' },
            ],
        }),
    },
};

export default meta;
