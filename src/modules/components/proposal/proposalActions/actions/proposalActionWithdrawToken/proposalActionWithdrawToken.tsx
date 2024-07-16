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
            assetSymbol={action.token.symbol}
            // TODO: Amend AssetTransfer hash req for proposal usage where no Tx exists yet, should disable asset link out
            hash=""
        />
    );
};