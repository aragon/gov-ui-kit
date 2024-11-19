import { AssetTransfer } from '../../../../asset';
import type { IProposalActionWithdrawTokenProps } from './proposalActionWithdrawToken.api';

export const ProposalActionWithdrawToken: React.FC<IProposalActionWithdrawTokenProps> = (props) => {
    const { action, ...web3Props } = props;

    return (
        <AssetTransfer
            sender={action.sender}
            recipient={action.receiver}
            assetName={action.token.name}
            assetAmount={action.amount}
            assetFiatPrice={action.token.priceUsd}
            assetSymbol={action.token.symbol}
            assetIconSrc={action.token.logo}
            // TODO: Make hash property on AssetTransfer optional (APP-3430)
            hash=""
            {...web3Props}
        />
    );
};
