import classNames from 'classnames';
import { useAccount } from 'wagmi';
import { DataList, NumberFormat, Tag, formatterUtils, type IDataListItemProps } from '../../../../../core';
import { type ICompositeAddress } from '../../../../types';
import { addressUtils } from '../../../../utils';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { MemberAvatar } from '../../../member';
import { voteIndicatorToTagVariant, type VoteIndicator } from '../../voteUtils';

export type IVoteDataListItemStructureProps = IDataListItemProps & {
    /**
     * The account details of the voter.
     */
    voter: ICompositeAddress;
    /**
     * Whether the voter is a delegate of the current user or not.
     */
    isDelegate?: boolean;
    /**
     * The vote of the user.
     */
    voteIndicator: VoteIndicator;
    /**
     * If token-based voting, the amount of token voting power used.
     */
    votingPower?: number | string;
    /**
     * If token-based voting, the symbol of the voting power used.
     */
    tokenSymbol?: string;
    /**
     *   Custom label for the tag
     */
    confirmationLabel?: string;
};

export const VoteDataListItemStructure: React.FC<IVoteDataListItemStructureProps> = (props) => {
    const { voter, isDelegate, votingPower, tokenSymbol, voteIndicator, confirmationLabel, className, ...otherProps } =
        props;
    const { address: currentUserAddress, isConnected } = useAccount();

    const { copy } = useGukModulesContext();

    const isCurrentUser = isConnected && addressUtils.isAddressEqual(currentUserAddress, voter.address);

    const resolvedUserHandle =
        voter.name != null && voter.name !== '' ? voter.name : addressUtils.truncateAddress(voter.address);

    const formattedTokenNumber = formatterUtils.formatNumber(votingPower, { format: NumberFormat.TOKEN_AMOUNT_SHORT });
    const formattedTokenVote = `${formattedTokenNumber} ${tokenSymbol}`;

    const isTokenVoting = votingPower != null && tokenSymbol != null;
    const centerInfoClassNames = classNames('flex w-full min-w-0 shrink flex-col gap-y-1 leading-tight md:text-lg', {
        'py-3 md:py-3.5': !isTokenVoting,
    });

    return (
        <DataList.Item
            className={classNames('flex h-16 items-center gap-x-3 md:h-20 md:gap-x-4', className)}
            {...otherProps}
        >
            <MemberAvatar
                address={voter.address}
                ensName={voter.name}
                avatarSrc={voter.avatarSrc}
                responsiveSize={{ md: 'md' }}
            />
            <div className={centerInfoClassNames}>
                <span className="flex items-center gap-x-1 text-neutral-800 md:gap-x-1.5">
                    <span className="truncate">{resolvedUserHandle}</span>
                    {isDelegate && !isCurrentUser && (
                        <Tag variant="primary" label={copy.voteDataListItemStructure.yourDelegate} />
                    )}
                    {isCurrentUser && <Tag variant="neutral" label={copy.voteDataListItemStructure.you} />}
                </span>
                {isTokenVoting && (
                    <span className="truncate text-sm text-neutral-500 md:text-base">{formattedTokenVote}</span>
                )}
            </div>

            <div className="flex items-center gap-x-1 text-sm font-normal leading-tight text-neutral-500 md:gap-x-1.5 md:text-base">
                <span>{confirmationLabel ?? copy.voteProposalDataListItemStructure.voted}</span>
                <Tag
                    variant={voteIndicatorToTagVariant[voteIndicator]}
                    className="capitalize"
                    label={voteIndicator}
                    data-testid="tag"
                />
            </div>
        </DataList.Item>
    );
};
