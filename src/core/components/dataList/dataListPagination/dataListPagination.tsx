import classNames from 'classnames';
import type { ComponentProps } from 'react';
import { Button } from '../../button';
import { useGukCoreContext } from '../../gukCoreProvider';
import { IconType } from '../../icon';
import { Progress } from '../../progress';
import { useDataListContext } from '../dataListContext';

export interface IDataListPaginationProps extends ComponentProps<'div'> {}

export const DataListPagination: React.FC<IDataListPaginationProps> = (props) => {
    const { className, ...otherProps } = props;

    const {
        state,
        pageSize,
        currentPage,
        itemsCount = 0,
        childrenItemCount,
        handleLoadMore,
        entityLabel,
    } = useDataListContext();

    const { copy } = useGukCoreContext();

    const currentlyDisplayed = Math.min(pageSize * (currentPage + 1), childrenItemCount);

    const progressValue = itemsCount > 0 ? (currentlyDisplayed * 100) / itemsCount : 0;
    const hasMore = currentlyDisplayed < itemsCount;

    if (state === 'initialLoading' || state === 'error' || currentlyDisplayed === 0) {
        return null;
    }

    return (
        <div className={classNames('flex flex-row items-center gap-4 md:gap-6', className)} {...otherProps}>
            <Button
                size="sm"
                responsiveSize={{ md: 'md' }}
                variant="tertiary"
                iconRight={IconType.CHEVRON_DOWN}
                className="shrink-0"
                onClick={() => handleLoadMore(currentPage + 1)}
                disabled={!hasMore}
                isLoading={state === 'fetchingNextPage'}
            >
                {copy.dataListPagination.more}
            </Button>
            {itemsCount > 0 && (
                <>
                    <Progress value={progressValue} size="sm" responsiveSize={{ md: 'md' }} />
                    <p className="shrink-0 text-base font-normal leading-tight text-neutral-500">
                        <span className="text-neutral-800">{currentlyDisplayed} </span>
                        <span>
                            {copy.dataListPagination.outOf({
                                total: itemsCount,
                                entityLabel,
                            })}
                        </span>
                    </p>
                </>
            )}
        </div>
    );
};
