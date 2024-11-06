import { DataList, StateSkeletonBar, type IDataListItemProps } from '../../../../../core';

export type IVoteProposalDataListItemSkeletonProps = IDataListItemProps;

export const VoteProposalDataListItemSkeleton: React.FC<IVoteProposalDataListItemSkeletonProps> = (props) => {
    const { ...otherProps } = props;

    return (
        <DataList.Item tabIndex={0} aria-busy="true" aria-label="loading" {...otherProps}>
            <div className="flex h-16 items-center gap-x-3 py-1 md:h-20 md:gap-x-4 md:py-0.5">
                <div className="flex w-full flex-col gap-y-1 md:gap-y-1.5">
                    <StateSkeletonBar width="60%" responsiveSize={{ md: 'lg' }} />
                    <div className="flex w-full gap-x-1 md:gap-x-1.5">
                        <StateSkeletonBar width="8%" responsiveSize={{ md: 'lg' }} />
                        <StateSkeletonBar width="8%" responsiveSize={{ md: 'lg' }} />
                        <StateSkeletonBar width="10%" responsiveSize={{ md: 'lg' }} className="mx-1" />
                    </div>
                </div>
            </div>
        </DataList.Item>
    );
};
