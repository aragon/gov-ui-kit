import { ProposalActionType } from '../../proposalActionsDefinitions';
import { generateProposalAction } from '../../proposalActionsTestUtils';
import type { IProposalActionWithdrawToken } from './proposalActionWithdrawToken.api';

export const generateProposalActionWithdrawToken = (
    action?: Partial<IProposalActionWithdrawToken>,
): IProposalActionWithdrawToken => ({
    ...generateProposalAction(),
    type: ProposalActionType.WITHDRAW_TOKEN,
    sender: { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
    receiver: { address: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
    token: { name: 'Token name', symbol: 'TTT', logo: '', priceUsd: '1.00', decimals: 18 },
    amount: '10000000',
    ...action,
});
