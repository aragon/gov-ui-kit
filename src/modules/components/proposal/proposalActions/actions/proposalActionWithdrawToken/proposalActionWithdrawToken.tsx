import { AssetTransfer } from '../../../../asset';
import type { IProposalActionWithdrawToken } from '../../proposalActionsTypes';

export interface IProposalActionWithdrawTokenProps {
    /**
     * Withdraw token action
     */
    action: IProposalActionWithdrawToken;
}

export const ProposalActionWithdrawToken: React.FC<IProposalActionWithdrawTokenProps> = (props) => {
    const { action } = props;
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
        />
    );
};
