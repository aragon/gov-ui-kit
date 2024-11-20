import { DataList, StateSkeletonBar, type IDataListItemProps } from '../../../../../core';

export type IVoteProposalDataListItemSkeletonProps = IDataListItemProps;

export const VoteProposalDataListItemSkeleton: React.FC<IVoteProposalDataListItemSkeletonProps> = (props) => {
    const { ...otherProps } = props;

    return (
        <DataList.Item tabIndex={0} aria-busy="true" aria-label="loading" {...otherProps}>
            <div className="flex min-h-[70px] items-center gap-x-3 py-1 md:min-h-[94.5px] md:gap-x-4 md:py-0.5">
                <div className="flex w-full flex-col gap-y-1 md:gap-y-1.5">
                    <StateSkeletonBar width="60%" responsiveSize={{ md: 'lg' }} />
                    <div className="flex w-full gap-x-1">
                        <StateSkeletonBar width="8%" responsiveSize={{ md: 'lg' }} />
                        <StateSkeletonBar width="8%" responsiveSize={{ md: 'lg' }} />
                        <StateSkeletonBar width="10%" responsiveSize={{ md: 'lg' }} className="ml-5" />
                    </div>
                </div>
            </div>
        </DataList.Item>
    );
};
