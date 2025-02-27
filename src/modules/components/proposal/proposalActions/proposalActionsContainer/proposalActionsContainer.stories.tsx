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
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16738-8439&t=tQiF5klPD9cjUit6-4',
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

/**
 * Default usage example of the ProposalActions.Container component.
 */
export const Default: Story = {
    decorators: ComponentWrapper(1),
    render: (props) => (
        <ProposalActions.Container {...props}>
            <ProposalActions.Item
                action={generateProposalAction({
                    to: '0xEdDb9c0c60044Da5713465C9fbfA4132a9F5537d',
                    data: '0x23b872dd000000000000000000000000f6bce206b9a72166ec0bee315629064a5e997f8200000000000000',
                    inputData: {
                        function: 'addLiquidity',
                        contract: 'Uniswap V3',
                        parameters: [{ name: 'amount', type: 'uint256', value: '8645312' }],
                    },
                })}
            />
        </ProposalActions.Container>
    ),
};

/**
 * Example with expanded state of the ProposalActions.Container where the newest action is expanded.
 * When `<ProposalActions.Item />` children components have unique values passed as a prop,
 * the most recent added action will be expanded when mounted and as actions are added.
 */
export const Expanded: Story = {
    decorators: ComponentWrapper(1),
    render: (props) => (
        <ProposalActions.Container {...props}>
            <ProposalActions.Item
                value="0"
                action={generateProposalAction({
                    to: '0xEdDb9c0c60044Da5713465C9fbfA4132a9F5537d',
                    data: '0x23b872dd000000000000000000000000f6bce206b9a72166ec0bee315629064a5e997f8200000000000000',
                    inputData: {
                        function: 'addLiquidity',
                        contract: 'Uniswap V3',
                        parameters: [{ name: 'amount', type: 'uint256', value: '8645312' }],
                    },
                })}
            />
            <ProposalActions.Item
                value="1"
                action={generateProposalAction({
                    to: '0xEdDb9c0c60044Da5713465C9fbfA4132a9F5537d',
                    data: '0x23b872dd000000000000000000000000f6bce206b9a72166ec0bee315629064a5e997f8200000000000000',
                    inputData: {
                        function: 'addLiquidity',
                        contract: 'Uniswap V3',
                        parameters: [{ name: 'amount', type: 'uint256', value: '8645312' }],
                    },
                })}
            />
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
