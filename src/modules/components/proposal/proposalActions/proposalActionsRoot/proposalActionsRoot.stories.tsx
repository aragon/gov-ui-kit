import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../../../../core';
import { generateProposalActionChangeMembers, generateProposalActionChangeSettings, ProposalActions } from '../index';

const meta: Meta<typeof ProposalActions.Root> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions.Root',
    component: ProposalActions.Root,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=18996-12757&t=tQiF5klPD9cjUit6-4',
        },
    },
};

type Story = StoryObj<typeof ProposalActions.Root>;

/**
 * Default usage example of the ProposalActions.Root component.
 */
export const Default: Story = {
    args: {
        actionsCount: 2,
    },
    render: (props) => (
        <ProposalActions.Root {...props}>
            <ProposalActions.Container emptyStateDescription="Proposal has no actions">
                <ProposalActions.Item
                    action={generateProposalActionChangeMembers({
                        inputData: { function: 'addMembers', contract: 'Multisig', parameters: [] },
                        members: [{ address: '0xC8da4C1d9BB59DD32ac39A925933188b7c66c311' }],
                        to: '0x96208a79d4f3386922ebEc815EF1C0d02b48Eb70',
                    })}
                />
                <ProposalActions.Item
                    action={generateProposalActionChangeSettings({
                        inputData: { function: 'updateSettings', contract: 'Multisig', parameters: [] },
                        existingSettings: [{ term: 'Proposal creation', definition: 'Any address' }],
                        proposedSettings: [{ term: 'Proposal creation', definition: 'Only members' }],
                        to: '0x0150627b84a0C8257AB28cD0E1F71E81c7aafe3d',
                    })}
                />
            </ProposalActions.Container>
            <ProposalActions.Footer>
                <Button size="md" className="text-nowrap">
                    Execute actions
                </Button>
            </ProposalActions.Footer>
        </ProposalActions.Root>
    ),
};

/**
 * Example usage of the ProposalActions.Root component with controlled accordion state and custom action IDs.
 */
export const Controlled: Story = {
    render: (props) => {
        const [expandedActions, setExpandedActions] = useState<string[]>([]);

        const actionIds = ['bfaed98c-7892-4e55-9a6c-f32a36cc41cf', 'aca264be-2884-4bab-9445-f29ca0869fdb'];
        const actions = [
            {
                id: actionIds[0],
                ...generateProposalActionChangeMembers({
                    inputData: { function: 'removeMembers', contract: 'Multisig', parameters: [] },
                    members: [{ address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' }],
                    to: '0x5283D291DBCF85356A21bA090E6db59121208b44',
                }),
            },
            {
                id: actionIds[1],
                ...generateProposalActionChangeMembers({
                    inputData: { function: 'addMembers', contract: 'Multisig', parameters: [] },
                    members: [{ address: '0x6cC5F688a315f3dC28A7781717a9A798a59fDA7b' }],
                    to: '0x5283D291DBCF85356A21bA090E6db59121208b44',
                }),
            },
        ];

        return (
            <ProposalActions.Root
                expandedActions={expandedActions}
                onExpandedActionsChange={setExpandedActions}
                {...props}
            >
                <ProposalActions.Container emptyStateDescription="Proposal has no actions">
                    {actions.map((action, index) => (
                        <ProposalActions.Item key={index} action={action} value={action.id} />
                    ))}
                </ProposalActions.Container>
                <ProposalActions.Footer actionIds={actionIds} />
            </ProposalActions.Root>
        );
    },
};

/**
 * Example usage of the ProposalActions.Root component with loading state.
 */
export const Loading: Story = {
    args: {
        isLoading: true,
        actionsCount: 2,
    },
    render: (props) => (
        <ProposalActions.Root {...props}>
            <ProposalActions.Container emptyStateDescription="Proposal has no actions" />
            <ProposalActions.Footer />
        </ProposalActions.Root>
    ),
};

export default meta;
