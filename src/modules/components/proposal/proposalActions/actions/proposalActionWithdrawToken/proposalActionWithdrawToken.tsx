import { AssetTransfer } from '../../../../asset';
import type { IProposalActionWithdrawToken } from '../../proposalActionTypes';

interface ProposalActionWithdrawTokenProps {
    /**
     * Withdraw token action
     */
    action: IProposalActionWithdrawToken;
}

export const ProposalActionWithdrawToken: React.FC<ProposalActionWithdrawTokenProps> = (props) => {
    const { action } = props;
    return (
        <AssetTransfer
            sender={action.sender}
            recipient={action.receiver}
            assetName={action.token.name}
            assetAmount={action.amount}
            assetSymbol={action.token.symbol}
            hash=""
        />
    );
};
