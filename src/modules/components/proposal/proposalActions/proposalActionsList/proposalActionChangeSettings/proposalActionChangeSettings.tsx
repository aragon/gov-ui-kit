import { useState } from 'react';
import { DefinitionList, Toggle, ToggleGroup } from '../../../../../../core';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import type { IProposalActionChangeSettingsProps } from './proposalActionChangeSettings.api';

export const ProposalActionChangeSettings: React.FC<IProposalActionChangeSettingsProps> = (props) => {
    const { action } = props;

    const { copy } = useGukModulesContext();

    const [toggleValue, setToggleValue] = useState<string | undefined>('proposedSettings');

    const { proposedSettings, existingSettings } = action;
    const settingsToDisplay = toggleValue === 'proposedSettings' ? proposedSettings : existingSettings;

    return (
        <div className="flex w-full flex-col gap-2">
            <ToggleGroup isMultiSelect={false} onChange={setToggleValue} value={toggleValue}>
                <Toggle label={copy.proposalActionsChangeSettings.proposedToggle} value="proposedSettings" />
                <Toggle label={copy.proposalActionsChangeSettings.existingToggle} value="existingSettings" />
            </ToggleGroup>

            <DefinitionList.Container>
                {settingsToDisplay.map((setting) => (
                    <DefinitionList.Item key={setting.term} term={setting.term}>
                        {setting.definition}
                    </DefinitionList.Item>
                ))}
            </DefinitionList.Container>
        </div>
    );
};
