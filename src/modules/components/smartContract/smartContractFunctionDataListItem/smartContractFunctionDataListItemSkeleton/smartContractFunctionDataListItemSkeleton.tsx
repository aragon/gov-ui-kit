import classNames from 'classnames';
import { DataList, StateSkeletonBar, type IDataListItemProps } from '../../../../../core';

export type ISmartContractFunctionDataListItemSkeletonProps = IDataListItemProps;

export const SmartContractFunctionDataListItemSkeleton: React.FC<ISmartContractFunctionDataListItemSkeletonProps> = (
    props,
) => {
    const { className, ...otherProps } = props;

    return (
        <DataList.Item
            tabIndex={0}
            aria-busy="true"
            aria-label="loading"
            className={classNames(
                'border-neutral-0 flex min-h-[67.5px] w-full flex-col gap-3 py-4 md:min-h-[88.5px]',
                className,
            )}
            {...otherProps}
        >
            <div className="flex w-1/2 md:w-1/3">
                <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="100%" />
            </div>
            <div className="flex w-3/4 gap-x-2 md:w-1/2">
                <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="50%" />
                <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="50%" />
            </div>
        </DataList.Item>
    );
};
