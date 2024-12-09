import { useState } from 'react';
import { DefinitionList, IconType, Link, Toggle, ToggleGroup } from '../../../../../../core';
import { modulesCopy } from '../../../../../assets';
import type { IProposalActionUpdatePluginMetadataProps } from './proposalActionUpdatePluginMetadata.api';

export const ProposalActionUpdatePluginMetadata: React.FC<IProposalActionUpdatePluginMetadataProps> = (props) => {
    const [toggleValue, setToggleValue] = useState<string | undefined>('existingMetadata');
    const { action } = props;
    const { proposedMetadata, existingMetadata } = action;
    const metadataToDisplay = toggleValue === 'proposedMetadata' ? proposedMetadata : existingMetadata;

    return (
        <div className="flex w-full flex-col gap-2">
            <ToggleGroup value={toggleValue} onChange={setToggleValue} isMultiSelect={false}>
                <Toggle
                    label={modulesCopy.proposalActionsUpdatePluginMetadata.existingToggle}
                    value="existingMetadata"
                />
                <Toggle
                    label={modulesCopy.proposalActionsUpdatePluginMetadata.proposedToggle}
                    value="proposedMetadata"
                />
            </ToggleGroup>

            <DefinitionList.Container>
                <DefinitionList.Item term={modulesCopy.proposalActionsUpdatePluginMetadata.nameTerm}>
                    <p className="text-base leading-tight text-neutral-800">{metadataToDisplay.name}</p>
                </DefinitionList.Item>
                {existingMetadata.key && (
                    <DefinitionList.Item term={modulesCopy.proposalActionsUpdatePluginMetadata.keyTerm}>
                        <p className="text-base leading-tight text-neutral-800">{metadataToDisplay.key}</p>
                    </DefinitionList.Item>
                )}
                <DefinitionList.Item term={modulesCopy.proposalActionsUpdatePluginMetadata.summaryTerm}>
                    <p className="text-base leading-tight text-neutral-800">{metadataToDisplay.description}</p>
                </DefinitionList.Item>
                <DefinitionList.Item term={modulesCopy.proposalActionsUpdatePluginMetadata.resourcesTerm}>
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
