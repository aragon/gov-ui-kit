import type { Meta, StoryObj } from '@storybook/react';
import { Button, IconType } from '../../../../../core';
import {
    generateProposalAction,
    generateProposalActionTokenMint,
    generateProposalActionUpdateMetadata,
    generateProposalActionWithdrawToken,
    generateToken,
} from '../actions/generators';
import type { IProposalAction } from '../proposalActionsTypes';
import { ProposalActions } from './proposalActions';

const meta: Meta<typeof ProposalActions> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions',
    component: ProposalActions,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActions>;

/**
 * Usage example of the ProposalActions module component with mocked actions.
 */
export const MixedActions: Story = {
    args: {
        actions: [
            generateProposalActionWithdrawToken({
                to: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                value: '1000000000000000000',
                data: '0x',
                token: generateToken({
                    name: 'Ether',
                    symbol: 'ETH',
                    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
                    priceUsd: '2800',
                }),
            }),
            generateProposalActionUpdateMetadata({ data: 'update-data' }),
            generateProposalAction({
                to: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                value: '1000000000000000000',
                data: 'custom-action-data',
                inputData: {
                    function: 'customAction',
                    contract: 'GovernanceERC20',
                    parameters: [
                        {
                            name: 'address',
                            value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
                            notice: 'Contract address of asset',
                            type: 'string',
                        },
                        {
                            name: 'tokenAmount',
                            value: '2000000000000000000',
                            notice: 'Amount of tokens to withdraw',
                            type: 'string',
                        },
                    ],
                },
            }),
            generateProposalAction({
                type: 'unknownType',
                data: 'data-mock',
                to: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                inputData: null,
            }),
        ],
    },
};

export const CustomActions: Story = {
    render: () => {
        const actionNames = {
            WITHDRAW_TOKEN: 'Withdraw assets',
            CUSTOM_ACTION_ONE: 'Custom Action One',
            CUSTOM_ACTION_TWO: 'Custom Action Two',
            ADD_MEMBERS: 'Add members',
        };

        const CustomActionComponent: React.FC<{ action: IProposalAction }> = ({ action }) => {
            return (
                <div>
                    <h4>Custom Action One</h4>
                    <p>Type: {action.type}</p>
                    <p>From: {action.from}</p>
                    <p>To: {action.to}</p>
                    <p>Value: {action.value}</p>
                    <p>Contract: {action.to}</p>
                </div>
            );
        };

        const actions = [
            {
                type: 'CUSTOM_ACTION',
                inputData: { function: 'doSomething', contract: 'Ether', parameters: [] },
                from: '0x1111111111111111111111111111111111111111',
                to: '0x2222222222222222222222222222222222222222',
                data: '0x',
                value: '10',
            },
            {
                type: 'UNKNOWN',
                inputData: { function: 'doSomethingElse', contract: 'DAI', parameters: [] },
                from: '0x3333333333333333333333333333333333333333',
                to: '0x4444444444444444444444444444444444444444',
                data: '0x',
                value: '20',
            },
        ];

        return (
            <ProposalActions
                actions={actions}
                actionNames={actionNames}
                customActionComponents={{ CUSTOM_ACTION: CustomActionComponent }}
                emptyStateDescription="No actions added. Consider adding some."
            />
        );
    },
};

export const EmptyActions: Story = {
    args: {
        actions: [],
        emptyStateDescription: 'No actions added. Consider adding some.',
    },
};

export const WithChildren: Story = {
    args: {
        actions: [generateProposalActionWithdrawToken(), generateProposalActionUpdateMetadata()],
    },
    render: (args) => (
        <ProposalActions {...args}>
            <Button>Confirm Actions</Button>
        </ProposalActions>
    ),
};

export const WithDropdownItems: Story = {
    args: {
        actions: [generateProposalActionUpdateMetadata(), generateProposalActionTokenMint()],
        dropdownItems: [
            { label: 'Move up', icon: IconType.CHEVRON_UP, onClick: () => null },
            { label: 'Move down', icon: IconType.CHEVRON_DOWN, onClick: () => null },
            { label: 'Reset action', icon: IconType.RELOAD, onClick: () => null },
            { label: 'Remove action', icon: IconType.CLOSE, onClick: () => null },
        ],
    },
};

export default meta;
