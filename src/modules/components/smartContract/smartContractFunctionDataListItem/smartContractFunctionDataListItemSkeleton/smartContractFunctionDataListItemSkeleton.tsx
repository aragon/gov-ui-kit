import classNames from 'classnames';
import { DataList, StateSkeletonBar, type IDataListItemProps } from '../../../../../core';

export type ISmartContractFunctionDataListItemSkeletonProps = IDataListItemProps & {
    /**
     * Flag to determine whether or not the item is a child of another component so we can apply the correct styles and remove accessibility attributes.
     */
    asChild?: boolean;
};

export const SmartContractFunctionDataListItemSkeleton: React.FC<ISmartContractFunctionDataListItemSkeletonProps> = (
    props,
) => {
    const { className, asChild, ...otherProps } = props;

    return (
        <DataList.Item
            tabIndex={!asChild ? 0 : undefined}
            aria-busy={!asChild ? true : undefined}
            aria-label={!asChild ? 'loading' : undefined}
            className={classNames(
                'flex w-full flex-col gap-3 py-4',
                { 'min-h-[67.5px] md:min-h-[88.5px]': !asChild },
                { 'min-h-[35.5px] border-none !p-0 shadow-none md:min-h-[56.5px]': asChild },
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
