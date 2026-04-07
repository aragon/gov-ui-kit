import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useConnection } from 'wagmi';
import { DataList, formatterUtils, Heading, type IDataListItemProps, NumberFormat, Tag } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { MemberAvatar } from '../../memberAvatar';

export type IMemberDataListItemProps = IDataListItemProps & {
    /**
     * Whether the member is a delegate of current user or not.
     */
    isDelegate?: boolean;
    /**
     * The number of delegations the member has from other members.
     */
    delegationCount?: number;
    /**
     * The total amount of tokens.
     */
    tokenAmount?: number | string;
    /**
     * ENS name of the user.
     */
    ensName?: string;
    /**
     * 0x address of the user.
     */
    address: string;
    /**
     * Direct URL src of the user avatar image to be rendered.
     */
    avatarSrc?: string;
    /**
     * Hide token voting label
     */
    hideLabelTokenVoting?: boolean;
    /**
     * Token Symbol.
     */
    tokenSymbol?: string;
};

export const MemberDataListItemStructure: React.FC<IMemberDataListItemProps> = (props) => {
    const {
        isDelegate,
        delegationCount,
        tokenAmount,
        avatarSrc,
        ensName,
        address,
        tokenSymbol,
        hideLabelTokenVoting,
        className,
        ...otherProps
    } = props;

    const { address: currentUserAddress, isConnected } = useConnection();

    const { copy } = useGukModulesContext();

    // Avoid SSR/CSR hydration mismatches: the connected address is only known on
    // the client, so only show the "You" tag after mount.
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => setHasMounted(true), []);

    const isCurrentUser =
        hasMounted && isConnected && address && addressUtils.isAddressEqual(currentUserAddress, address);

    const resolvedUserHandle = ensName != null && ensName.length > 0 ? ensName : addressUtils.truncateAddress(address);

    const showDelegationOrTokenInformation = delegationCount != null || tokenAmount != null;

    const formattedDelegationCount = formatterUtils.formatNumber(delegationCount, {
        format: NumberFormat.GENERIC_SHORT,
    });
    const formattedTokenAmount = formatterUtils.formatNumber(tokenAmount, { format: NumberFormat.GENERIC_SHORT });

    return (
        <DataList.Item
            className={classNames(
                'flex min-w-fit flex-col items-start justify-center gap-y-3 py-4 md:min-w-44 md:py-6',
                className,
            )}
            {...otherProps}
        >
            <div className="flex w-full items-center justify-between">
                <MemberAvatar
                    address={address}
                    avatarSrc={avatarSrc}
                    ensName={ensName}
                    responsiveSize={{ md: 'md' }}
                    size="sm"
                />
                {isDelegate && !isCurrentUser && (
                    <Tag label={copy.memberDataListItemStructure.yourDelegate} variant="info" />
                )}
                {isCurrentUser && <Tag label={copy.memberDataListItemStructure.you} variant="neutral" />}
            </div>
            <Heading as="h2" className="inline-block w-full truncate" size="h3">
                {resolvedUserHandle}
            </Heading>
            {showDelegationOrTokenInformation && (
                <div className="flex flex-col gap-y-2">
                    <Heading
                        as="h3"
                        className={classNames('text-sm leading-tight md:text-base', {
                            invisible: delegationCount == null || delegationCount === 0,
                        })}
                        size="h5"
                    >
                        <span className="text-neutral-800">{formattedDelegationCount}</span>{' '}
                        <span className="text-neutral-500">
                            {copy.memberDataListItemStructure[delegationCount === 1 ? 'delegation' : 'delegations']}
                        </span>
                    </Heading>
                    <Heading as="h3" size="h5">
                        <span className="text-neutral-800">
                            {formattedTokenAmount ?? ''}
                            {tokenSymbol ? ` ${tokenSymbol}` : ''}
                        </span>
                        {!hideLabelTokenVoting && (
                            <span className="text-neutral-500"> {copy.memberDataListItemStructure.votingPower}</span>
                        )}
                    </Heading>
                </div>
            )}
        </DataList.Item>
    );
};
