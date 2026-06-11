import { render, screen } from '@testing-library/react';
import * as useBlockExplorer from '../../../hooks';
import { addressUtils } from '../../../utils';
import { TransactionDetailSummary } from './transactionDetailSummary';
import type { ITransactionDetailSummaryProps } from './transactionDetailSummary.api';

describe('<TransactionDetailSummary /> component', () => {
    const useBlockExplorerSpy = jest.spyOn(useBlockExplorer, 'useBlockExplorer');

    beforeEach(() => {
        useBlockExplorerSpy.mockReturnValue({
            buildEntityUrl: jest.fn(({ id }: { id: string }) => `https://etherscan.io/${id}`),
        } as unknown as useBlockExplorer.IUseBlockExplorerReturn);
    });

    afterEach(() => {
        useBlockExplorerSpy.mockReset();
    });

    const createTestComponent = (props?: Partial<ITransactionDetailSummaryProps>) => {
        const defaultProps: ITransactionDetailSummaryProps = {
            chainId: 1,
            executedBy: { address: '0x1234567890123456789012345678901234561234' },
            totalActions: 5,
            transactionHash: '0x9aaa00000000000000000000000000000000000000000000000000000000a08c',
            date: '2023-01-01T00:00:00Z',
            ...props,
        };

        return <TransactionDetailSummary {...defaultProps} />;
    };

    it('renders the static rows', () => {
        render(createTestComponent());
        expect(screen.getByText('Executed by')).toBeInTheDocument();
        expect(screen.getByText('Total actions')).toBeInTheDocument();
        expect(screen.getByText('Transaction')).toBeInTheDocument();
        expect(screen.getByText('Executed on')).toBeInTheDocument();
    });

    it('renders the total actions count', () => {
        render(createTestComponent({ totalActions: 7 }));
        expect(screen.getByText('7')).toBeInTheDocument();
    });

    it('renders the proposal row only when a proposal id is provided', () => {
        const { rerender } = render(createTestComponent());
        expect(screen.queryByText('Proposal')).not.toBeInTheDocument();

        rerender(createTestComponent({ proposalId: 'CRE-54' }));
        expect(screen.getByText('Proposal')).toBeInTheDocument();
        expect(screen.getByText('CRE-54')).toBeInTheDocument();
    });

    it('renders an executor with only an address as a truncated explorer link', () => {
        const address = '0x1234567890123456789012345678901234561234';
        render(createTestComponent({ executedBy: { address } }));
        const link = screen.getByRole('link', { name: new RegExp(addressUtils.truncateAddress(address)) });
        expect(link).toHaveAttribute('href', `https://etherscan.io/${address}`);
    });

    it('renders an active-process executor with its label and helptext', () => {
        const address = '0x1234567890123456789012345678901234561234';
        render(
            createTestComponent({
                executedBy: { label: 'Core', helptext: 'SPP v1.3', address, href: '/processes/core' },
            }),
        );
        expect(screen.getByText('Core')).toBeInTheDocument();
        expect(screen.getByText('SPP v1.3')).toBeInTheDocument();
        expect(screen.queryByText(addressUtils.truncateAddress(address))).not.toBeInTheDocument();
    });

    it('links the executor label to the in-app href when provided, taking precedence over the explorer link', () => {
        render(createTestComponent({ executedBy: { label: 'Core', href: '/processes/core' } }));
        expect(screen.getByRole('link', { name: 'Core' })).toHaveAttribute('href', '/processes/core');
    });

    it('hides the helptext when not provided', () => {
        render(createTestComponent({ executedBy: { address: '0x1234567890123456789012345678901234561234' } }));
        expect(screen.queryByText('SPP v1.3')).not.toBeInTheDocument();
    });

    it('renders the truncated transaction hash with an explorer link', () => {
        const transactionHash = '0x9aaa00000000000000000000000000000000000000000000000000000000a08c' as const;
        render(createTestComponent({ transactionHash }));
        const link = screen.getByRole('link', { name: new RegExp(addressUtils.truncateHash(transactionHash)) });
        expect(link).toHaveAttribute('href', `https://etherscan.io/${transactionHash}`);
    });
});
