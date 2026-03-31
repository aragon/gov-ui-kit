import * as blockies from 'blockies-ts';
import type React from 'react';
import type { Address } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';
import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi';
import { Avatar, type IAvatarProps, ssrUtils } from '../../../../core';
import type { IWeb3ComponentProps } from '../../../types';
import { addressUtils, ensUtils } from '../../../utils';

export interface IMemberAvatarProps extends Omit<IAvatarProps, 'fallback'>, IWeb3ComponentProps {
    /**
     * ENS name of the user to lookup avatar src.
     */
    ensName?: string;
    /**
     * 0x address of the user to look up ENS name and avatar src.
     */
    address?: string;
    /**
     * Direct URL src of the user avatar image to be rendered.
     */
    avatarSrc?: string;
}

export const MemberAvatar: React.FC<IMemberAvatarProps> = (props) => {
    const { ensName, address, avatarSrc, chainId = mainnet.id, wagmiConfig, ...otherProps } = props;

    const isValidAddress = addressUtils.isAddress(address);
    const isValidENSName = ensUtils.isEnsName(ensName);

    const { data: ensAddressData, isLoading: addressLoading } = useEnsAddress({
        name: ensName,
        query: { enabled: isValidENSName && !isValidAddress && avatarSrc == null },
        chainId,
        config: wagmiConfig,
    });
    const resolvedAddress = isValidAddress ? address : ensAddressData;

    const { data: ensNameData, isLoading: nameLoading } = useEnsName({
        address: resolvedAddress as Address,
        query: { enabled: resolvedAddress != null && avatarSrc == null },
        chainId,
        config: wagmiConfig,
    });
    const resolvedName = isValidENSName ? ensName : ensNameData;

    const { data: ensAvatarData, isLoading: avatarLoading } = useEnsAvatar({
        name: resolvedName ? normalize(resolvedName) : undefined,
        query: { enabled: resolvedName != null && avatarSrc == null },
        chainId,
        config: wagmiConfig,
    });
    const ensMetadataAvatarSrc =
        resolvedName == null ? undefined : `https://metadata.ens.domains/mainnet/avatar/${normalize(resolvedName)}`;
    const resolvedAvatarSrc = avatarSrc ?? ensAvatarData ?? ensMetadataAvatarSrc;

    const blockiesSrc =
        resolvedAddress && !ssrUtils.isServer()
            ? blockies.create({ seed: addressUtils.getChecksum(resolvedAddress), scale: 8, size: 8 }).toDataURL()
            : undefined;

    const isLoading = avatarLoading || nameLoading || addressLoading;

    return (
        <Avatar
            fallback={
                blockiesSrc && !isLoading ? (
                    <img alt="Blockies avatar" className="size-full" height={32} src={blockiesSrc} width={32} />
                ) : undefined
            }
            src={resolvedAvatarSrc}
            {...otherProps}
        />
    );
};
