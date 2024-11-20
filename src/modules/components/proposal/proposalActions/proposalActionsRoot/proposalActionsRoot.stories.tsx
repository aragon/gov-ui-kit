import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../../../core';
import { generateProposalActionChangeMembers, generateProposalActionChangeSettings, ProposalActions } from '../index';

const meta: Meta<typeof ProposalActions.Root> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions.Root',
    component: ProposalActions.Root,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Governance-UI-Kit?m=auto&node-id=15855%3A27684',
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
 * Default usage example of the ProposalActions.Root component.
 */
export const Default: Story = {
    args: {
        actionsCount: defaultActions.length,
    },
    render: (props) => (
        <ProposalActions.Root {...props}>
            <ProposalActions.Container emptyStateDescription="Proposal has no actions">
                {defaultActions.map((action, index) => (
                    <ProposalActions.Item key={index} action={action} />
                ))}
            </ProposalActions.Container>
            <ProposalActions.Footer>
                <Button size="md" variant="secondary">
                    Execute actions
                </Button>
            </ProposalActions.Footer>
        </ProposalActions.Root>
    ),
};

export default meta;
