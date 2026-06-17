import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { Dialog } from '../../../../core';
import { modulesCopy } from '../../../assets';
import * as useBlockExplorer from '../../../hooks';
import { ProposalActions } from '../../proposal';
import { generateProposalAction } from '../../proposal/proposalActions/proposalActionsTestUtils';
import { TransactionDetail } from './index';
import type { ITransactionDetailRootProps } from './transactionDetailRoot';

jest.mock('wagmi', () => ({
    ...jest.requireActual<typeof import('wagmi')>('wagmi'),
    useChains: jest.fn(() => [{ id: 1, nativeCurrency: { symbol: 'ETH' } }]),
}));

describe('<TransactionDetail /> component', () => {
    const useBlockExplorerSpy = jest.spyOn(useBlockExplorer, 'useBlockExplorer');

    beforeEach(() => {
        useBlockExplorerSpy.mockReturnValue({
            buildEntityUrl: jest.fn(({ id }: { id: string }) => `https://etherscan.io/${id}`),
        } as unknown as useBlockExplorer.IUseBlockExplorerReturn);
    });

    afterEach(() => {
        useBlockExplorerSpy.mockReset();
    });

    const renderInDialog = (children: ReactNode, rootProps?: Partial<ITransactionDetailRootProps>) =>
        render(
            <Dialog.Root open={true}>
                <TransactionDetail.Root {...rootProps}>{children}</TransactionDetail.Root>
            </Dialog.Root>,
        );

    it('renders the default "Executed" header title', () => {
        renderInDialog('content');
        expect(screen.getByText('Executed')).toBeInTheDocument();
    });

    it('renders a custom title when provided', () => {
        renderInDialog('content', { title: 'Execution detail' });
        expect(screen.getByText('Execution detail')).toBeInTheDocument();
    });

    it('triggers the onClose callback on close-button click', async () => {
        const user = userEvent.setup();
        const onClose = jest.fn();
        renderInDialog('content', { onClose });
        await user.click(screen.getByRole('button'));
        expect(onClose).toHaveBeenCalled();
    });

    it('renders its children as content', () => {
        renderInDialog(<p>Summary and decoded actions</p>);
        expect(screen.getByText('Summary and decoded actions')).toBeInTheDocument();
    });

    it('forwards content props to the dialog content element', () => {
        renderInDialog(<p>content</p>, { id: 'transaction-detail-content' });
        expect(document.querySelector('#transaction-detail-content')).toBeInTheDocument();
    });

    it('composes with ProposalActions for decoded execution actions', async () => {
        const user = userEvent.setup();
        const actions = [
            generateProposalAction({
                inputData: {
                    function: 'mint',
                    contract: 'GovernanceERC20',
                    parameters: [{ name: 'to', type: 'address', value: '0x1234' }],
                },
            }),
            generateProposalAction({
                inputData: {
                    function: 'setMetadata',
                    contract: 'DAO',
                    parameters: [{ name: '_metadata', type: 'bytes', value: '0x1234' }],
                },
            }),
        ];

        renderInDialog(
            <ProposalActions.Root actionsCount={actions.length}>
                <ProposalActions.Container emptyStateDescription="">
                    {actions.map((action) => (
                        <ProposalActions.Item action={action} key={action.inputData?.function} />
                    ))}
                </ProposalActions.Container>
                <ProposalActions.Footer />
            </ProposalActions.Root>,
        );

        const mintAction = screen.getByRole('button', { name: /mint/i });
        const metadataAction = screen.getByRole('button', { name: /setMetadata/i });
        expect(mintAction).toHaveAttribute('aria-expanded', 'false');
        expect(metadataAction).toHaveAttribute('aria-expanded', 'false');

        await user.click(screen.getByRole('button', { name: modulesCopy.proposalActionsFooter.more }));
        await user.click(screen.getByRole('menuitem', { name: modulesCopy.proposalActionsFooter.expand }));

        expect(mintAction).toHaveAttribute('aria-expanded', 'true');
        expect(metadataAction).toHaveAttribute('aria-expanded', 'true');
    });
});
