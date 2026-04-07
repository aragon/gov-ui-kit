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
                className="shrink-0"
                disabled={!hasMore}
                iconRight={IconType.CHEVRON_DOWN}
                isLoading={state === 'fetchingNextPage'}
                onClick={() => handleLoadMore(currentPage + 1)}
                responsiveSize={{ md: 'md' }}
                size="sm"
                variant="tertiary"
            >
                {copy.dataListPagination.more}
            </Button>
            {itemsCount > 0 && (
                <>
                    <Progress
                        responsiveSize={{ md: 'md' }}
                        size="sm"
                        value={progressValue}
                        variant={hasMore ? 'primary' : 'neutral'}
                    />
                    <p className="shrink-0 font-normal text-base text-neutral-500 leading-tight">
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
