import classNames from 'classnames';
import type React from 'react';
import { DataList, type IDataListItemProps, StateSkeletonBar } from '../../../../../core';

export type IProposalDataListItemSkeletonProps = IDataListItemProps;

export const ProposalDataListItemSkeleton: React.FC<IProposalDataListItemSkeletonProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <DataList.Item
            aria-busy="true"
            aria-label="loading"
            className={classNames(
                'flex min-h-[184.5px] flex-col justify-center gap-y-3 bg-neutral-0 py-4 md:min-h-[221px] md:gap-y-4 md:py-6',
                className,
            )}
            tabIndex={0}
            {...otherProps}
        >
            <div className="flex w-full justify-between">
                <StateSkeletonBar responsiveSize={{ md: 'xl' }} size="lg" width="12%" />
                <StateSkeletonBar responsiveSize={{ md: 'xl' }} size="lg" width="24%" />
            </div>
            <div className="flex w-full flex-col gap-y-3">
                <StateSkeletonBar size="xl" width="72%" />
                <div className="flex flex-col gap-y-2 md:gap-y-2">
                    <StateSkeletonBar size="lg" width="100%" />
                    <StateSkeletonBar size="lg" width="64%" />
                </div>
            </div>
            <div className="flex w-full justify-between">
                <StateSkeletonBar responsiveSize={{ md: 'xl' }} size="lg" width="20%" />
                <StateSkeletonBar responsiveSize={{ md: 'xl' }} size="lg" width="16%" />
            </div>
        </DataList.Item>
    );
};
