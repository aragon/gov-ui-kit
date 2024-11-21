import classNames from 'classnames';
import { DataList, StateSkeletonBar, StateSkeletonCircular, type IDataListItemProps } from '../../../../../core';

export type IMemberDataListItemSkeletonProps = IDataListItemProps;

export const MemberDataListItemSkeleton: React.FC<IMemberDataListItemSkeletonProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <DataList.Item
            tabIndex={0}
            aria-busy="true"
            aria-label="loading"
            className={classNames(
                'flex min-h-[9.21875rem] flex-col items-start justify-center gap-y-3 bg-neutral-0 py-4 md:min-h-[11.1875rem] md:min-w-44 md:gap-y-4 md:py-6',
                className,
            )}
            {...otherProps}
        >
            <StateSkeletonCircular size="sm" responsiveSize={{ md: 'md' }} />
            <div className="flex w-2/3">
                <StateSkeletonBar size="lg" responsiveSize={{ md: 'xl' }} width="100%" />
            </div>
            <div className="flex w-full flex-col gap-y-2 md:w-5/6 md:gap-y-2.5">
                <StateSkeletonBar width="50%" />
                <StateSkeletonBar width="40%" />
            </div>
        </DataList.Item>
    );
};
