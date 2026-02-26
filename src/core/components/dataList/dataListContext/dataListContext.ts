import { createContext, useContext } from 'react';
import type { IDataListRootProps } from '../dataListRoot';

export interface IDataListContext
    extends Required<Pick<IDataListRootProps, 'pageSize'>>,
        Pick<IDataListRootProps, 'itemsCount' | 'state' | 'entityLabel'> {
    /**
     * Total number of list item children.
     */
    childrenItemCount: number;
    /**
     * Callback to update the total number of list item children.
     */
    setChildrenItemCount: (count: number) => void;
    /**
     * Current page being rendered.
     */
    currentPage: number;
    /**
     * Callback called to load more items.
     */
    handleLoadMore: (newPage: number) => void;
}

export const dataListContext = createContext<IDataListContext | null>(null);

export const DataListContextProvider = dataListContext.Provider;

export const useDataListContext = (): IDataListContext => {
    const values = useContext(dataListContext);

    if (values === null) {
        throw new Error('useDataListContext: the hook must be used inside a DataListContextProvider to work property.');
    }

    return values;
};
