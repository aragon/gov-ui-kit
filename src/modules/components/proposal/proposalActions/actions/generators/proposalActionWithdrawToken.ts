import { ProposalActionType, type IProposalActionWithdrawToken } from '../../proposalActionsTypes';

export const generateToken = (
    token?: Partial<IProposalActionWithdrawToken['token']>,
): IProposalActionWithdrawToken['token'] => ({
    name: 'Ether',
    symbol: 'ETH',
    logo: 'https://etherscan.io/token/images/ether.png',
    decimals: 18,
    priceUsd: '3218.25',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    ...token,
});

export const generateProposalActionWithdrawToken = (
    action?: Partial<IProposalActionWithdrawToken>,
): IProposalActionWithdrawToken => ({
    type: ProposalActionType.WITHDRAW_TOKEN,
    sender: { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
    receiver: { address: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
    token: generateToken(),
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
    data: '',
    value: '0',
    inputData: {
        function: 'transfer',
        contract: 'Ether',
        parameters: [
            { type: 'address', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
            { type: 'uint256', value: '1000000000000000000' },
        ],
    },
    amount: '10000000',
    ...action,
});
