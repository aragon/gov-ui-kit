import { useCallback } from 'react';
import { useChains } from 'wagmi';
import type { IBuildEntityUrlParams, IUseBlockExplorerParams, IUseBlockExplorerReturn } from './useBlockExplorer.api';

export const useBlockExplorer = (params?: IUseBlockExplorerParams): IUseBlockExplorerReturn => {
    const { chains, chainId: hookChainId } = params ?? {};

    const globalChains = useChains();

    const getBlockExplorer = useCallback(
        (chainId?: number) => {
            const processedChains = chains ?? globalChains;
            const processedChainId = chainId ?? hookChainId;

            const chainDefinitions = processedChainId
                ? processedChains.find((chain) => chain.id === processedChainId)
                : processedChains[0];

            return chainDefinitions?.blockExplorers?.default;
        },
        [chains, globalChains, hookChainId],
    );

    const buildEntityUrl = useCallback(
        ({ type, chainId, id }: IBuildEntityUrlParams) => {
            const blockExplorer = getBlockExplorer(chainId ?? hookChainId);
            const baseUrl = blockExplorer?.url;

            return baseUrl != null && id != null ? `${baseUrl}/${type}/${id}` : undefined;
        },
        [getBlockExplorer, hookChainId],
    );

    const blockExplorer = getBlockExplorer(hookChainId);

    return { blockExplorer, getBlockExplorer, buildEntityUrl };
};
