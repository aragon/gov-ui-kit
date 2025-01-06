import { render, screen, waitFor } from '@testing-library/react';
import { DateFormat, formatterUtils, NumberFormat } from '../../../../../core';
import * as useBlockExplorer from '../../../../hooks';
import { TransactionDataListItemStructure } from './transactionDataListItemStructure';
import {
    TransactionStatus,
    TransactionType,
    type ITransactionDataListItemProps,
} from './transactionDataListItemStructure.api';

describe('<TransactionDataListItem.Structure /> component', () => {
    const useBlockExplorerSpy = jest.spyOn(useBlockExplorer, 'useBlockExplorer');

    beforeEach(() => {
        useBlockExplorerSpy.mockReturnValue({
            buildEntityUrl: jest.fn(),
            getBlockExplorer: jest.fn(),
            blockExplorer: undefined,
        });
    });

    afterEach(() => {
        useBlockExplorerSpy.mockReset();
    });

    const createTestComponent = (props?: Partial<ITransactionDataListItemProps>) => {
        const defaultProps: ITransactionDataListItemProps = {
            chainId: 1,
            tokenSymbol: 'ETH',
            date: '2023-01-01T00:00:00Z',
            ...props,
        };

        return <TransactionDataListItemStructure {...defaultProps} />;
    };

    it('renders the transaction type', () => {
        const type = TransactionType.ACTION;
        render(createTestComponent({ type }));
        const transactionTypeHeading = screen.getByText('Smart contract action');
        expect(transactionTypeHeading).toBeInTheDocument();
    });

    it('renders the token value and symbol in a deposit', () => {
        const tokenSymbol = 'ETH';
        const tokenAmount = 10;
        const type = TransactionType.DEPOSIT;
        render(createTestComponent({ tokenSymbol, tokenAmount, type }));
        const tokenPrintout = screen.getByText('10 ETH');
        expect(tokenPrintout).toBeInTheDocument();
    });

    it('renders the formatted USD price of the transaction', () => {
        const amountUsd = '123.21';
        const tokenAmount = 10;
        const type = TransactionType.DEPOSIT;
        const usdPrice = formatterUtils.formatNumber(amountUsd, {
            format: NumberFormat.FIAT_TOTAL_SHORT,
        })!;

        render(createTestComponent({ amountUsd, tokenAmount, type }));
        const formattedUsdPrice = screen.getByText(usdPrice);
        expect(formattedUsdPrice).toBeInTheDocument();
    });

    it('renders a failed transaction indicator alongside the transaction type', () => {
        render(createTestComponent({ type: TransactionType.DEPOSIT, status: TransactionStatus.FAILED }));
        const failedTransactionText = screen.getByText('Deposit');
        expect(failedTransactionText).toBeInTheDocument();
        const closeIcon = screen.getByTestId('CLOSE');
        expect(closeIcon).toBeInTheDocument();
    });

    it('renders the provided date correctly', () => {
        const date = '2000-01-01T00:00:00Z';
        render(createTestComponent({ date }));
        const formattedDate = formatterUtils.formatDate(date, { format: DateFormat.YEAR_MONTH_DAY_TIME })!;
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    it('renders with the correct block explorer URL', async () => {
        const chainId = 1;
        const hash = '0x123';
        useBlockExplorerSpy.mockReturnValue({
            buildEntityUrl: () => 'https://etherscan.io/tx/0x123',
            getBlockExplorer: jest.fn(),
            blockExplorer: undefined,
        });

        render(createTestComponent({ chainId, hash }));

        await waitFor(() => {
            const linkElement = screen.getByRole<HTMLAnchorElement>('link');
            expect(linkElement).toHaveAttribute('href', 'https://etherscan.io/tx/0x123');
        });
    });
});
