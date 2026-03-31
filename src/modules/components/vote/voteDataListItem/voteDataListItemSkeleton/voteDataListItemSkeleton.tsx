import { DataList, type IDataListItemProps, StateSkeletonBar, StateSkeletonCircular } from '../../../../../core';

export type IVoteDataListItemSkeletonProps = IDataListItemProps;

export const VoteDataListItemSkeleton: React.FC<IVoteDataListItemSkeletonProps> = (props) => {
    const { ...otherProps } = props;

    return (
        <DataList.Item
            aria-busy="true"
            aria-label="loading"
            className="flex min-h-[66px] items-center gap-x-3 py-1 md:min-h-[87px] md:gap-x-4 md:py-0.5"
            tabIndex={0}
            {...otherProps}
        >
            <StateSkeletonCircular responsiveSize={{ md: 'md' }} size="sm" />
            <div className="flex w-full flex-col justify-center gap-y-1 md:gap-y-1.5">
                <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="60%" />
                <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="40%" />
            </div>
            <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="20%" />
        </DataList.Item>
    );
};
