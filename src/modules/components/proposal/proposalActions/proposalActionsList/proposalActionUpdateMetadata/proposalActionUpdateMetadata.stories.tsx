import type { Meta, StoryObj } from '@storybook/react';
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
                logo: 'https://cdn.prod.website-files.com/5e997428d0f2eb13a90aec8c/635283b535e03c60d5aafe64_logo_aragon_isotype.png',
                name: 'Aragon DAO',
                description: 'A description for the Aragon DAO',
                links: [{ label: 'Aragon DAO', href: 'https://aragon.org/' }],
            },
            proposedMetadata: {
                logo: 'https://cdn.prod.website-files.com/5e997428d0f2eb13a90aec8c/635283b535e03c60d5aafe64_logo_aragon_isotype.png',
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

export default meta;
