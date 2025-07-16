import { Accordion } from '../../../../../core';
import { SmartContractFunctionDataListItem } from '../../../smartContract/smartContractFunctionDataListItem';

export const ProposalActionsItemSkeleton = () => (
    <Accordion.Item value="skeleton" className="pointer-events-none" tabIndex={0} aria-busy="true" aria-label="loading">
        <Accordion.ItemHeader>
            <SmartContractFunctionDataListItem.Skeleton className="min-h-[48px]! border-none p-0! shadow-none md:min-h-[52.5px]!" />
        </Accordion.ItemHeader>
    </Accordion.Item>
);
