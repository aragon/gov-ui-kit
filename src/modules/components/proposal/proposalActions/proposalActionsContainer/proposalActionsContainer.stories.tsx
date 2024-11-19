import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { ProposalActions } from '../index';
import { generateProposalAction } from '../proposalActionsTestUtils';

const meta: Meta<typeof ProposalActions.Container> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions.Container',
    component: ProposalActions.Container,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActions.Container>;

const ComponentWrapper = (actionsCount: number) =>
    function Wrapper(Story: ComponentType) {
        return (
            <ProposalActions.Root actionsCount={actionsCount}>
                <Story />
            </ProposalActions.Root>
        );
    };

const defaultActions = [
    generateProposalAction({
        inputData: { function: 'addLiquidity', contract: 'Uniswap V3', parameters: [] },
        to: '0xEdDb9c0c60044Da5713465C9fbfA4132a9F5537d',
    }),
];

/**
 * Default usage example of the ProposalActions.Container component.
 */
export const Default: Story = {
    decorators: ComponentWrapper(defaultActions.length),
    render: (props) => (
        <ProposalActions.Container {...props}>
            {defaultActions.map((action, index) => (
                <ProposalActions.Item key={index} action={action} />
            ))}
        </ProposalActions.Container>
    ),
};

/**
 * The ProposalActions.Container component renders an empty state when actionsCount is set to 0.
 */
export const Empty: Story = {
    decorators: ComponentWrapper(0),
    args: {
        emptyStateDescription: 'No actions added. Consider adding some.',
    },
};

export default meta;
