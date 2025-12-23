import type { IDefinitionSetting } from '../../../../../types';
import type { IProposalAction, IProposalActionComponentProps } from '../../proposalActionsDefinitions';

export interface IProposalActionChangeSettings extends IProposalAction {
    /**
     * The settings that are proposed to be changed
     */
    proposedSettings: IDefinitionSetting[];
    /**
     * The settings that are currently in place.
     */
    existingSettings: IDefinitionSetting[];
}

export interface IProposalActionChangeSettingsProps extends IProposalActionComponentProps<IProposalActionChangeSettings> {}
