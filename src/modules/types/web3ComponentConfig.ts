import type { Config } from 'wagmi';

/**
 * Properties for components making RPC requests.
 */
export interface IWeb3ComponentProps {
    /**
     * ID of the chain to use when making RPC requests.
     * @default mainnet.id (1)
     */
    chainId?: number;
    /**
     * Custom Wagmi configurations to use instead of retrieving it from the closest WagmiProvider.
     */
    wagmiConfig?: Config;
}
