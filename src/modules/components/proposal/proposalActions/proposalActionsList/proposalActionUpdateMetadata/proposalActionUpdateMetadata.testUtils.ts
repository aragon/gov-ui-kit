import { ProposalActionType } from '../../proposalActionsDefinitions';
import { generateProposalAction } from '../../proposalActionsTestUtils';
import type { IProposalActionUpdateMetadata } from './proposalActionUpdateMetadata.api';

export const generateProposalActionUpdateMetadata = (
    action?: Partial<IProposalActionUpdateMetadata>,
): IProposalActionUpdateMetadata => ({
    ...generateProposalAction(),
    type: ProposalActionType.UPDATE_METADATA,
    existingMetadata: {
        logo: 'https://i.pravatar.cc/300',
        name: 'Old name',
        description: 'Existing DAO description.',
        links: [],
    },
    proposedMetadata: {
        logo: 'https://i.pravatar.cc/300',
        name: 'New name',
        description: 'Proposed DAO description.',
        links: [],
    },
    ...action,
});
