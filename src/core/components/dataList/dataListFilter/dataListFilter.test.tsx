import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { IconType } from '../../icon';
import { DataListContextProvider, type IDataListContext } from '../dataListContext';
import { dataListTestUtils } from '../dataListTestUtils';
import { DataListFilter, type IDataListFilterProps } from './dataListFilter';

jest.mock('./dataListFilterSort', () => ({
    DataListFilterSort: () => <div data-testid="sort-mock" />,
}));

jest.mock('./dataListFilterStatus', () => ({
    DataListFilterStatus: () => <div data-testid="status-mock" />,
}));

describe('<DataList.Filter /> component', () => {
    const createTestComponent = (values?: {
        props?: Partial<IDataListFilterProps>;
        context?: Partial<IDataListContext>;
    }) => {
        const completeProps: IDataListFilterProps = {
            onSearchValueChange: jest.fn(),
            ...values?.props,
        };

        return (
            <DataListContextProvider value={dataListTestUtils.generateContextValues(values?.context)}>
                <DataListFilter {...completeProps} />
            </DataListContextProvider>
        );
    };

    it('renders a search bar with a search icon', () => {
        render(createTestComponent());
        expect(screen.getByRole('searchbox')).toBeInTheDocument();
        expect(screen.getByTestId(IconType.SEARCH)).toBeInTheDocument();
    });

    it('renders the filter button when the onFilterClick property is defined', () => {
        const props = { onFilterClick: jest.fn() };
        render(createTestComponent({ props }));
        expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument();
    });

    it('renders the data-list sort and status components', () => {
        render(createTestComponent());
        expect(screen.getAllByTestId('sort-mock').length).toBeGreaterThan(0);
        expect(screen.getByTestId('status-mock')).toBeInTheDocument();
    });

    it('calls the onSearchValueChange callback on search value change', async () => {
        const user = userEvent.setup();
        const props = { onSearchValueChange: jest.fn() };
        const value = 't';
        render(createTestComponent({ props }));
        await user.type(screen.getByRole('searchbox'), value);
        expect(props.onSearchValueChange).toHaveBeenCalledWith(value);
    });

    it('correctly displays current search value', () => {
        const props = { searchValue: 'test-value' };
        render(createTestComponent({ props }));
        expect(screen.getByRole('searchbox')).toHaveDisplayValue(props.searchValue);
    });

    it('renders a spinner instead of the seach icon on loading state', () => {
        const context = { state: 'loading' as const };
        render(createTestComponent({ context }));
        expect(screen.queryByTestId(IconType.SEARCH)).not.toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders a clear icon button when searchValue is defined', () => {
        const props = { searchValue: 'test' };
        render(createTestComponent({ props }));
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByTestId(IconType.CLOSE)).toBeInTheDocument();
    });

    it('calls the onSearchValueChange callback with undefined on clear icon click', async () => {
        const user = userEvent.setup();
        const props = { searchValue: 'test', onSearchValueChange: jest.fn() };
        render(createTestComponent({ props }));
        await user.click(screen.getByTestId(IconType.CLOSE));
        expect(props.onSearchValueChange).toHaveBeenCalledWith(undefined);
    });
});
