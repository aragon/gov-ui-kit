import { DevTool } from '@hookform/devtools';
import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { generateProposalAction } from '../../proposalActionsTestUtils';
import {
    type IProposalActionsItemDecodedViewProps,
    ProposalActionsItemDecodedView,
} from './proposalActionsItemDecodedView';

const defaultRender = (props: IProposalActionsItemDecodedViewProps) => {
    const methods = useForm({ mode: 'onTouched', defaultValues: props.action });

    return (
        <FormProvider {...methods}>
            <ProposalActionsItemDecodedView {...props} />
            <DevTool control={methods.control} />
        </FormProvider>
    );
};

const meta: Meta<typeof ProposalActionsItemDecodedView> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions.Item/DecodedView',
    component: ProposalActionsItemDecodedView,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16738-8439&t=tQiF5klPD9cjUit6-4',
        },
    },
};

type Story = StoryObj<typeof ProposalActionsItemDecodedView>;

/**
 * Default usage example of the Decoded view from the ProposalActionsItem component.
 */
export const Default: Story = {
    render: defaultRender,
    args: {
        action: generateProposalAction({
            inputData: {
                function: '',
                contract: '',
                parameters: [
                    {
                        name: '_proposalId',
                        type: 'uint256',
                        value: '25',
                        notice: 'The ID of the proposal.',
                    },
                    {
                        name: '_voteOption',
                        type: 'uint8',
                        value: '0',
                        notice: 'The chosen vote option.',
                    },
                    {
                        name: '_tryEarlyExecution',
                        type: 'bool',
                        value: false,
                        notice: 'If `true`, early execution is tried after the vote cast. The call does not revert if early execution is not possible.',
                    },
                ],
            },
        }),
    },
};

/**
 * Usage example of the Decoded view from the ProposalActionsItem component with a payable function.
 */
export const Payable: Story = {
    render: defaultRender,
    args: {
        action: generateProposalAction({
            inputData: {
                function: '',
                contract: '',
                payable: true,
                parameters: [
                    {
                        name: '_boostAmount',
                        type: 'uint256',
                        value: '0',
                    },
                ],
            },
        }),
    },
};

/**
 * Usage example of the Decoded view from the ProposalActionsItem component with tuple type.
 */
export const Tuple: Story = {
    render: defaultRender,
    args: {
        action: generateProposalAction({
            inputData: {
                function: '',
                contract: '',
                parameters: [
                    {
                        name: '_dao',
                        type: 'address',
                        value: '0xd4bfb6c688b2982a3b432f2fc6c35117532a2c27',
                        notice: 'The IDAO interface of the associated DAO.',
                    },
                    {
                        name: '_votingSettings',
                        type: 'tuple',
                        value: ['0', '500000', '10000', '3600', '0'],
                        notice: 'The voting settings.',
                        components: [
                            { name: 'votingMode', type: 'uint8' },
                            { name: 'supportThreshold', type: 'uint32' },
                            { name: 'minParticipation', type: 'uint32' },
                            { name: 'minDuration', type: 'uint64' },
                            { name: 'minProposerVotingPower', type: 'uint256' },
                        ],
                    },
                    {
                        name: '_token',
                        type: 'address',
                        value: '0x81E12113FE7Fc79525AAF01D18943d085D80a2E6',
                        notice: 'The [ERC-20](https://eips.ethereum.org/EIPS/eip-20) token used for voting.',
                    },
                ],
            },
        }),
    },
};

/**
 * Usage example of the Decoded view from the ProposalActionsItem component with array type.
 */
export const Array: Story = {
    render: defaultRender,
    args: {
        action: generateProposalAction({
            inputData: {
                function: '',
                contract: '',
                parameters: [
                    {
                        name: '_members',
                        type: 'address[]',
                        value: [
                            '0x07161b0feCCCc4df5c368c980Ae260e209398F14',
                            '0x21e24be31c85B418C5fe95c6dad9b96F9CcBc7B6',
                            '0x6ff83a648f4Aa1A07B1242257132d36a487B8548',
                        ],
                        notice: 'The addresses to be added.',
                    },
                ],
            },
        }),
    },
};

/**
 * Usage example of the Decoded view from the ProposalActionsItem component with an array type inside a tuple.
 */
export const ArrayInsideTuple: Story = {
    render: defaultRender,
    args: {
        action: generateProposalAction({
            inputData: {
                function: '',
                contract: '',
                parameters: [
                    {
                        name: '_payload',
                        type: 'tuple',
                        value: [
                            '0xe22619F6D538DE6E0B6c1845174D45e90cBd3576',
                            [
                                '0x11cbb1467fd171d342cD993aF2B0687DB3c83B4C',
                                '0x2E6D520d60817aAA757cba4cEBfBe3430e50552c',
                                '0x4092F53EaCC5cBb0b3920ad44EDcb93Ff715e2ac',
                            ],
                            '0x415565b000000000000000000000000057e114b691db790c35207b2e685d4a43181e6061000000000000000000000000',
                        ],
                        notice: 'Payload of the transaction',
                        components: [
                            { type: 'address', name: 'plugin' },
                            { type: 'address[]', name: 'currentHelpers' },
                            { type: 'bytes', name: 'data' },
                        ],
                    },
                ],
            },
        }),
    },
};

/**
 * Usage example of the Decoded view from the ProposalActionsItem component with an array of tuple.
 */
export const TupleArray: Story = {
    render: defaultRender,
    args: {
        action: generateProposalAction({
            inputData: {
                function: '',
                contract: '',
                parameters: [
                    {
                        name: '_metadata',
                        type: 'bytes',
                        value: '0x697066733a2f2f6261666b7265696176716633656f6b616c6f7474653378626c736d716b7436646e7077726d376c326579696c78346d74796b7a706f67736e6b6461',
                    },
                    {
                        name: '_actions',
                        type: 'tuple[]',
                        value: [
                            ['0xE6b8b0Bb36667B4aa64C6C55818e05Ccc336C483', '22429150000000000', '0x'],
                            [
                                '0x54DFA4B635E7eB98515fEBA81d360A3871739277',
                                '0',
                                '0x6a761202000000000000000000000000ca6f5bd946f52298a7b6154fc827bf87512a15f300000000000000000000000000000000000',
                            ],
                        ],
                        components: [
                            { type: 'address', name: 'to' },
                            { type: 'uint256', name: 'value' },
                            { type: 'bytes', name: 'data' },
                        ],
                    },
                ],
            },
        }),
    },
};

/**
 * Usage example of the Decoded view from the ProposalActionsItem component with a multi-dimentional array.
 */
export const MultiDimentionalArray: Story = {
    render: defaultRender,
    args: {
        action: generateProposalAction({
            inputData: {
                function: '',
                contract: '',
                parameters: [
                    {
                        name: 'id',
                        type: 'uint',
                        value: '12',
                    },
                    {
                        name: 'data',
                        type: 'uint[][]',
                        value: [
                            ['1000000', '200000000'],
                            ['1500000', '100000'],
                        ],
                    },
                ],
            },
        }),
    },
};

/**
 * Usage example of the Decoded view from the ProposalActionsItem component with nested tuple type.
 */
export const NestedTuple: Story = {
    render: defaultRender,
    args: {
        action: generateProposalAction({
            inputData: {
                function: '',
                contract: '',
                parameters: [
                    {
                        name: '_stages',
                        type: 'tuple[]',
                        value: [
                            [
                                [
                                    [
                                        '0x01Bdd4b458BF5a14dA8Dcf0d3bE124aB1561e763',
                                        'false',
                                        '0x01Bdd4b458BF5a14dA8Dcf0d3bE124aB1561e763',
                                        '0',
                                    ],
                                    [
                                        '0x17366cae2b9c6C3055e9e3C78936a69006BE5409',
                                        'true',
                                        '0x17366cae2b9c6C3055e9e3C78936a69006BE5409',
                                        '0',
                                    ],
                                ],
                                '36000',
                                '0',
                                '3600',
                                '2',
                                '0',
                            ],
                            [
                                [
                                    [
                                        '0x9b9788E54E1d2Dda49054CD3d08D63018EE31104',
                                        'false',
                                        '0x9b9788E54E1d2Dda49054CD3d08D63018EE31104',
                                        '0',
                                    ],
                                ],
                                '36000',
                                '0',
                                '3600',
                                '0',
                                '1',
                            ],
                        ],
                        components: [
                            {
                                name: 'plugins',
                                type: 'tuple[]',
                                components: [
                                    { name: 'pluginAddress', type: 'address' },
                                    { name: 'isManual', type: 'bool' },
                                    { name: 'allowedBody', type: 'address' },
                                    { name: 'proposalType', type: 'uint8' },
                                ],
                            },
                            { name: 'maxAdvance', type: 'uint64' },
                            { name: 'minAdvance', type: 'uint64' },
                            { name: 'stageDuration', type: 'uint64' },
                            { name: 'approvalThreshold', type: 'uint16' },
                            { name: 'vetoThreshold', type: 'uint16' },
                        ],
                    },
                ],
            },
        }),
    },
};

export default meta;
