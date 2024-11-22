import { ProposalActionType } from '../../proposalActionsDefinitions';
import { generateProposalAction } from '../../proposalActionsTestUtils';
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
