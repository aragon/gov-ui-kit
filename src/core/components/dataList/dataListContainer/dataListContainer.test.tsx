import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { DataListContextProvider, type IDataListContext } from '../dataListContext';
import { dataListTestUtils } from '../dataListTestUtils';
import { DataListContainer, type IDataListContainerProps } from './dataListContainer';

describe('<DataList.Container /> component', () => {
    const createTestComponent = (values?: {
        props?: Partial<IDataListContainerProps>;
        context?: Partial<IDataListContext>;
    }) => {
        const completeProps: IDataListContainerProps = { ...values?.props };

        return (
            <DataListContextProvider value={dataListTestUtils.generateContextValues(values?.context)}>
                <DataListContainer {...completeProps} />
            </DataListContextProvider>
        );
    };

    it('renders the children on idle state', () => {
        const children = [<div key="1">test</div>];
        const context = { state: 'idle' as const };
        const props = { children };
        render(createTestComponent({ context, props }));
        expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('renders the children on fetchingNextPage state', () => {
        const children = [<div key="1">fetch-next-page</div>];
        const context = { state: 'fetchingNextPage' as const };
        const props = { children };
        render(createTestComponent({ context, props }));
        expect(screen.getByText('fetch-next-page')).toBeInTheDocument();
    });

    it('renders the children on loading state', () => {
        const children = [<div key="1">loading-state</div>];
        const context = { state: 'loading' as const };
        const props = { children };
        render(createTestComponent({ context, props }));
        expect(screen.getByText('loading-state')).toBeInTheDocument();
    });

    it('renders the children on filtered state', () => {
        const children = [<div key="1">filtered-state</div>];
        const context = { state: 'filtered' as const };
        const props = { children };
        render(createTestComponent({ context, props }));
        expect(screen.getByText('filtered-state')).toBeInTheDocument();
    });

    it('renders the items up to currentPage * pageSize when children count is higher to this amount', () => {
        const pageSize = 20;
        const currentPage = 1;
        const context = { pageSize, currentPage: 1, state: 'idle' as const };

        const children = [...Array<number>(pageSize * 10)].map((_value, key) => <div key={key}>test</div>);
        const props = { children };

        render(createTestComponent({ context, props }));
        expect(screen.getAllByText('test').length).toEqual((currentPage + 1) * pageSize);
    });

    it('updates the childrenItemCount property on the data list context on mount', () => {
        const childrenAmount = 29;
        const children = [...Array<number>(childrenAmount)].map((_value, key) => <div key={key} />);
        const props = { children };

        const setChildrenItemCount = jest.fn();
        const context = { setChildrenItemCount };

        render(createTestComponent({ props, context }));
        expect(setChildrenItemCount).toHaveBeenCalledWith(childrenAmount);
    });

    it('only renders the error feedback when errorState property is defined and state is error', () => {
        const context = { state: 'error' as const };
        const children = [<div key="1">test</div>];
        const props = { errorState: { heading: 'data-list-error' }, children };
        render(createTestComponent({ context, props }));
        expect(screen.getByText(props.errorState.heading)).toBeInTheDocument();
        expect(screen.queryByText('test')).not.toBeInTheDocument();
    });

    it('renders the empty feedback when emptyState property is defined, state is idle and container has no children to render', () => {
        const context = { state: 'idle' as const };
        const children: ReactNode[] = [];
        const props = { emptyState: { heading: 'data-list-empty' }, children };
        render(createTestComponent({ context, props }));
        expect(screen.getByText(props.emptyState.heading)).toBeInTheDocument();
    });

    it('renders the empty filtered feedback when emptyFilteredState property is defined, state is filtered and container has no children to render', () => {
        const context = { state: 'filtered' as const };
        const children: ReactNode[] = [];
        const props = { emptyFilteredState: { heading: 'data-list-empty-filtered' }, children };
        render(createTestComponent({ context, props }));
        expect(screen.getByText(props.emptyFilteredState.heading)).toBeInTheDocument();
    });

    it('renders pageSize loading elements on initialLoading state', () => {
        const pageSize = 7;
        const context = { pageSize, state: 'initialLoading' as const };

        const SkeletonElement = () => <div data-testid="skeleton-loader" />;
        const props = { SkeletonElement };

        render(createTestComponent({ context, props }));
        expect(screen.getAllByTestId('skeleton-loader').length).toEqual(pageSize);
    });

    it('renders the loading elements when state is loading and component has no children to render', () => {
        const context = { state: 'loading' as const };
        const props = { children: [], SkeletonElement: () => <div data-testid="test" /> };
        render(createTestComponent({ context, props }));
        expect(screen.getAllByTestId('test').length).toBeGreaterThan(0);
    });
});
