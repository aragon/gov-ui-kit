import { generateProposalAction } from '../../proposalActions.testUtils';
import { ProposalActionType } from '../../types';
import type { IProposalActionChangeMembers } from './proposalActionChangeMembers.api';

export const generateProposalActionChangeMembers = (
    action?: Partial<IProposalActionChangeMembers>,
): IProposalActionChangeMembers => ({
    ...generateProposalAction(),
    type: ProposalActionType.ADD_MEMBERS,
    members: [],
    currentMembers: 0,
    ...action,
});
