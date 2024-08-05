import { ProposalActionType } from '../../proposalActionsTypes';
import { type IProposalActionTokenMint } from '../../proposalActionsTypes/proposalActionTokenMint';

export const generateProposalActionTokenMint = (
    action?: Partial<IProposalActionTokenMint>,
): IProposalActionTokenMint => ({
    type: ProposalActionType.TOKEN_MINT,
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
    data: '',
    value: '1000000',
    inputData: {
        function: 'Mint tokens',
        contract: 'GovernanceERC20',
        parameters: [
            { name: 'address', type: 'string', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
            { name: 'tokenAmount', type: 'string', value: '2000000000000000000' },
        ],
    },
    receivers: [],
    tokenSupply: 10000,
    holdersCount: 500,
    tokenSymbol: 'PDC',
    ...action,
});
