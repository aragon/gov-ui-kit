import { Accordion } from '../../../../../core';
import { SmartContractFunctionDataListItemSkeletonContent } from '../../../smartContract/smartContractFunctionDataListItem';

export const ProposalActionsItemSkeleton = () => (
    <Accordion.Item value="skeleton" className="pointer-events-none" tabIndex={0} aria-busy="true" aria-label="loading">
        <Accordion.ItemHeader>
            <div className="flex size-full h-[48px] flex-col justify-center gap-y-1 md:h-[52.5px] md:gap-y-1.5">
                <SmartContractFunctionDataListItemSkeletonContent />
            </div>
        </Accordion.ItemHeader>
    </Accordion.Item>
);
