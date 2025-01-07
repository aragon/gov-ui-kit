import { zeroAddress } from 'viem';
import { AssetTransfer } from '../../../../asset';
import type { IProposalActionWithdrawTokenProps } from './proposalActionWithdrawToken.api';

export const ProposalActionWithdrawToken: React.FC<IProposalActionWithdrawTokenProps> = (props) => {
    const { action, ...web3Props } = props;

    // For native transfers we do not want to link to the block explorer
    const isNativeTransfer = action.token.address === zeroAddress;

    return (
        <AssetTransfer
            sender={action.sender}
            recipient={action.receiver}
            assetName={action.token.name}
            assetAddress={!isNativeTransfer ? action.token.address : undefined}
            assetAmount={action.amount}
            assetFiatPrice={action.token.priceUsd}
            assetSymbol={action.token.symbol}
            assetIconSrc={action.token.logo}
            {...web3Props}
        />
    );
};
