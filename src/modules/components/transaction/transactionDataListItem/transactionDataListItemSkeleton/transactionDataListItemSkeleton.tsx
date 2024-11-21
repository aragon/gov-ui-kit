import classNames from 'classnames';
import { DataList, StateSkeletonBar, StateSkeletonCircular, type IDataListItemProps } from '../../../../../core';

export type ITransactionDataListItemSkeletonProps = IDataListItemProps;

export const TransactionDataListItemSkeleton: React.FC<ITransactionDataListItemSkeletonProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <DataList.Item
            tabIndex={0}
            aria-busy="true"
            aria-label="loading"
            className={classNames(
                'flex min-h-[4.21875rem] w-full items-center justify-between gap-x-3 border border-neutral-0 py-4 md:min-h-[5.53125rem]',
                className,
            )}
            {...otherProps}
        >
            <StateSkeletonCircular size="sm" responsiveSize={{ md: 'md' }} />
            <div className="flex w-full items-center gap-x-3 md:gap-x-4">
                <div className="flex w-full flex-col items-start gap-y-1 md:w-3/4">
                    <StateSkeletonBar width="100%" responsiveSize={{ md: 'xl' }} />
                    <StateSkeletonBar width="50%" responsiveSize={{ md: 'lg' }} />
                </div>
            </div>

            <div className="flex w-3/4 flex-col items-end gap-y-1 md:w-1/3">
                <StateSkeletonBar width="70%" responsiveSize={{ md: 'xl' }} />
                <StateSkeletonBar width="50%" responsiveSize={{ md: 'lg' }} />
            </div>
        </DataList.Item>
    );
};
