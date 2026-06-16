import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dialog } from '../../../../core';
import { ProposalActions } from '../../proposal';
import { generateProposalAction } from '../../proposal/proposalActions/proposalActionsTestUtils';
import { TransactionDataListItem, TransactionStatus, TransactionType } from '../transactionDataListItem';
import { TransactionDetailSummary } from '../transactionDetailSummary';
import { TransactionDetail } from './index';

const meta: Meta<typeof TransactionDetail.Root> = {
    title: 'Modules/Components/Transaction/TransactionDetail',
    component: TransactionDetail.Root,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw?node-id=30473-117450',
        },
    },
};

type Story = StoryObj<typeof TransactionDetail.Root>;

const contractAddress = '0x1234567890123456789012345678901234561234';
const transactionHash = '0x9aaa00000000000000000000000000000000000000000000000000000000a08c';

/**
 * The TransactionDetail dialog opened from an execution row of a transaction data list: a summary card followed by a
 * proposal-action list for the decoded execution actions and a `More` dropdown to expand/collapse all actions or
 * download them as JSON.
 */
export const ExecutionDialog: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        const closeDialog = () => setOpen(false);
        const actions = [
            generateProposalAction({
                to: contractAddress,
                value: '0',
                data: '0x79ba5097',
                inputData: {
                    function: 'mint',
                    contract: 'GovernanceERC20',
                    parameters: [
                        { name: 'to', type: 'address', value: '0x1234567890123456789012345678901234561234' },
                        { name: 'amount', type: 'uint256', value: '100000000000000000000' },
                    ],
                },
            }),
            generateProposalAction({
                to: contractAddress,
                value: '50000000000000000',
                data: '0x',
                inputData: null,
            }),
            generateProposalAction({
                to: contractAddress,
                value: '0',
                data: '0x79ba5097',
                inputData: {
                    function: 'setMetadata',
                    contract: 'DAO',
                    parameters: [{ name: '_metadata', type: 'bytes', value: '0x1234' }],
                },
            }),
            generateProposalAction({
                to: contractAddress,
                value: '0',
                data: '0x79ba5097',
                inputData: {
                    function: 'registerGauge',
                    contract: 'Gauge registrar v1.0',
                    parameters: [{ name: 'gauge', type: 'address', value: contractAddress }],
                },
            }),
            generateProposalAction({
                to: contractAddress,
                value: '0',
                data: '0x79ba5097',
                inputData: {
                    function: 'unregisterGauge',
                    contract: 'Gauge registrar v1.0',
                    parameters: [{ name: 'gauge', type: 'address', value: contractAddress }],
                },
            }),
        ];

        return (
            <>
                <TransactionDataListItem.Structure
                    actionCount={5}
                    chainId={1}
                    date={1_613_984_914_000}
                    label="Token Voting"
                    onClick={(event) => {
                        // DataList.Item calls onClick without an event when it renders as a non-link interactive row
                        // (no block-explorer href), so guard against a missing event before preventing navigation.
                        event?.preventDefault();
                        setOpen(true);
                    }}
                    status={TransactionStatus.SUCCESS}
                    type={TransactionType.EXECUTION}
                />
                <Dialog.Root onOpenChange={setOpen} open={open}>
                    <TransactionDetail.Root onClose={closeDialog}>
                        <TransactionDetailSummary
                            chainId={1}
                            date={1_613_984_914_000}
                            executedBy={{
                                label: 'Core',
                                helptext: 'SPP v1.3',
                                address: contractAddress,
                                href: '/processes/core',
                            }}
                            proposalHref="/proposals/CRE-54"
                            proposalId="CRE-54"
                            totalActions={5}
                            transactionHash={transactionHash}
                        />
                        <ProposalActions.Root actionsCount={actions.length}>
                            <ProposalActions.Container emptyStateDescription="">
                                {actions.map((action, index) => (
                                    <ProposalActions.Item action={action} chainId={1} key={index} />
                                ))}
                            </ProposalActions.Container>
                            <ProposalActions.Footer
                                dropdownAlignment="start"
                                dropdownItems={[
                                    {
                                        label: 'Download actions as JSON',
                                        // biome-ignore lint/suspicious/noConsole: storybook example handler
                                        onClick: () => console.info('download actions as JSON'),
                                    },
                                ]}
                            />
                        </ProposalActions.Root>
                    </TransactionDetail.Root>
                </Dialog.Root>
            </>
        );
    },
};

export default meta;
