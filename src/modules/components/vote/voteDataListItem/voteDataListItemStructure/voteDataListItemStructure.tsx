import classNames from 'classnames';
import { useAccount } from 'wagmi';
import {
    DataList,
    NumberFormat,
    Tag,
    formatterUtils,
    type IDataListItemProps,
    type TagVariant,
} from '../../../../../core';
import { type ICompositeAddress } from '../../../../types';
import { addressUtils } from '../../../../utils';
import { MemberAvatar } from '../../../member';

export interface IVoteDataListItemStructureProps extends IDataListItemProps {
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
    voteIndicator: 'yes' | 'no' | 'abstain' | 'approved';
    /**
     * If token-based voting, the amount of token voting power used.
     */
    votingPower?: number | string;
    /**
     * If token-based voting, the symbol of the voting power used.
     */
    tokenSymbol?: string;
}

const voteIndicatorToTagVariant: Record<IVoteDataListItemStructureProps['voteIndicator'], TagVariant> = {
    yes: 'success',
    no: 'critical',
    abstain: 'neutral',
    approved: 'primary',
};

export const VoteDataListItemStructure: React.FC<IVoteDataListItemStructureProps> = (props) => {
    const { voter, isDelegate, votingPower, tokenSymbol, voteIndicator, className, ...otherProps } = props;
    const { address: currentUserAddress, isConnected } = useAccount();

    const isCurrentUser = isConnected && addressUtils.isAddressEqual(currentUserAddress, voter.address);

    const resolvedUserHandle =
        voter.name != null && voter.name !== '' ? voter.name : addressUtils.truncateAddress(voter.address);

    const formattedTokenNumber = formatterUtils.formatNumber(votingPower, {
        format: NumberFormat.TOKEN_AMOUNT_SHORT,
    });
    const formattedTokenVote = `${formattedTokenNumber} ${tokenSymbol}`;

    const isTokenVoting = votingPower != null && tokenSymbol != null;
    const centerInfoClassNames = classNames(
        'flex w-full flex-col gap-y-1 text-base font-normal leading-tight md:gap-y-1.5 md:text-lg',
        {
            'py-3 md:py-3.5': !isTokenVoting,
        },
    );
    return (
        <DataList.Item className={classNames('flex items-center gap-x-3 md:gap-x-4', className)} {...otherProps}>
            <MemberAvatar address={voter.address} ensName={voter.name} responsiveSize={{ md: 'md' }} />
            <div className={centerInfoClassNames}>
                <span className="flex items-center gap-x-1 text-neutral-800 md:gap-x-1.5">
                    {resolvedUserHandle}
                    {isDelegate && !isCurrentUser && <Tag variant="primary" label="Your delegate" />}
                    {isCurrentUser && <Tag variant="neutral" label="You" />}
                </span>
                {isTokenVoting && <span className="text-neutral-500">{formattedTokenVote}</span>}
            </div>
            {voteIndicator && (
                <Tag variant={voteIndicatorToTagVariant[voteIndicator]} className="capitalize" label={voteIndicator} />
            )}
        </DataList.Item>
    );
};
