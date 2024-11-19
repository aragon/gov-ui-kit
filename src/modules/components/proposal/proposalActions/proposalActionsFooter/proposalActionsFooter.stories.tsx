import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { Button } from '../../../../../core';
import { ProposalActions } from '../index';
import { generateProposalAction } from '../proposalActions.testUtils';

const meta: Meta<typeof ProposalActions.Footer> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions.Footer',
    component: ProposalActions.Footer,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16738-8439&t=aU6YzyKeOX7RyXen-4',
        },
    },
};

type Story = StoryObj<typeof ProposalActions.Footer>;

const ComponentWrapper = (actionsCount: number) =>
    function Wrapper(Story: ComponentType) {
        return (
            <ProposalActions.Root actionsCount={actionsCount}>
                <Story />
            </ProposalActions.Root>
        );
    };

/**
 * Default usage example of the ProposalActions.Footer component.
 */
export const Default: Story = {
    decorators: ComponentWrapper(2),
    render: (props) => (
        <>
            <ProposalActions.Container emptyStateDescription="Empty">
                <ProposalActions.Item
                    action={generateProposalAction({ to: '0x25716fB10298638eD386A5A5dD2E9233D213F442', data: '0xabc' })}
                />
                <ProposalActions.Item
                    action={generateProposalAction({ to: '0x25716fB10298638eD386A5A5dD2E9233D213F442', data: '0xdef' })}
                />
            </ProposalActions.Container>
            <ProposalActions.Footer {...props} />
        </>
    ),
};

/**
 * Usage example of the ProposalActions.Footer component with children property.
 */
export const Children: Story = {
    decorators: ComponentWrapper(2),
    render: (props) => (
        <ProposalActions.Footer {...props}>
            <Button variant="primary" size="md">
                Execute proposal
            </Button>
        </ProposalActions.Footer>
    ),
};

export default meta;
