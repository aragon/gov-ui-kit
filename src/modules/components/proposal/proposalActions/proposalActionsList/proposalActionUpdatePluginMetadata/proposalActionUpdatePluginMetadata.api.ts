import type {
    IProposalAction,
    IProposalActionComponentProps,
    ProposalActionType,
} from '../../proposalActionsDefinitions';

export interface IProposalActionUpdatePluginMetadataPluginMetadataLink {
    /**
     * Human readable label for link.
     */
    label: string;
    /**
     * link href.
     */
    href: string;
}

export interface IProposalActionUpdatePluginMetadataPluginMetadata {
    /**
     * The name of the plugin/process.
     */
    name: string;
    /**
     * The key of the process.
     */
    key?: string;
    /**
     * Summary of the plugin/process.
     */
    description?: string;
    /**
     * Resources of the plugin/process.
     */
    links: IProposalActionUpdatePluginMetadataPluginMetadataLink[];
}

export interface IProposalActionUpdatePluginMetadata extends IProposalAction {
    /**
     * UpdateMetadata action.
     */
    type: ProposalActionType.UPDATE_PLUGIN_METADATA;
    /**
     * Proposed metadata.
     */
    proposedMetadata: IProposalActionUpdatePluginMetadataPluginMetadata;
    /**
     * Existing metadata.
     */
    existingMetadata: IProposalActionUpdatePluginMetadataPluginMetadata;
}

export interface IProposalActionUpdatePluginMetadataProps
    extends IProposalActionComponentProps<IProposalActionUpdatePluginMetadata> {}
