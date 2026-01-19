import type {
    IProposalAction,
    IProposalActionComponentProps,
    ProposalActionType,
} from '../../proposalActionsDefinitions';

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
     * URL of the avatar, only set for DAO metadata.
     */
    avatar?: string;
    /**
     *  Name of the DAO or Plugin.
     */
    name: string;
    /**
     * Process key, only set for Plugin process metadata
     */
    processKey?: string;
    /**
     * Description of the DAO, plugin.
     */
    description: string;
    /**
     * Array of metadata links.
     */
    links: IProposalActionUpdateMetadataDaoMetadataLink[];
}

export interface IProposalActionUpdateMetadata extends IProposalAction {
    /**
     * Metadata action type.
     */
    type: ProposalActionType.UPDATE_METADATA | ProposalActionType.UPDATE_PLUGIN_METADATA;
    /**
     * Proposed metadata.
     */
    proposedMetadata: IProposalActionUpdateMetadataDaoMetadata;
    /**
     * Existing metadata.
     */
    existingMetadata: IProposalActionUpdateMetadataDaoMetadata;
}

export interface IProposalActionUpdateMetadataProps extends IProposalActionComponentProps<IProposalActionUpdateMetadata> {}
