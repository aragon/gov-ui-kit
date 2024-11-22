import classNames from 'classnames';
import type React from 'react';
import { DataList, StateSkeletonBar, type IDataListItemProps } from '../../../../../core';

export type IProposalDataListItemSkeletonProps = IDataListItemProps;

export const ProposalDataListItemSkeleton: React.FC<IProposalDataListItemSkeletonProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <DataList.Item
            tabIndex={0}
            aria-busy="true"
            aria-label="loading"
            className={classNames(
                'flex min-h-[184.5px] flex-col justify-center gap-y-3 bg-neutral-0 py-4 md:min-h-[221px] md:gap-y-4 md:py-6',
                className,
            )}
            {...otherProps}
        >
            <div className="flex w-full justify-between">
                <StateSkeletonBar size="lg" responsiveSize={{ md: 'xl' }} width="12%" />
                <StateSkeletonBar size="lg" responsiveSize={{ md: 'xl' }} width="24%" />
            </div>
            <div className="flex w-full flex-col gap-y-3">
                <StateSkeletonBar size="xl" width="72%" />
                <div className="flex flex-col gap-y-2 md:gap-y-2">
                    <StateSkeletonBar size="lg" width="100%" />
                    <StateSkeletonBar size="lg" width="64%" />
                </div>
            </div>
            <div className="flex w-full justify-between">
                <StateSkeletonBar size="lg" responsiveSize={{ md: 'xl' }} width="20%" />
                <StateSkeletonBar size="lg" responsiveSize={{ md: 'xl' }} width="16%" />
            </div>
        </DataList.Item>
    );
};
