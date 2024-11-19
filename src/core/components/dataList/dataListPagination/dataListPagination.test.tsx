import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DataListContextProvider, type IDataListContext } from '../dataListContext';
import { dataListTestUtils } from '../dataListTestUtils';
import { DataListPagination, type IDataListPaginationProps } from './dataListPagination';

describe('<DataList.Pagination /> component', () => {
    const createTestComponent = (values?: {
        props?: Partial<IDataListPaginationProps>;
        context?: Partial<IDataListContext>;
    }) => {
        const completeProps: IDataListPaginationProps = {
            ...values?.props,
        };

        return (
            <DataListContextProvider value={dataListTestUtils.generateContextValues(values?.context)}>
                <DataListPagination {...completeProps} />
            </DataListContextProvider>
        );
    };

    it('renders a load more button when state is idle and data list has elements to render', () => {
        const context = { state: 'idle' as const, childrenItemCount: 10 };
        render(createTestComponent({ context }));
        expect(screen.getByRole('button', { name: 'More' })).toBeInTheDocument();
    });

    it('renders nothing on initialLoading state', () => {
        const context = { state: 'initialLoading' as const, childrenItemCount: 3 };
        render(createTestComponent({ context }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders nothing on error state', () => {
        const context = { state: 'error' as const, childrenItemCount: 3 };
        render(createTestComponent({ context }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders nothing when data list has not elements to render', () => {
        const context = { state: 'idle' as const, childrenItemCount: 0 };
        render(createTestComponent({ context }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders a progress bar and an info text regarding current elements when itemsCount is set and greater than 0', () => {
        const context = { state: 'idle' as const, childrenItemCount: 2, pageSize: 5, itemsCount: 212 };
        render(createTestComponent({ context }));
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(screen.getByText(context.childrenItemCount)).toBeInTheDocument();
        expect(screen.getByText(`of ${context.itemsCount.toString()}`)).toBeInTheDocument();
    });

    it('correctly display the current rendered items for static lists', () => {
        const context = { state: 'idle' as const, currentPage: 0, pageSize: 5, childrenItemCount: 30, itemsCount: 30 };
        render(createTestComponent({ context }));
        expect(screen.getByText((context.currentPage + 1) * context.pageSize)).toBeInTheDocument();
    });

    it('correctly calculates current progress from the current page and total items', () => {
        const context = {
            state: 'idle' as const,
            currentPage: 0,
            pageSize: 10,
            childrenItemCount: 10,
            itemsCount: 100,
        };
        render(createTestComponent({ context }));
        expect(screen.getByRole('progressbar').getAttribute('data-value')).toEqual('10');
    });

    it('calls handleLoadMore callback with next page to load on load-more button click', async () => {
        const user = userEvent.setup();
        const context = {
            state: 'idle' as const,
            childrenItemCount: 50,
            currentPage: 1,
            handleLoadMore: jest.fn(),
            itemsCount: 50,
        };
        render(createTestComponent({ context }));
        await user.click(screen.getByRole('button'));
        expect(context.handleLoadMore).toHaveBeenCalledWith(context.currentPage + 1);
    });

    it('disables the load-more button when there are not elements to load', () => {
        const context = {
            state: 'idle' as const,
            itemsCount: 500,
            pageSize: 100,
            currentPage: 4,
            childrenItemCount: 500,
        };
        render(createTestComponent({ context }));
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('disables the load-more button and renders a loading indicator when fetching the next page', () => {
        const context = {
            state: 'fetchingNextPage' as const,
            pageSize: 6,
            currentPage: 0,
            childrenItemCount: 6,
        };
        render(createTestComponent({ context }));
        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
});
