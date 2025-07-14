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
            <StateSkeletonBar width="50%" responsiveSize={{ md: 'lg' }} />
            <StateSkeletonBar width="75%" responsiveSize={{ md: 'lg' }} />
        </DataList.Item>
    );
};
