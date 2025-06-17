import { DataListItem } from '../dataListItem';

export interface IDataListContainerSkeletonLoaderProps {}

export const DataListContainerSkeletonLoader: React.FC<IDataListContainerSkeletonLoaderProps> = () => {
    return (
        <DataListItem
            className="flex animate-pulse flex-col gap-3 py-4 md:py-6"
            tabIndex={0}
            aria-busy="true"
            aria-label="loading"
        >
            <div className="h-5 w-1/3 rounded-full bg-neutral-50" />
            <div className="flex flex-col gap-1.5">
                <div className="h-4 grow rounded-full bg-neutral-50" />
                <div className="h-4 w-1/4 rounded-full bg-neutral-50" />
            </div>
            <div className="flex flex-row gap-1">
                <div className="h-4 w-1/5 rounded bg-neutral-50" />
                <div className="h-4 w-1/4 rounded bg-neutral-50" />
            </div>
        </DataListItem>
    );
};
