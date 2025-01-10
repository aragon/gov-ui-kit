import type { Meta, StoryObj } from '@storybook/react';
import { ProposalActionType } from '../../proposalActionsDefinitions';
import { ProposalActionUpdateMetadata } from './proposalActionUpdateMetadata';
import { generateProposalActionUpdateMetadata } from './proposalActionUpdateMetadata.testUtils';

const meta: Meta<typeof ProposalActionUpdateMetadata> = {
    title: 'Modules/Components/Proposal/ProposalActions/Actions/UpdateMetadata',
    component: ProposalActionUpdateMetadata,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=18943-52447&t=tQiF5klPD9cjUit6-4',
        },
    },
};

type Story = StoryObj<typeof ProposalActionUpdateMetadata>;

/**
 * Usage example of the ProposalActions module component with mocked UpdateMetadata actions.
 */
export const Default: Story = {
    args: {
        action: generateProposalActionUpdateMetadata({
            existingMetadata: {
                avatar: 'https://cdn.prod.website-files.com/5e997428d0f2eb13a90aec8c/635283b535e03c60d5aafe64_logo_aragon_isotype.png',
                name: 'Aragon DAO',
                description: 'A description for the Aragon DAO',
                links: [{ label: 'Aragon DAO', href: 'https://aragon.org/' }],
            },
            proposedMetadata: {
                avatar: 'https://cdn.prod.website-files.com/5e997428d0f2eb13a90aec8c/635283b535e03c60d5aafe64_logo_aragon_isotype.png',
                name: 'Aragon X',
                description: 'Updated description for the AragonX DAO',
                links: [
                    { label: 'Aragon X', href: 'https://aragon.org/' },
                    { label: 'Twitter', href: 'https://x.com/AragonProject' },
                ],
            },
        }),
    },
};

/**
 * Usage example of the ProposalActions module component with mocked UpdatePluginMetadata actions for a plugin.
 */
export const Plugin: Story = {
    args: {
        action: generateProposalActionUpdateMetadata({
            type: ProposalActionType.UPDATE_PLUGIN_METADATA,
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
 * Usage example of the ProposalActions module component with mocked UpdatePluginMetadata actions for a process plugin.
 */
export const ProcessPlugin: Story = {
    args: {
        action: generateProposalActionUpdateMetadata({
            type: ProposalActionType.UPDATE_PLUGIN_METADATA,
            existingMetadata: {
                name: 'Core',
                processKey: 'CRE',
                description: 'Some non helpful description',
                links: [{ label: 'Aragon DAO', href: 'https://aragon.org/' }],
            },
            proposedMetadata: {
                name: 'Core',
                processKey: 'CRE',
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
