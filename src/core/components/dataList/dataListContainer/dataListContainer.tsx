import classNames from 'classnames';
import { Children, useEffect, useMemo, type ComponentProps, type ReactElement } from 'react';
import { CardEmptyState } from '../../cards';
import type { IEmptyStateProps } from '../../states';
import { useDataListContext } from '../dataListContext';
import { DataListContainerSkeletonLoader } from './dataListContainerSkeletonLoader';

export interface IDataListContainerState
    extends Pick<
        IEmptyStateProps,
        'heading' | 'description' | 'objectIllustration' | 'isStacked' | 'primaryButton' | 'secondaryButton'
    > {}

export interface IDataListContainerProps extends ComponentProps<'div'> {
    /**
     * Skeleton element displayed when the DataList container state is set to loading.
     */
    SkeletonElement?: React.FC;
    /**
     * Error state displayed when the data list status is set to error.
     */
    errorState?: IDataListContainerState;
    /**
     * Empty state displayed the the data list has no elements to render.
     */
    emptyState?: IDataListContainerState;
    /**
     * Empty state displayed the the data list has no elements to render for the current applied filters.
     */
    emptyFilteredState?: IDataListContainerState;
    /**
     * Classes applied only when displaying the DataListItem components. To be used to apply custom layouts to the
     * children components without affecting the empty/error state layouts.
     */
    layoutClassName?: string;
}

export const DataListContainer: React.FC<IDataListContainerProps> = (props) => {
    const {
        children,
        className,
        SkeletonElement,
        errorState,
        emptyState,
        emptyFilteredState,
        layoutClassName,
        ...otherProps
    } = props;

    const { state, pageSize, currentPage, setChildrenItemCount } = useDataListContext();

    const processedChildren = Children.toArray(children) as ReactElement[];
    const childrenItemCount = processedChildren.length;

    const SkeletonLoader = SkeletonElement ?? DataListContainerSkeletonLoader;
    const loadingItems = [...Array<number>(pageSize)];

    const paginatedChildren = useMemo(
        () => processedChildren.slice(0, pageSize * (currentPage + 1)),
        [processedChildren, pageSize, currentPage],
    );

    // Display loading elements on initial-loading state or loading state with no elements being currently rendered
    // (e.g. on filter reset while being on empty state)
    const displayLoadingElements = state === 'initialLoading' || (state === 'loading' && childrenItemCount === 0);
    const displayItems =
        state === 'fetchingNextPage' || state === 'idle' || state === 'loading' || state === 'filtered';

    const isError = state === 'error';
    const isEmpty = state === 'idle' && childrenItemCount === 0;
    const isEmptyFiltered = state === 'filtered' && childrenItemCount === 0;

    const applyLayoutClassName = !isError && !isEmpty && !isEmptyFiltered;

    useEffect(() => {
        setChildrenItemCount(childrenItemCount);
    }, [setChildrenItemCount, childrenItemCount]);

    return (
        <div
            className={classNames('flex flex-col gap-2', applyLayoutClassName && layoutClassName, className)}
            aria-busy={displayLoadingElements}
            {...otherProps}
        >
            {displayLoadingElements && loadingItems.map((_value, index) => <SkeletonLoader key={index} />)}
            {isError && errorState != null && (
                <CardEmptyState
                    isStacked={errorState.isStacked}
                    objectIllustration={errorState.objectIllustration ?? { object: 'ERROR' }}
                    {...errorState}
                />
            )}
            {isEmpty && emptyState != null && (
                <CardEmptyState
                    isStacked={emptyState.isStacked}
                    objectIllustration={emptyState.objectIllustration ?? { object: 'ERROR' }}
                    {...emptyState}
                />
            )}
            {isEmptyFiltered && emptyFilteredState != null && (
                <CardEmptyState
                    isStacked={emptyFilteredState.isStacked}
                    objectIllustration={emptyFilteredState.objectIllustration ?? { object: 'NOT_FOUND' }}
                    {...emptyFilteredState}
                />
            )}
            {displayItems && paginatedChildren}
        </div>
    );
};
