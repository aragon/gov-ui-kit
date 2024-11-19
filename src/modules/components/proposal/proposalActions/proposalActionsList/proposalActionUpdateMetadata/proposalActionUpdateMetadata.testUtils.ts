import { generateProposalAction } from '../../proposalActions.testUtils';
import { ProposalActionType } from '../../types';
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
