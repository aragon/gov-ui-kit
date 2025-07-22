import { Accordion } from '../../../../../core';
import { SmartContractFunctionDataListItem } from '../../../smartContract/smartContractFunctionDataListItem';

export const ProposalActionsItemSkeleton = () => (
    <Accordion.Item value="skeleton" className="pointer-events-none" tabIndex={0} aria-busy="true" aria-label="loading">
        <Accordion.ItemHeader>
            <SmartContractFunctionDataListItem.Skeleton
                asChild={true}
                className="flex size-full h-[48px] flex-col justify-center gap-3 md:h-[52.5px]"
            />
        </Accordion.ItemHeader>
    </Accordion.Item>
);
