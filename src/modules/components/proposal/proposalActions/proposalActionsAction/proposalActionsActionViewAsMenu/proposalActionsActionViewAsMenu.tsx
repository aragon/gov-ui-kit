import { Dropdown } from '../../../../../../core';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import { ProposalActionViewMode } from '../../proposalActionsTypes';

export interface IProposalActionsActionViewAsMenuProps {
    /**
     * Current selected view mode for the action.
     */
    viewMode: ProposalActionViewMode;
    /**
     * Flag to disable basic view mode.
     */
    disableBasic: boolean;
    /**
     * Flag to disable decoded view mode.
     */
    disableDecoded: boolean;
    /**
     * Callback to handle dropdown value change.
     */
    onViewModeChange: (value: ProposalActionViewMode) => void;
}

export const ProposalActionsActionViewAsMenu: React.FC<IProposalActionsActionViewAsMenuProps> = (props) => {
    const { viewMode, disableBasic, disableDecoded, onViewModeChange } = props;

    const { copy } = useGukModulesContext();

    return (
        <Dropdown.Container label={copy.proposalActionsActionViewAsMenu.dropdownLabel} size="sm">
            <Dropdown.Item
                onSelect={() => onViewModeChange(ProposalActionViewMode.BASIC)}
                disabled={disableBasic}
                selected={viewMode === ProposalActionViewMode.BASIC}
            >
                {copy.proposalActionsActionViewAsMenu.basic}
            </Dropdown.Item>
            <Dropdown.Item
                onSelect={() => onViewModeChange(ProposalActionViewMode.DECODED)}
                disabled={disableDecoded}
                selected={viewMode === ProposalActionViewMode.DECODED}
            >
                {copy.proposalActionsActionViewAsMenu.decoded}
            </Dropdown.Item>
            <Dropdown.Item
                onSelect={() => onViewModeChange(ProposalActionViewMode.RAW)}
                selected={viewMode === ProposalActionViewMode.RAW}
            >
                {copy.proposalActionsActionViewAsMenu.raw}
            </Dropdown.Item>
        </Dropdown.Container>
    );
};
