import { type IProposalActionUpdateMetadata, ProposalActionType } from '../../proposalActionsTypes';

export const generateProposalActionUpdateMetadata = (
    action?: Partial<IProposalActionUpdateMetadata>,
): IProposalActionUpdateMetadata => ({
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
    data: '0x3f60b63300000000000000000000000019dbc1c820dd3f13260829a4e06dda6d9ef758db00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000d5fb864acfd6bb2f72939f122e89ff7f475924f5',
    value: '1',
    inputData: {
        function: 'Update DAO metadata',
        contract: 'DAO',
        parameters: [
            { name: 'address', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
            { name: 'tokenAmount', value: '1000000000000000000' },
        ],
    },
    type: ProposalActionType.UPDATE_METADATA,
    existingMetadata: {
        logo: 'https://i.pravatar.cc/300',
        name: 'Old name',
        description: 'Existing DAO description.',
        links: [
            { label: 'Farcaster', href: 'https://warpcast.com/olddao' },
            { label: 'X', href: 'https://x.com/olddao' },
        ],
    },
    proposedMetadata: {
        logo: 'https://i.pravatar.cc/300',
        name: 'New name',
        description: 'Proposed DAO description.',
        links: [
            { label: 'Farcaster', href: 'https://warpcast.com/newdao' },
            { label: 'X', href: 'https://x.com/newdao' },
        ],
    },
    ...action,
});
