import { ProposalActionType } from '../../proposalActionsDefinitions';
import { generateProposalAction } from '../../proposalActionsTestUtils';
import type { IProposalActionUpdatePluginMetadata } from './proposalActionUpdatePluginMetadata.api';

export const generateProposalActionUpdatePluginMetadata = (
    action?: Partial<IProposalActionUpdatePluginMetadata>,
): IProposalActionUpdatePluginMetadata => ({
    ...generateProposalAction(),
    type: ProposalActionType.UPDATE_PLUGIN_METADATA,
    existingMetadata: {
        name: 'Old name',
        description: 'Existing DAO description.',
        links: [],
    },
    proposedMetadata: {
        name: 'New name',
        description: 'Proposed DAO description.',
        links: [],
    },
    ...action,
});
