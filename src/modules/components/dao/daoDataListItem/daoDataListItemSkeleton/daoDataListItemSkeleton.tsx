import classNames from 'classnames';
import type React from 'react';
import { DataList, type IDataListItemProps, StateSkeletonBar, StateSkeletonCircular } from '../../../../../core';

export type IDaoDataListItemSkeletonProps = IDataListItemProps;

export const DaoDataListItemSkeleton: React.FC<IDaoDataListItemSkeletonProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <DataList.Item
            tabIndex={0}
            aria-busy="true"
            aria-label="loading"
            className={classNames(
                'flex min-h-[10.84375rem] w-full flex-col justify-center gap-y-3 py-4 md:min-h-[12.9375rem] md:gap-y-4 md:py-6',
                className,
            )}
            {...otherProps}
        >
            <div className="flex w-full justify-between">
                <div className="flex w-2/3 flex-col gap-y-2.5 text-neutral-800">
                    <StateSkeletonBar size="lg" responsiveSize={{ md: 'xl' }} width="100%" />
                    <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="50%" />
                </div>
                <StateSkeletonCircular size="md" responsiveSize={{ md: 'lg' }} />
            </div>
            <div className="flex w-full flex-col gap-y-2">
                <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="100%" />
                <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="85%" />
            </div>
            <div className="flex w-3/4 justify-between text-neutral-400 md:w-1/2">
                <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="50%" />
            </div>
        </DataList.Item>
    );
};
