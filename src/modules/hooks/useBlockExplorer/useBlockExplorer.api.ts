import type { Config } from 'wagmi';

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

export interface IBlockExplorerDefinitions {
    /**
     * Name of the block explorer.
     */
    name: string;
    /**
     * URL of the block explorer.
     */
    url: string;
}

export interface IUseBlockExplorerReturn {
    /**
     * Definitions for the requested block explorer.
     */
    blockExplorer?: IBlockExplorerDefinitions;
    /**
     * Function to retrieve the block explorer from the given chain id. Defaults to the first block explorer of the
     * chain defined on the hook params or on the Wagmi context provider.
     */
    getBlockExplorer: (chainId?: number) => IBlockExplorerDefinitions | undefined;
    /**
     * Function to build the url for the given entity.
     */
    buildEntityUrl: (params: IBuildEntityUrlParams) => string | undefined;
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
