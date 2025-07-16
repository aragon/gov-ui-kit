import { StateSkeletonBar } from '../../../../../core';

export interface ISmartContractFunctionDataListItemSkeletonContentProps {}

export const SmartContractFunctionDataListItemSkeletonContent: React.FC<
    ISmartContractFunctionDataListItemSkeletonContentProps
> = () => {
    return (
        <>
            <div className="flex w-1/2 md:w-1/3">
                <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="100%" />
            </div>
            <div className="flex w-3/4 gap-x-2 md:w-1/2">
                <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="50%" />
                <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="50%" />
            </div>
        </>
    );
};
