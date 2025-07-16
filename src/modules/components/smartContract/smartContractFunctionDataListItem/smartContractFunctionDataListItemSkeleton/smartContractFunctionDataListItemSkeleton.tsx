import classNames from 'classnames';
import { DataList, type IDataListItemProps } from '../../../../../core';
import { SmartContractFunctionDataListItemSkeletonContent } from './smartContractFunctionDataListItemSkeletonContent';

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
            <SmartContractFunctionDataListItemSkeletonContent />
        </DataList.Item>
    );
};
