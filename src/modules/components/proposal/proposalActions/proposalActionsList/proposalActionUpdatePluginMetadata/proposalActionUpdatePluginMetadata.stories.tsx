import type { Meta, StoryObj } from '@storybook/react';
import { ProposalActionUpdatePluginMetadata } from './proposalActionUpdatePluginMetadata';
import { generateProposalActionUpdatePluginMetadata } from './proposalActionUpdatePluginMetadata.testUtils';

const meta: Meta<typeof ProposalActionUpdatePluginMetadata> = {
    title: 'Modules/Components/Proposal/ProposalActions/Actions/UpdatePluginMetadata',
    component: ProposalActionUpdatePluginMetadata,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=21802-33827&node-type=frame&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalActionUpdatePluginMetadata>;

/**
 * Usage example of the ProposalActions module component with mocked UpdatePluginMetadata actions for a plugin.
 */
export const Default: Story = {
    args: {
        action: generateProposalActionUpdatePluginMetadata({
            existingMetadata: {
                name: 'Founder council',
                description: 'Some non helpful description',
                links: [{ label: 'Aragon DAO', href: 'https://aragon.org/' }],
            },
            proposedMetadata: {
                name: 'Founders council',
                description:
                    'The founder council is based on all original founders of the Patito DAO. It’s the council, which at least have a veto in all published proposals.',
                links: [
                    { label: 'Aragon X', href: 'https://aragon.org/' },
                    { label: 'Twitter', href: 'https://x.com/AragonProject' },
                ],
            },
        }),
    },
};

/**
 * Usage example of the ProposalActions module component with mocked UpdatePluginMetadata actions for a process.
 */
export const Process: Story = {
    args: {
        action: generateProposalActionUpdatePluginMetadata({
            existingMetadata: {
                name: 'Core',
                key: 'CRE',
                description: 'Some non helpful description',
                links: [{ label: 'Aragon DAO', href: 'https://aragon.org/' }],
            },
            proposedMetadata: {
                name: 'Core',
                key: 'CRE',
                description:
                    'Core proposals are the primary governance process of Patito DAO. Grants and protocol upgrades both require proposals to pass in a Core  proposal process.',
                links: [
                    { label: 'Aragon X', href: 'https://aragon.org/' },
                    { label: 'Twitter', href: 'https://x.com/AragonProject' },
                ],
            },
        }),
    },
};

export default meta;
