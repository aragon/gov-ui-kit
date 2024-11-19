import type { Meta, StoryObj } from '@storybook/react';
import { generateProposalActionChangeMembers, generateProposalActionChangeSettings, ProposalActions } from '../index';

const meta: Meta<typeof ProposalActions.Item> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions.Item',
    component: ProposalActions.Item,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=18996-12757&t=aU6YzyKeOX7RyXen-4',
        },
    },
};

type Story = StoryObj<typeof ProposalActions.Root>;

const defaultActions = [
    generateProposalActionChangeMembers({
        inputData: { function: 'addMembers', contract: 'Multisig', parameters: [] },
        members: [{ address: '0xC8da4C1d9BB59DD32ac39A925933188b7c66c311' }],
        to: '0x96208a79d4f3386922ebEc815EF1C0d02b48Eb70',
    }),
    generateProposalActionChangeSettings({
        inputData: { function: 'updateSettings', contract: 'Multisig', parameters: [] },
        existingSettings: [{ term: 'Proposal creation', definition: 'Any address' }],
        proposedSettings: [{ term: 'Proposal creation', definition: 'Only members' }],
        to: '0x0150627b84a0C8257AB28cD0E1F71E81c7aafe3d',
    }),
];

/**
 * Default usage example of the ProposalActions.Item component.
 */
export const Default: Story = {
    render: (props) => (
        <ProposalActions.Root {...props}>
            <ProposalActions.Container emptyStateDescription="Proposal has no actions">
                {defaultActions.map((action, index) => (
                    <ProposalActions.Item key={index} action={action} />
                ))}
            </ProposalActions.Container>
        </ProposalActions.Root>
    ),
};

export default meta;
