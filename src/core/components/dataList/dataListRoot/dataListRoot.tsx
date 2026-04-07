import classNames from 'classnames';
import { type ComponentProps, useCallback, useMemo, useState } from 'react';
import { DataListContextProvider } from '../dataListContext';

/**
 * Different states of the DataList component:
 * - InitialLoading: component is fetching data for the first time and no data has been fetched yet;
 * - Loading: initial data has already been fetched and the user is filtering or sorting the data;
 * - Error: an error has occurred while fetching the data;
 * - Idle: data has been successfully fetched;
 * - Filtered: data has been successfully fetched and one or more filters are applied.
 * - FetchingNextPage: user is loading the next page of the data list;
 */
export type DataListState = 'initialLoading' | 'loading' | 'error' | 'fetchingNextPage' | 'idle' | 'filtered';

export interface IDataListRootProps extends ComponentProps<'div'> {
    /**
     * Total number of items.
     */
    itemsCount?: number;
    /**
     * Number to items to render per page.
     * @default 12
     */
    pageSize?: number;
    /**
     * State of the data list component, @see DataListState.
     * @default idle
     */
    state?: DataListState;
    /**
     * Callback called on load-more button click.
     */
    onLoadMore?: () => void;
    /**
     * Label used for the data list status and pagination.
     */
    entityLabel: string;
}

export const DataListRoot: React.FC<IDataListRootProps> = (props) => {
    const {
        children,
        pageSize = 12,
        itemsCount,
        onLoadMore,
        className,
        state = 'idle',
        entityLabel,
        ...otherProps
    } = props;

    const [childrenItemCount, setChildrenItemCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const handleLoadMore = useCallback(
        (newPage: number) => {
            const currentlyDisplayed = Math.min(pageSize * newPage, itemsCount ?? 0);

            if (childrenItemCount <= currentlyDisplayed) {
                onLoadMore?.();
            }

            setCurrentPage(newPage);
        },
        [childrenItemCount, onLoadMore, pageSize, itemsCount],
    );

    const contextValues = useMemo(
        () => ({
            childrenItemCount,
            setChildrenItemCount,
            pageSize,
            itemsCount,
            currentPage,
            handleLoadMore,
            state,
            entityLabel,
        }),
        [childrenItemCount, pageSize, currentPage, itemsCount, state, handleLoadMore, entityLabel],
    );

    return (
        <DataListContextProvider value={contextValues}>
            <div className={classNames('flex w-full grow flex-col gap-4', className)} {...otherProps}>
                {children}
            </div>
        </DataListContextProvider>
    );
};
