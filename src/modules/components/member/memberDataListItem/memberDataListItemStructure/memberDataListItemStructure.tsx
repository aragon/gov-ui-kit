import classNames from 'classnames';
import { useAccount } from 'wagmi';
import { DataList, Heading, NumberFormat, Tag, formatterUtils, type IDataListItemProps } from '../../../../../core';
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
        ...otherProps
    } = props;

    const { address: currentUserAddress, isConnected } = useAccount();

    const { copy } = useGukModulesContext();

    const isCurrentUser = isConnected && address && addressUtils.isAddressEqual(currentUserAddress, address);

    const resolvedUserHandle = ensName != null && ensName !== '' ? ensName : addressUtils.truncateAddress(address);

    const showDelegationOrTokenInformation = delegationCount != null || tokenAmount != null;

    const formattedDelegationCount = formatterUtils.formatNumber(delegationCount, {
        format: NumberFormat.GENERIC_SHORT,
    });
    const formattedTokenAmount = formatterUtils.formatNumber(tokenAmount, { format: NumberFormat.GENERIC_SHORT });

    return (
        <DataList.Item className="min-w-fit !py-0 px-4 md:px-6" {...otherProps}>
            <div className="flex flex-col items-start justify-center gap-y-3 py-4 md:min-w-44 md:py-6">
                <div className="flex w-full items-center justify-between">
                    <MemberAvatar
                        ensName={ensName}
                        address={address}
                        avatarSrc={avatarSrc}
                        responsiveSize={{ md: 'md' }}
                    />
                    {isDelegate && !isCurrentUser && (
                        <Tag variant="info" label={copy.memberDataListItemStructure.yourDelegate} />
                    )}
                    {isCurrentUser && <Tag variant="neutral" label={copy.memberDataListItemStructure.you} />}
                </div>

                <Heading className="inline-block w-full truncate" size="h2" as="h1">
                    {resolvedUserHandle}
                </Heading>

                {showDelegationOrTokenInformation && (
                    <div className="flex flex-col gap-y-2">
                        <Heading
                            size="h5"
                            as="h2"
                            className={classNames({ invisible: delegationCount == null || delegationCount === 0 })}
                        >
                            <span>{formattedDelegationCount}</span>
                            <span className="text-neutral-500"> {copy.memberDataListItemStructure.delegations}</span>
                        </Heading>
                        <Heading size="h5" as="h2">
                            <span>{`${formattedTokenAmount} ${tokenSymbol ?? ''}`}</span>
                            {!hideLabelTokenVoting && (
                                <span className="text-neutral-500">
                                    {' '}
                                    {copy.memberDataListItemStructure.votingPower}
                                </span>
                            )}
                        </Heading>
                    </div>
                )}
            </div>
        </DataList.Item>
    );
};
