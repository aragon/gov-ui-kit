import classNames from 'classnames';
import type { ComponentProps } from 'react';
import { Button } from '../../button';
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

    const currentlyDisplayed = Math.min(pageSize * (currentPage + 1), childrenItemCount);

    const progressValue = itemsCount > 0 ? (currentlyDisplayed * 100) / itemsCount : 0;
    const hasMore = currentlyDisplayed < itemsCount;

    if (state === 'initialLoading' || state === 'error' || currentlyDisplayed === 0) {
        return null;
    }

    return (
        <div
            className={classNames('flex flex-row items-center gap-4 px-0 md:gap-6 md:px-6', className)}
            {...otherProps}
        >
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
                {/* TODO: apply internationalisation to More label [APP-2627] */}
                More
            </Button>
            {itemsCount > 0 && (
                <>
                    <Progress value={progressValue} size="sm" responsiveSize={{ md: 'md' }} />
                    <p className="shrink-0 text-base font-normal leading-tight text-neutral-500">
                        {/* TODO: apply internationalisation to "OF" label [APP-2627] */}
                        <span className="text-neutral-800">{currentlyDisplayed} </span>
                        <span>
                            of {itemsCount} {entityLabel}
                        </span>
                    </p>
                </>
            )}
        </div>
    );
};
