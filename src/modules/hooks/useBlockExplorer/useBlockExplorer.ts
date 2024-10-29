import { useCallback } from 'react';
import { useChains, type Config } from 'wagmi';

export enum ChainEntityType {
    ADDRESS = 'address',
    TRANSACTION = 'tx',
    TOKEN = 'token',
}

export interface IUseBlockExplorerParams {
    /**
     * Chains definitions to use for returning the block explorer definitions and building the URLs. Defaults to the
     * chains defined on the Wagmi context provider.
     */
    chains?: Config['chains'];
    /**
     * Uses the block explorer definition of the specified Chain ID when set. Defaults to the ID of the first chain on
     * the chains list.
     */
    chainId?: number;
}

export interface IBuildEntityUrlParams {
    /**
     * The type of the entity (e.g. address, transaction, token)
     */
    type: ChainEntityType;
    /**
     * ID of the chain related to the entity. When set, overrides the chainId set as hook parameter.
     */
    chainId?: number;
    /**
     * The ID of the entity (e.g. transaction hash for a transaction)
     */
    id?: string;
}

export const useBlockExplorer = (params?: IUseBlockExplorerParams) => {
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
