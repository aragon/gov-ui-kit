import type { Meta, StoryObj } from '@storybook/react';

import { generateProposalActionChangeMembers } from '../actions/generators/proposalActionChangeMembers';
import { generateProposalActionWithdrawToken, generateToken } from '../actions/generators/proposalActionWithdrawToken';
import { type IProposalAction } from '../proposalActionsTypes';
import { ProposalActions } from './proposalActions';

const meta: Meta<typeof ProposalActions> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions',
    component: ProposalActions,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&t=aAKsoiPV8GlakDa1-1',
        },
    },
};

type Story = StoryObj<typeof ProposalActions>;

/**
 * Usage example of the ProposalActions module component with a variety of actions.
 */

export const ActionsExample: Story = {
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
            generateProposalActionWithdrawToken({
                to: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                token: generateToken({
                    name: 'Ether',
                    symbol: 'ETH',
                    decimals: 18,
                    logo: 'ether-logo.png',
                    priceUsd: '2000',
                }),
                inputData: {
                    function: 'transfer',
                    contract: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                    parameters: [
                        { type: 'address', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
                        { type: 'uint256', value: '1000000000000000000' },
                    ],
                },
            }),
            generateProposalActionChangeMembers(),
            {
                type: 'CUSTOM_ACTION',
                inputData: { function: 'doSomething', contract: 'Ether', parameters: [] },
                from: '0x1111111111111111111111111111111111111111',
                to: '0x2222222222222222222222222222222222222222',
                data: '',
                value: '10',
            },
            {
                type: 'UNKNOWN',
                inputData: { function: 'doSomethingElse', contract: 'DAI', parameters: [] },
                from: '0x3333333333333333333333333333333333333333',
                to: '0x4444444444444444444444444444444444444444',
                data: '',
                value: '20',
            },
        ];

        return (
            <ProposalActions
                actions={actions}
                actionNames={actionNames}
                customActionComponents={{
                    CUSTOM_ACTION: CustomActionComponent,
                }}
            />
        );
    },
};

export default meta;
