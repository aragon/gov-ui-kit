import { Button, clipboardUtils, InputText, TextArea } from '../../../../../../core';
import { useFormField } from '../../../../../hooks';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import type { IProposalAction } from '../../proposalActionsDefinitions';
import type { IProposalActionsItemProps } from '../proposalActionsItem.api';

export interface IProposalActionsItemRawViewProps extends Pick<IProposalActionsItemProps, 'editMode' | 'formPrefix'> {
    /**
     * Proposal action to render the raw view for.
     */
    action: IProposalAction;
}

export const ProposalActionsItemRawView: React.FC<IProposalActionsItemRawViewProps> = (props) => {
    const { action, editMode, formPrefix } = props;

    const { copy } = useGukModulesContext();

    const valueField = useFormField('value', {
        formPrefix,
        value: action.value,
        label: copy.proposalActionsItemRawView.value,
        editMode,
        required: true,
        type: 'number',
    });

    const dataField = useFormField('data', {
        formPrefix,
        value: action.data,
        label: copy.proposalActionsItemRawView.data,
        editMode,
        type: 'string',
    });

    return (
        <div className="flex w-full flex-col gap-y-3">
            <InputText label={copy.proposalActionsItemRawView.to} value={action.to} disabled={true} />
            <InputText {...valueField} />
            <TextArea {...dataField} />
            <Button className="self-end" variant="tertiary" size="md" onClick={() => clipboardUtils.copy(action.data)}>
                {copy.proposalActionsItemRawView.copyButton}
            </Button>
        </div>
    );
};
