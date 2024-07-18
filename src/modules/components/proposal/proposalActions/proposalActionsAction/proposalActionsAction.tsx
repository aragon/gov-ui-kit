import { Accordion, Heading } from '../../../../../core';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { ProposalActionsActionVerification } from '../proposalActionsActionVerfication/proposalActionsActionVerfication';
import type { IProposalAction } from '../proposalActionsTypes';
import { proposalActionsUtils } from '../utils';

export interface IProposalActionsActionProps {
    /**
     * Proposal action
     */
    action: IProposalAction;
    /**
     * Index of the action being mapped by its parent ProposalActions.Container
     */
    index: number;
    /**
     * Toggle accordion callback for notifying the parent container to update after click
     */
    onToggle?: () => void;
}

export const ProposalActionsAction: React.FC<IProposalActionsActionProps> = (props) => {
    const { action, index, onToggle } = props;
    const ActionComponent = proposalActionsUtils.getActionComponent(action);
    const { copy } = useOdsModulesContext();

    const actionTypeToStringMapping: Record<string, string> = {
        withdrawToken: copy.proposalActionsAction.actionTypeWithdrawToken,
    };

    if (!ActionComponent) {
        return null;
    }

    const isDisabled = action.inputData == null;

    return (
        <Accordion.Item value={isDisabled ? '' : `${index}-action`} disabled={isDisabled}>
            <Accordion.ItemHeader onClick={onToggle}>
                <div className="flex flex-col items-start">
                    <Heading size="h4">
                        {action.inputData == null
                            ? copy.proposalActionsAction.notVerified
                            : actionTypeToStringMapping[action.type]}
                    </Heading>
                    <ProposalActionsActionVerification action={action} />
                </div>
            </Accordion.ItemHeader>
            <Accordion.ItemContent>{ActionComponent && <ActionComponent />}</Accordion.ItemContent>
        </Accordion.Item>
    );
};

ProposalActionsAction.displayName = 'ProposalActionsAction';
