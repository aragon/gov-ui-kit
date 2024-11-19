import { ProposalActionType } from '../../proposalActionsDefinitions';
import { generateProposalAction } from '../../proposalActionsTestUtils';
import type { IProposalActionTokenMint } from './proposalActionTokenMint.api';

export const generateProposalActionTokenMint = (
    action?: Partial<IProposalActionTokenMint>,
): IProposalActionTokenMint => ({
    ...generateProposalAction(),
    type: ProposalActionType.TOKEN_MINT,
    tokenSymbol: 'PDC',
    receiver: {
        currentBalance: '0',
        newBalance: '5',
        address: '0x32c2FE388ABbB3e678D44DF6a0471086D705316a',
    },
    ...action,
});
