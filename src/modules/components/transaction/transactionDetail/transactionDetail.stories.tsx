import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dialog } from '../../../../core';
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
 * list of expandable action rows (each carrying its own decoded action UI as children) and a `More` dropdown to
 * expand/collapse all actions or download them as JSON.
 */
export const ExecutionDialog: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        const closeDialog = () => setOpen(false);

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
                        <TransactionDetail.Container>
                            <TransactionDetail.Action
                                chainId={1}
                                contractName="GovernanceERC20"
                                name="Mint"
                                selector="0x79ba5097"
                                to={contractAddress}
                                value="0"
                            >
                                <p className="text-neutral-500">Mint 100 TOKEN to 0x1234…1234</p>
                            </TransactionDetail.Action>
                            <TransactionDetail.Action
                                chainId={1}
                                contractName="NativeTransfer"
                                name="Transfer"
                                to={contractAddress}
                                value="1"
                            >
                                <p className="text-neutral-500">Transfer 50 TOKEN to 0x5678…5678</p>
                            </TransactionDetail.Action>
                            <TransactionDetail.Action
                                chainId={1}
                                contractName="DAO"
                                name="Set metadata"
                                selector="0x79ba5097"
                                to={contractAddress}
                                value="2"
                            >
                                <p className="text-neutral-500">Update the DAO metadata URI</p>
                            </TransactionDetail.Action>
                            <TransactionDetail.Action
                                chainId={1}
                                contractName="Gauge registrar v1.0"
                                name="Register gauge"
                                selector="0x79ba5097"
                                to={contractAddress}
                                value="3"
                            >
                                <p className="text-neutral-500">Register a new gauge</p>
                            </TransactionDetail.Action>
                            <TransactionDetail.Action
                                chainId={1}
                                contractName="Gauge registrar v1.0"
                                name="Unregister gauge"
                                selector="0x79ba5097"
                                to={contractAddress}
                                value="4"
                            >
                                <p className="text-neutral-500">Unregister an existing gauge</p>
                            </TransactionDetail.Action>
                        </TransactionDetail.Container>
                        <TransactionDetail.Footer
                            dropdownItems={[
                                {
                                    label: 'Download actions as JSON',
                                    // biome-ignore lint/suspicious/noConsole: storybook example handler
                                    onClick: () => console.info('download actions as JSON'),
                                },
                            ]}
                        />
                    </TransactionDetail.Root>
                </Dialog.Root>
            </>
        );
    },
};

export default meta;
