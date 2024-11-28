import { Button, clipboardUtils, InputText } from '../../../../../../core';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import type { IProposalAction } from '../../proposalActionsDefinitions';
import type { IProposalActionsItemProps } from '../proposalActionsItem.api';
import { ProposalActionsItemFormField } from '../proposalActionsItemFormField';

export interface IProposalActionsItemRawViewProps extends Pick<IProposalActionsItemProps, 'editMode' | 'formPrefix'> {
    /**
     * Proposal action to render the raw view for.
     */
    action: IProposalAction;
}

export const ProposalActionsItemRawView: React.FC<IProposalActionsItemRawViewProps> = (props) => {
    const { action, editMode, formPrefix } = props;

    const { copy } = useGukModulesContext();

    return (
        <div className="flex w-full flex-col gap-y-3">
            <InputText label={copy.proposalActionsItemRawView.to} value={action.to} disabled={true} />
            <ProposalActionsItemFormField
                parameter={{ name: copy.proposalActionsItemRawView.value, value: action.value, type: 'uint' }}
                fieldName="value"
                formPrefix={formPrefix}
                editMode={editMode}
            />
            <ProposalActionsItemFormField
                parameter={{ name: copy.proposalActionsItemRawView.data, value: action.data, type: 'bytes' }}
                fieldName="data"
                component="textarea"
                formPrefix={formPrefix}
                editMode={editMode}
            />
            <Button className="self-end" variant="tertiary" size="md" onClick={() => clipboardUtils.copy(action.data)}>
                {copy.proposalActionsItemRawView.copyButton}
            </Button>
        </div>
    );
};
