import { useState } from 'react';
import { Avatar, DefinitionList, IconType, Link, Toggle, ToggleGroup } from '../../../../../../core';
import { modulesCopy } from '../../../../../assets';
import type { IProposalActionUpdateMetadataProps } from './proposalActionUpdateMetadata.api';
import { ProposalActionType } from '../../proposalActionsDefinitions';

export const ProposalActionUpdateMetadata: React.FC<IProposalActionUpdateMetadataProps> = (props) => {
    const [toggleValue, setToggleValue] = useState<string | undefined>('existingMetadata');
    const { action } = props;
    const { proposedMetadata, existingMetadata } = action;
    const metadataToDisplay = toggleValue === 'proposedMetadata' ? proposedMetadata : existingMetadata;

    const daoMetadataAction = action.type === ProposalActionType.UPDATE_METADATA;
    const pluginMetadataAction = action.type === ProposalActionType.UPDATE_PLUGIN_METADATA;

    const descriptionTermLabel = daoMetadataAction ? 'descriptionTerm' : 'summaryTerm';

    return (
        <div className="flex w-full flex-col gap-2">
            <ToggleGroup value={toggleValue} onChange={setToggleValue} isMultiSelect={false}>
                <Toggle label={modulesCopy.proposalActionsUpdateMetadata.existingToggle} value="existingMetadata" />
                <Toggle label={modulesCopy.proposalActionsUpdateMetadata.proposedToggle} value="proposedMetadata" />
            </ToggleGroup>

            <DefinitionList.Container>
                {daoMetadataAction && (
                    <DefinitionList.Item
                        className="md:items-center"
                        term={modulesCopy.proposalActionsUpdateMetadata.logoTerm}
                    >
                        <Avatar alt="dao-logo" src={metadataToDisplay.logo} responsiveSize={{ md: 'md', sm: 'sm' }} />
                    </DefinitionList.Item>
                )}
                <DefinitionList.Item term={modulesCopy.proposalActionsUpdateMetadata.nameTerm}>
                    <p className="text-base leading-tight text-neutral-800">{metadataToDisplay.name}</p>
                </DefinitionList.Item>
                {pluginMetadataAction && existingMetadata.key && (
                    <DefinitionList.Item term={modulesCopy.proposalActionsUpdateMetadata.keyTerm}>
                        <p className="text-base leading-tight text-neutral-800">{metadataToDisplay.key}</p>
                    </DefinitionList.Item>
                )}
                <DefinitionList.Item term={modulesCopy.proposalActionsUpdateMetadata[descriptionTermLabel]}>
                    <p className="text-base leading-tight text-neutral-800">{metadataToDisplay.description}</p>
                </DefinitionList.Item>
                <DefinitionList.Item term={modulesCopy.proposalActionsUpdateMetadata.linkTerm}>
                    <ul>
                        {metadataToDisplay.links.map((link, index) => (
                            <li key={index}>
                                <Link
                                    description={link.href}
                                    iconRight={IconType.LINK_EXTERNAL}
                                    href={link.href}
                                    target="_blank"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </DefinitionList.Item>
            </DefinitionList.Container>
        </div>
    );
};
