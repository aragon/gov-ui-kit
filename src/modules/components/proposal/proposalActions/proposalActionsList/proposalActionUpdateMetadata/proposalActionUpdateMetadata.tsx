import { useState } from 'react';
import { Avatar, DefinitionList, Link, Toggle, ToggleGroup } from '../../../../../../core';
import { modulesCopy } from '../../../../../assets';
import { ProposalActionType } from '../../proposalActionsDefinitions';
import type { IProposalActionUpdateMetadataProps } from './proposalActionUpdateMetadata.api';

export const ProposalActionUpdateMetadata: React.FC<IProposalActionUpdateMetadataProps> = (props) => {
    const [toggleValue, setToggleValue] = useState<string | undefined>('proposedMetadata');
    const { action } = props;
    const { proposedMetadata, existingMetadata } = action;
    const metadataToDisplay = toggleValue === 'proposedMetadata' ? proposedMetadata : existingMetadata;

    const isDaoMetadataAction = action.type === ProposalActionType.UPDATE_METADATA;
    const isPluginMetadataAction = action.type === ProposalActionType.UPDATE_PLUGIN_METADATA;

    const descriptionTermLabel = isDaoMetadataAction ? 'descriptionTerm' : 'summaryTerm';

    return (
        <div className="flex w-full flex-col gap-2">
            <ToggleGroup isMultiSelect={false} onChange={setToggleValue} value={toggleValue}>
                <Toggle label={modulesCopy.proposalActionsUpdateMetadata.proposedToggle} value="proposedMetadata" />
                <Toggle label={modulesCopy.proposalActionsUpdateMetadata.existingToggle} value="existingMetadata" />
            </ToggleGroup>

            <DefinitionList.Container>
                {isDaoMetadataAction && (
                    <DefinitionList.Item
                        className="md:items-center"
                        term={modulesCopy.proposalActionsUpdateMetadata.logoTerm}
                    >
                        <Avatar alt="dao-logo" responsiveSize={{ md: 'md', sm: 'sm' }} src={metadataToDisplay.avatar} />
                    </DefinitionList.Item>
                )}
                <DefinitionList.Item term={modulesCopy.proposalActionsUpdateMetadata.nameTerm}>
                    <p className="text-base text-neutral-800 leading-tight">{metadataToDisplay.name}</p>
                </DefinitionList.Item>
                {isPluginMetadataAction && existingMetadata.processKey && (
                    <DefinitionList.Item term={modulesCopy.proposalActionsUpdateMetadata.processKeyTerm}>
                        <p className="text-base text-neutral-800 leading-tight">{metadataToDisplay.processKey}</p>
                    </DefinitionList.Item>
                )}
                <DefinitionList.Item term={modulesCopy.proposalActionsUpdateMetadata[descriptionTermLabel]}>
                    <p className="text-base text-neutral-800 leading-tight">{metadataToDisplay.description}</p>
                </DefinitionList.Item>
                <DefinitionList.Item term={modulesCopy.proposalActionsUpdateMetadata.linkTerm}>
                    <ul>
                        {metadataToDisplay.links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} isExternal={true} showUrl={true}>
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
