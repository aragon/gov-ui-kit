import { ChainEntityType, useBlockExplorer } from '../../../../../hooks';
import { MemberDataListItemStructure } from '../../../../member';
import type { IProposalActionTokenMintProps } from './proposalActionTokenMint.api';

export const ProposalActionTokenMint: React.FC<IProposalActionTokenMintProps> = (props) => {
    const { action, wagmiConfig, chainId } = props;
    const { tokenSymbol, receiver } = action;
    const { currentBalance, newBalance, address, name, avatarSrc } = receiver;

    const { buildEntityUrl } = useBlockExplorer({ chains: wagmiConfig?.chains, chainId });
    const receiverBlockExplorerLink = buildEntityUrl({ type: ChainEntityType.ADDRESS, id: address });

    const mintedTokenAmount = +newBalance - +currentBalance;

    return (
        <div className="flex w-full flex-col gap-8">
            <MemberDataListItemStructure
                className="w-full"
                address={address}
                ensName={name}
                avatarSrc={avatarSrc}
                tokenAmount={mintedTokenAmount}
                tokenSymbol={tokenSymbol}
                hideLabelTokenVoting={true}
                href={receiverBlockExplorerLink}
                target="_blank"
            />
        </div>
    );
};
