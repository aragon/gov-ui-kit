import { render, screen } from '@testing-library/react';
import { DateFormat, formatterUtils, IconType, NumberFormat } from '../../../../../core';
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
        } as unknown as useBlockExplorer.IUseBlockExplorerReturn);
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

    it('renders the transaction type heading', () => {
        const type = TransactionType.ACTION;
        render(createTestComponent({ type }));
        expect(screen.getByText('Smart contract action')).toBeInTheDocument();
    });

    it('renders the token value and symbol for a deposit transaction', () => {
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
        const usdPrice = formatterUtils.formatNumber(amountUsd, { format: NumberFormat.FIAT_TOTAL_SHORT })!;
        render(createTestComponent({ amountUsd, tokenAmount, type }));
        expect(screen.getByText(usdPrice)).toBeInTheDocument();
    });

    it('renders a failed icon when transaction is failed', () => {
        const status = TransactionStatus.FAILED;
        render(createTestComponent({ status }));
        expect(screen.getByTestId('CLOSE')).toBeInTheDocument();
    });

    it('renders the related transaction type icon when transaction is successful', () => {
        const status = TransactionStatus.SUCCESS;
        const type = TransactionType.DEPOSIT;
        render(createTestComponent({ status, type }));
        expect(screen.getByTestId(IconType.DEPOSIT)).toBeInTheDocument();
    });

    it('renders the provided date correctly', () => {
        const date = '2000-01-01T00:00:00Z';
        render(createTestComponent({ date }));
        const formattedDate = formatterUtils.formatDate(date, { format: DateFormat.YEAR_MONTH_DAY_TIME })!;
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    it('renders with the correct block explorer URL when href property is not defined', () => {
        const chainId = 1;
        const hash = '0x123';
        const explorerUrl = 'https://etherscan.io/tx/0x123';
        useBlockExplorerSpy.mockReturnValue({
            buildEntityUrl: () => explorerUrl,
        } as unknown as useBlockExplorer.IUseBlockExplorerReturn);
        render(createTestComponent({ chainId, hash }));
        expect(screen.getByRole('link')).toHaveAttribute('href', 'https://etherscan.io/tx/0x123');
    });

    it('does not override href property when defined', () => {
        const href = 'https://custom.com/0x123';
        render(createTestComponent({ href }));
        expect(screen.getByRole('link')).toHaveAttribute('href', href);
    });

    it('does not render the formatted USD price of the transaction when hideValue flag is set', () => {
        const amountUsd = '123.21';
        const tokenAmount = 10;
        const type = TransactionType.DEPOSIT;
        const usdPrice = formatterUtils.formatNumber(amountUsd, { format: NumberFormat.FIAT_TOTAL_SHORT })!;
        render(createTestComponent({ amountUsd, tokenAmount, type, hideValue: true }));
        expect(screen.queryByText(usdPrice)).not.toBeInTheDocument();
    });
});
