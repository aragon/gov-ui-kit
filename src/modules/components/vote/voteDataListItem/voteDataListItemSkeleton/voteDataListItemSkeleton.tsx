import { DataList, StateSkeletonBar, StateSkeletonCircular, type IDataListItemProps } from '../../../../../core';

export type IVoteDataListItemSkeletonProps = IDataListItemProps;

export const VoteDataListItemSkeleton: React.FC<IVoteDataListItemSkeletonProps> = (props) => {
    const { ...otherProps } = props;

    return (
        <DataList.Item
            tabIndex={0}
            aria-busy="true"
            aria-label="loading"
            className="flex min-h-[72.5px] items-center gap-x-3 py-1 md:min-h-[88.5px] md:gap-x-4 md:py-0.5"
            {...otherProps}
        >
            <StateSkeletonCircular size="sm" responsiveSize={{ md: 'md' }} />
            <div className="flex w-full flex-col justify-center gap-y-1 md:gap-y-1.5">
                <StateSkeletonBar width="60%" responsiveSize={{ md: 'lg' }} />
                <StateSkeletonBar width="40%" responsiveSize={{ md: 'lg' }} />
            </div>
            <StateSkeletonBar width="20%" responsiveSize={{ md: 'lg' }} />
        </DataList.Item>
    );
};
