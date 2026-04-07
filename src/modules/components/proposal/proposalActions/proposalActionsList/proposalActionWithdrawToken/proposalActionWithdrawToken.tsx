import { AssetTransfer } from '../../../../asset';
import type { IProposalActionWithdrawTokenProps } from './proposalActionWithdrawToken.api';

export const ProposalActionWithdrawToken: React.FC<IProposalActionWithdrawTokenProps> = (props) => {
    const { action, ...web3Props } = props;

    return (
        <AssetTransfer
            assetAddress={action.token.address}
            assetAmount={action.amount}
            assetFiatPrice={action.token.priceUsd}
            assetIconSrc={action.token.logo}
            assetName={action.token.name}
            assetSymbol={action.token.symbol}
            recipient={action.receiver}
            sender={action.sender}
            {...web3Props}
        />
    );
};
