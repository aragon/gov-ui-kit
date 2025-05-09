import { Accordion, StateSkeletonBar } from '../../../../../core';

export const ProposalActionsItemSkeleton = () => {
    return (
        <Accordion.Item
            value="skeleton"
            className="pointer-events-none"
            tabIndex={0}
            aria-busy="true"
            aria-label="loading"
        >
            <Accordion.ItemHeader>
                <div className="flex size-full h-[48px] flex-col justify-center gap-y-1 md:h-[52.5px] md:gap-y-1.5">
                    <div className="flex w-1/2 md:w-1/3">
                        <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="100%" />
                    </div>
                    <div className="flex w-3/4 gap-x-2 md:w-1/2">
                        <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="50%" />
                        <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="50%" />
                    </div>
                </div>
            </Accordion.ItemHeader>
        </Accordion.Item>
    );
};
