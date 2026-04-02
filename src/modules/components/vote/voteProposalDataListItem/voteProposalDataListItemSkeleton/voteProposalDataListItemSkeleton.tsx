import { DataList, type IDataListItemProps, StateSkeletonBar } from '../../../../../core';

export type IVoteProposalDataListItemSkeletonProps = IDataListItemProps;

export const VoteProposalDataListItemSkeleton: React.FC<IVoteProposalDataListItemSkeletonProps> = (props) => {
    const { ...otherProps } = props;

    return (
        <DataList.Item
            aria-busy="true"
            aria-label="loading"
            className="flex min-h-[68px] items-center gap-x-3 py-1 md:min-h-[93px] md:gap-x-4 md:py-0.5"
            tabIndex={0}
            {...otherProps}
        >
            <div className="flex w-full flex-col gap-y-1 md:gap-y-1.5">
                <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="60%" />
                <div className="flex w-full gap-x-1">
                    <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="8%" />
                    <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="8%" />
                    <StateSkeletonBar className="ml-5" responsiveSize={{ md: 'lg' }} width="10%" />
                </div>
            </div>
        </DataList.Item>
    );
};
