import { ProposalActionType } from '../../proposalActionsDefinitions';
import { generateProposalAction } from '../../proposalActionsTestUtils';
import type { IProposalActionUpdateMetadata } from './proposalActionUpdateMetadata.api';

export const generateProposalActionUpdateMetadata = (
    action?: Partial<IProposalActionUpdateMetadata>,
): IProposalActionUpdateMetadata => ({
    ...generateProposalAction(),
    type: ProposalActionType.UPDATE_METADATA,
    existingMetadata: {
        avatar: 'https://i.pravatar.cc/300',
        name: 'Old name',
        description: 'Existing DAO description.',
        links: [],
    },
    proposedMetadata: {
        avatar: 'https://i.pravatar.cc/300',
        name: 'New name',
        description: 'Proposed DAO description.',
        links: [],
    },
    ...action,
});
