import classNames from 'classnames';
import type React from 'react';
import { DataList, type IDataListItemProps } from '../../../../../core';
import { StateSkeletonBar } from '../../../../../core/components/states/stateSkeletonBar';
import { StateSkeletonCircular } from '../../../../../core/components/states/stateSkeletonCircular';

export type IAssetDataListItemSkeletonProps = IDataListItemProps;

export const AssetDataListItemSkeleton: React.FC<IAssetDataListItemSkeletonProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <DataList.Item
            tabIndex={0}
            aria-busy="true"
            aria-label="loading"
            className={classNames(
                'flex min-h-[70px] w-full items-center gap-x-3 gap-y-4 bg-neutral-0 py-3 md:min-h-[92.5px] md:py-5',
                className,
            )}
            {...otherProps}
        >
            <StateSkeletonCircular responsiveSize={{ md: 'lg' }} />
            <div className="flex w-full justify-between">
                <div className="flex w-full flex-col gap-y-1 md:gap-y-1.5">
                    <StateSkeletonBar className="shrink-0" responsiveSize={{ md: 'lg' }} width="100%" />
                    <div className="flex size-full items-center justify-start md:w-1/2">
                        <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="50%" />
                    </div>
                </div>
                <div className="flex w-full flex-col items-end gap-y-1 md:gap-y-1.5">
                    <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="40%" />
                    <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="33%" />
                </div>
            </div>
        </DataList.Item>
    );
};
