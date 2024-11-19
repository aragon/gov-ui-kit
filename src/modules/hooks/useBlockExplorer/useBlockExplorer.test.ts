import { renderHook } from '@testing-library/react';
import * as wagmi from 'wagmi';
import { type Chain, mainnet, polygon, sepolia } from 'wagmi/chains';
import { ChainEntityType, useBlockExplorer } from './useBlockExplorer';

describe('useBlockExplorer hook', () => {
    const useChainsSpy = jest.spyOn(wagmi, 'useChains');

    beforeEach(() => {
        useChainsSpy.mockReturnValue([mainnet]);
    });

    afterEach(() => {
        useChainsSpy.mockReset();
    });

    describe('getBlockExplorer', () => {
        it('returns the block explorer definitions for the given chain id from the specified list of chains', () => {
            const chains: [Chain, ...Chain[]] = [mainnet, polygon, sepolia];
            const { result } = renderHook(() => useBlockExplorer({ chains }));
            expect(result.current.getBlockExplorer(polygon.id)).toEqual(polygon.blockExplorers.default);
        });

        it('returns the block explorer definitions for the given chain id from the chains defined on wagmi provider', () => {
            useChainsSpy.mockReturnValue([polygon, sepolia]);
            const { result } = renderHook(() => useBlockExplorer());
            expect(result.current.getBlockExplorer(sepolia.id)).toEqual(sepolia.blockExplorers.default);
        });

        it('returns the block explorer of the first chain in the chains prop when chainId is not defined', () => {
            const chains: [Chain, ...Chain[]] = [mainnet, sepolia, polygon];
            const { result } = renderHook(() => useBlockExplorer({ chains }));
            expect(result.current.getBlockExplorer()).toEqual(chains[0].blockExplorers?.default);
        });

        it('returns the block explorer of the first chain in the wagmi config when chainId and chains are not defined', () => {
            useChainsSpy.mockReturnValue([sepolia, polygon]);
            const { result } = renderHook(() => useBlockExplorer());
            expect(result.current.getBlockExplorer()).toEqual(sepolia.blockExplorers.default);
        });

        it('returns the block explorer of the chain specified on the hook when function chain-id parameter is not specified', () => {
            const chains: [Chain, ...Chain[]] = [mainnet, polygon];
            const { result } = renderHook(() => useBlockExplorer({ chains, chainId: polygon.id }));
            expect(result.current.getBlockExplorer()).toEqual(polygon.blockExplorers.default);
        });

        it('returns the block explorer set to undefined when chain definitions cannot be found for the given chain id', () => {
            const chains: [Chain, ...Chain[]] = [mainnet, polygon];
            const { result } = renderHook(() => useBlockExplorer({ chains }));
            expect(result.current.getBlockExplorer(sepolia.id)).toBeUndefined();
        });

        it('returns the block explorer set to undefined when related chain definitions does not include info about the block explorer', () => {
            const { blockExplorers, ...mainnetWithoutBlockExplorer } = mainnet;
            useChainsSpy.mockReturnValue([mainnetWithoutBlockExplorer]);
            const { result } = renderHook(() => useBlockExplorer());
            expect(result.current.getBlockExplorer(mainnet.id)).toBeUndefined();
        });
    });

    describe('blockExplorer', () => {
        it('returns the block explorer definitions for the given chain id from the specified list of chains', () => {
            const chains: [Chain, ...Chain[]] = [mainnet, polygon, sepolia];
            const { result } = renderHook(() => useBlockExplorer({ chains, chainId: polygon.id }));
            expect(result.current.blockExplorer).toEqual(polygon.blockExplorers.default);
        });
    });

    describe('buildEntityUrl', () => {
        it('generates correct URL for different entity types', () => {
            useChainsSpy.mockReturnValue([mainnet, polygon, sepolia]);

            const { result } = renderHook(() => useBlockExplorer());
            const { buildEntityUrl } = result.current;

            const addressUrl = buildEntityUrl({ type: ChainEntityType.ADDRESS, id: '0x123', chainId: mainnet.id });
            expect(addressUrl).toEqual('https://etherscan.io/address/0x123');

            const tokenUrl = buildEntityUrl({ type: ChainEntityType.TOKEN, id: '0xabc', chainId: polygon.id });
            expect(tokenUrl).toEqual('https://polygonscan.com/token/0xabc');

            const txUrl = buildEntityUrl({ type: ChainEntityType.TRANSACTION, id: '123', chainId: sepolia.id });
            expect(txUrl).toEqual('https://sepolia.etherscan.io/tx/123');
        });

        it('defaults to the chainId parameter set on the hook when chainId function parameter is not set', () => {
            useChainsSpy.mockReturnValue([mainnet, polygon, sepolia]);

            const { result } = renderHook(() => useBlockExplorer({ chainId: sepolia.id }));
            const { buildEntityUrl } = result.current;

            expect(buildEntityUrl({ type: ChainEntityType.TRANSACTION, id: '123' })).toEqual(
                'https://sepolia.etherscan.io/tx/123',
            );
        });

        it('returns undefined when block explorer info is missing', () => {
            useChainsSpy.mockReturnValue([sepolia]);
            const { result } = renderHook(() => useBlockExplorer({ chainId: mainnet.id }));
            expect(result.current.buildEntityUrl({ type: ChainEntityType.ADDRESS, id: '0x123' })).toBeUndefined();
        });

        it('returns undefined when id parameter is missing', () => {
            useChainsSpy.mockReturnValue([mainnet]);
            const { result } = renderHook(() => useBlockExplorer({ chainId: mainnet.id }));
            expect(result.current.buildEntityUrl({ type: ChainEntityType.ADDRESS, id: undefined })).toBeUndefined();
        });
    });
});
