import { DevTool } from '@hookform/devtools';
import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { IconType } from '../../../../../core';
import { generateProposalActionTokenMint, type IProposalActionsItemProps, ProposalActions } from '../index';
import { generateProposalAction } from '../proposalActionsTestUtils';

const defaultRender = (props: IProposalActionsItemProps) => {
    const methods = useForm({ mode: 'onTouched', defaultValues: props.action });

    return (
        <FormProvider {...methods}>
            <ProposalActions.Root>
                <ProposalActions.Container emptyStateDescription="Proposal has no actions">
                    <ProposalActions.Item {...props} />
                </ProposalActions.Container>
            </ProposalActions.Root>
            <DevTool control={methods.control} />
        </FormProvider>
    );
};

const meta: Meta<typeof ProposalActions.Item> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions.Item',
    component: ProposalActions.Item,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16738-8439&t=tQiF5klPD9cjUit6-4',
        },
    },
};

type Story = StoryObj<typeof ProposalActions.Item>;

/**
 * For verified actions, the ProposalActions.Item component renders the DECODED view by default and disables the basic view.
 */
export const Verified: Story = {
    render: defaultRender,
    args: {
        index: 0,
        action: generateProposalAction({
            value: '0',
            data: '000000000000000000000000000000000000000000000000000000000000000f5df40000000000000000000000000000000000000000000000000000000000000000',
            to: '0xf067de59A16D9C252BD4319C34B8858ef96c0aa8',
            inputData: {
                function: 'exactInputSingle',
                contract: 'Uniswap V3: Router',
                parameters: [
                    {
                        name: 'tokenIn',
                        type: 'address',
                        value: '0xbe9F61555F50DD6167f2772e9CF7519790d96624',
                        notice: 'The token in',
                    },
                    {
                        name: 'tokenOut',
                        type: 'address',
                        value: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                        notice: 'The token out',
                    },
                    {
                        name: 'fee',
                        type: 'uint24',
                        value: '3000',
                    },
                    {
                        name: 'recipient',
                        type: 'address',
                        value: '0x80CB2f4f9B403C4C418C597d96c95FE14FD344a6',
                    },
                ],
            },
        }),
    },
};

/**
 * For unverified actions, the ProposalActions.Item component renders the RAW view by default and disables the decoded and basic views.
 */
export const Unverified: Story = {
    render: defaultRender,
    args: {
        index: 0,
        action: generateProposalAction({
            value: '0',
            to: '0x80CB2f4f9B403C4C418C597d96c95FE14FD344a6',
            data: '0x414bf389000000000000000000000000be9f61555f50dd6167f2772e9cf7519790d96624000000000000000000000000',
        }),
    },
};

/**
 * For supported/native actions, the ProposalActions.Item component renders the related BASIC view by default.
 */
export const Native: Story = {
    render: defaultRender,
    args: {
        index: 0,
        action: generateProposalActionTokenMint({
            to: '0x80CB2f4f9B403C4C418C597d96c95FE14FD344a6',
            data: '0xfdbd7eb30f83e91c298b29ec98b25dccba03447d2805c35a3c5f14dac295a8610d165173',
            receiver: {
                address: '0x15b4bfc1c85ffbdb6d7d0eb9f30c49657dfb1f5b',
                name: 'ens.eth',
                currentBalance: '500',
                newBalance: '1500',
            },
            inputData: {
                function: 'mint',
                contract: 'Governance Token',
                parameters: [
                    {
                        name: 'to',
                        type: 'address',
                        value: '0x15b4bfc1c85ffbdb6d7d0eb9f30c49657dfb1f5b',
                        notice: 'The receiver of the tokens',
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        value: '1000000000',
                        notice: 'Amount of minted tokens',
                    },
                ],
            },
        }),
    },
};

/**
 * Actions are marked as critical if they are not native transfers but have a value greater than 0.
 */
export const Critical: Story = {
    render: defaultRender,
    args: {
        index: 0,
        action: generateProposalAction({
            value: '8943160000000000000',
            to: '0xf21661D0D1d76d3ECb8e1B9F1c923DBfffAe4097',
            data: '0x095ea7b30000000000000000000000000000000000001ff3684f28c67538d4d072c22734000000000000000000000000000000000000000000000027f27af9f4dab7f940',
            inputData: {
                function: 'approve',
                contract: 'Uniswap Token',
                parameters: [
                    { name: 'spender', type: 'address', value: '0x0000000000001fF3684f28c67538d4D072C22734' },
                    { name: 'amount', type: 'uint256', value: '736895571409046600000' },
                ],
            },
        }),
    },
};

/**
 * When the `dropdownItems` property is set, the ProposalActions.Item component renders a dropdown inside the accordion
 * content with the items specified.
 */
export const DropdownItems: Story = {
    render: defaultRender,
    args: {
        index: 0,
        action: generateProposalAction({
            to: '0x6Fd81BD615Eae73D495127BE4AC4cCcbE5a28CaD',
            value: '98645312',
            data: '0x',
            inputData: { function: 'transfer', contract: 'ETH', parameters: [] },
        }),
        dropdownItems: [
            { label: 'Move up', icon: IconType.CHEVRON_UP, onClick: () => null },
            { label: 'Move down', icon: IconType.CHEVRON_DOWN, onClick: () => null },
            { label: 'Reset', icon: IconType.RELOAD, onClick: () => null },
            { label: 'Remove', icon: IconType.CLOSE, onClick: () => null },
        ],
    },
};

export default meta;
