import { generateProposalAction } from '../../proposalActions.testUtils';
import { ProposalActionType } from '../../types';
import type { IProposalActionChangeSettings } from './proposalActionChangeSettings.api';

export const generateProposalActionChangeSettings = (
    action?: Partial<IProposalActionChangeSettings>,
): IProposalActionChangeSettings => ({
    ...generateProposalAction(),
    type: ProposalActionType.CHANGE_SETTINGS_TOKENVOTE,
    existingSettings: [],
    proposedSettings: [],
    ...action,
});
