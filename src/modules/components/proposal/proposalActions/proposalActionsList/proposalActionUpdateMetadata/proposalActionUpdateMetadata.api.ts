import type { IProposalAction, IProposalActionComponentProps, ProposalActionType } from '../../types';

export interface IProposalActionUpdateMetadataDaoMetadataLink {
    /**
     * Human readable label for link.
     */
    label: string;
    /**
     * link href.
     */
    href: string;
}

export interface IProposalActionUpdateMetadataDaoMetadata {
    /**
     * Logo url of the DAO.
     */
    logo: string;
    /**
     *  Name of the DAO.
     */
    name: string;
    /**
     * DAO Description.
     */
    description: string;
    /**
     * Array of metadata links.
     */
    links: IProposalActionUpdateMetadataDaoMetadataLink[];
}

export interface IProposalActionUpdateMetadata extends IProposalAction {
    /**
     * UpdateMetadata action.
     */
    type: ProposalActionType.UPDATE_METADATA;
    /**
     * Proposed metadata.
     */
    proposedMetadata: IProposalActionUpdateMetadataDaoMetadata;
    /**
     * Existing metadata.
     */
    existingMetadata: IProposalActionUpdateMetadataDaoMetadata;
}

export interface IProposalActionUpdateMetadataProps
    extends IProposalActionComponentProps<IProposalActionUpdateMetadata> {}
