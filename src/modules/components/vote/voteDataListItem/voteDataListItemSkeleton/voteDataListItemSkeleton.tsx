import { DataList, StateSkeletonBar, StateSkeletonCircular, type IDataListItemProps } from '../../../../../core';

export type IVoteDataListItemSkeletonProps = IDataListItemProps;

export const VoteDataListItemSkeleton: React.FC<IVoteDataListItemSkeletonProps> = (props) => {
    const { ...otherProps } = props;

    return (
        <DataList.Item tabIndex={0} aria-busy="true" aria-label="loading" {...otherProps}>
            <div className="flex h-16 items-center gap-x-3 py-1 md:h-20 md:gap-x-4 md:py-0.5">
                <StateSkeletonCircular responsiveSize={{ md: 'md' }} />
                <div className="flex w-full flex-col gap-y-1 md:gap-y-1.5">
                    <StateSkeletonBar width="60%" responsiveSize={{ md: 'lg' }} />
                    <StateSkeletonBar width="25%" responsiveSize={{ md: 'lg' }} />
                </div>
                <StateSkeletonBar className="max-w-12 shrink-0" responsiveSize={{ md: 'lg' }} />
            </div>
        </DataList.Item>
    );
};
