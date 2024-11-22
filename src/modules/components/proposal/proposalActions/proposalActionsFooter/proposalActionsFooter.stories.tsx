import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { Button } from '../../../../../core';
import { ProposalActions } from '../index';
import { generateProposalAction } from '../proposalActionsTestUtils';

const ComponentWrapper = (Story: ComponentType) => (
    <ProposalActions.Root>
        <Story />
    </ProposalActions.Root>
);

const meta: Meta<typeof ProposalActions.Footer> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions.Footer',
    component: ProposalActions.Footer,
    decorators: ComponentWrapper,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16738-7342&t=tQiF5klPD9cjUit6-4',
        },
    },
};

type Story = StoryObj<typeof ProposalActions.Footer>;

/**
 * Default usage example of the ProposalActions.Footer component.
 */
export const Default: Story = {
    render: (props) => (
        <>
            <ProposalActions.Container emptyStateDescription="Empty">
                <ProposalActions.Item action={generateProposalAction()} />
                <ProposalActions.Item action={generateProposalAction()} />
            </ProposalActions.Container>
            <ProposalActions.Footer {...props} />
        </>
    ),
};

/**
 * Usage example of the ProposalActions.Footer component with children property.
 */
export const Children: Story = {
    render: (props) => (
        <>
            <ProposalActions.Container emptyStateDescription="Empty">
                <ProposalActions.Item action={generateProposalAction()} />
                <ProposalActions.Item action={generateProposalAction()} />
            </ProposalActions.Container>
            <ProposalActions.Footer {...props}>
                <Button variant="primary" size="md">
                    Execute proposal
                </Button>
            </ProposalActions.Footer>
        </>
    ),
};

/**
 * The children component is still rendered on the left side of the footer when the expand button is not shown.
 */
export const ChildrenWithoutExpand: Story = {
    render: (props) => (
        <>
            <ProposalActions.Container emptyStateDescription="Empty">
                <ProposalActions.Item action={generateProposalAction()} />
            </ProposalActions.Container>
            <ProposalActions.Footer {...props}>
                <Button variant="primary" size="md">
                    Execute proposal
                </Button>
            </ProposalActions.Footer>
        </>
    ),
};

export default meta;
