import { render, screen, waitFor } from '@testing-library/react';
import * as blockies from 'blockies-ts';
import * as viem from 'viem';
import { polygon } from 'viem/chains';
import { normalize } from 'viem/ens';
import * as wagmi from 'wagmi';
import { ssrUtils } from '../../../../core';
import { RadixImageMock } from '../../../../core/test';
import { MemberAvatar, type IMemberAvatarProps } from './memberAvatar';

describe('<MemberAvatar /> component', () => {
    const originalGlobalImage = global.Image;

    const useEnsAddressMock = jest.spyOn(wagmi, 'useEnsAddress');
    const useEnsNameMock = jest.spyOn(wagmi, 'useEnsName');
    const useEnsAvatarMock = jest.spyOn(wagmi, 'useEnsAvatar');
    const getAddressMock = jest.spyOn(viem, 'getAddress');
    const blockiesCreateMock = jest.spyOn(blockies, 'create');
    const isServerMock = jest.spyOn(ssrUtils, 'isServer');

    const createTestComponent = (props?: Partial<IMemberAvatarProps>) => {
        const completeProps: IMemberAvatarProps = { ...props };

        return <MemberAvatar {...completeProps} />;
    };

    beforeEach(() => {
        (window.Image as unknown) = RadixImageMock;
    });

    afterEach(() => {
        global.Image = originalGlobalImage;
    });

    beforeEach(() => {
        useEnsAddressMock.mockReturnValue({ data: null, isLoading: false } as wagmi.UseEnsAddressReturnType);
        useEnsNameMock.mockReturnValue({ data: null, isLoading: false } as wagmi.UseEnsNameReturnType);
        useEnsAvatarMock.mockReturnValue({ data: null, isLoading: false } as wagmi.UseEnsAvatarReturnType);
        getAddressMock.mockImplementation((value) => value as viem.Address);
        blockiesCreateMock.mockReturnValue({ toDataURL: () => '' } as HTMLCanvasElement);
    });

    afterEach(() => {
        useEnsAddressMock.mockReset();
        useEnsNameMock.mockReset();
        useEnsAvatarMock.mockReset();
        getAddressMock.mockReset();
        blockiesCreateMock.mockReset();
        isServerMock.mockReset();
    });

    it('displays the avatar set as avatarSrc prop without resolving ens name, address or avatar', async () => {
        const avatarSrc = 'directAvatarUrl';
        render(createTestComponent({ avatarSrc }));

        await waitFor(() => expect(screen.getByRole('img')).toHaveAttribute('src', avatarSrc));
        expect(useEnsAddressMock).toHaveBeenCalledWith(expect.objectContaining({ query: { enabled: false } }));
        expect(useEnsNameMock).toHaveBeenCalledWith(expect.objectContaining({ query: { enabled: false } }));
        expect(useEnsAvatarMock).toHaveBeenCalledWith(expect.objectContaining({ query: { enabled: false } }));
    });

    it('displays avatar for a valid ENS name and call related hooks with correct parameters', async () => {
        const ensName = 'vitalik.eth';
        const expectedAvatarUrl = 'ensAvatarUrl';
        useEnsAvatarMock.mockReturnValue({ data: expectedAvatarUrl, isLoading: false } as wagmi.UseEnsAvatarReturnType);
        render(createTestComponent({ ensName }));

        await waitFor(() => expect(screen.getByRole('img')).toHaveAttribute('src', expectedAvatarUrl));
        expect(useEnsNameMock).toHaveBeenCalledWith(expect.objectContaining({ query: { enabled: false } }));
        expect(useEnsAvatarMock).toHaveBeenCalledWith(expect.objectContaining({ name: normalize(ensName) }));
    });

    it('displays avatar for a valid address and call related hooks with correct parameters', async () => {
        const address = '0x028F5Ca0b3A3A14e44AB8af660B53D1e428457e7';
        const expectedAvatarUrl = 'addressAvatarUrl';
        useEnsAvatarMock.mockReturnValue({ data: expectedAvatarUrl, isLoading: false } as wagmi.UseEnsAvatarReturnType);
        render(createTestComponent({ address }));

        await waitFor(() => expect(screen.getByRole('img')).toHaveAttribute('src', expectedAvatarUrl));
        expect(useEnsNameMock).toHaveBeenCalledWith(expect.objectContaining({ address }));
    });

    it('creates a blockies image and sets it as image fallback when having a valid address', () => {
        const blockiesUrl = 'blockies-src-test';
        blockiesCreateMock.mockReturnValue({ toDataURL: () => blockiesUrl } as HTMLCanvasElement);
        const address = '0x028F5Ca0b3A3A14e44AB8af660B53D1e428457e7';
        render(createTestComponent({ address }));

        expect(blockiesCreateMock).toHaveBeenCalledWith(expect.objectContaining({ seed: address }));
        expect(screen.getByRole('img')).toHaveAttribute('src', blockiesUrl);
    });

    it('does not create a blockies image on server environment', () => {
        const address = '0x028F5Ca0b3A3A14e44AB8af660B53D1e428457e7';
        isServerMock.mockReturnValue(true);
        render(createTestComponent({ address }));
        expect(blockiesCreateMock).not.toHaveBeenCalled();
    });

    it('supports custom chainId and wagmi configurations', () => {
        const chainId = 137;
        const wagmiConfig = { chains: [polygon] } as unknown as wagmi.Config;
        render(createTestComponent({ chainId, wagmiConfig }));
        expect(useEnsNameMock).toHaveBeenCalledWith(expect.objectContaining({ chainId, config: wagmiConfig }));
        expect(useEnsAvatarMock).toHaveBeenCalledWith(expect.objectContaining({ chainId, config: wagmiConfig }));
        expect(useEnsAddressMock).toHaveBeenCalledWith(expect.objectContaining({ chainId, config: wagmiConfig }));
    });
});
