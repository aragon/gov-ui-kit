import { InputText, TextArea } from '../../../../../../core';
import { ProposalActionsDecoderMode } from '../proposalActionsDecoder.api';
import { proposalActionsDecoderUtils } from '../proposalActionsDecoderUtils';
import type { IProposalActionsDecoderTextFieldProps } from './proposalActionsDecoderTextField.api';
import { ProposalActionsDecoderTextFieldEdit } from './proposalActionsDecoderTextFieldEdit';
import { ProposalActionsDecoderTextFieldWatch } from './proposalActionsDecoderTextFieldWatch';

export const ProposalActionsDecoderTextField: React.FC<IProposalActionsDecoderTextFieldProps> = (props) => {
    const { parameter, mode, hideLabels, component = 'input', fieldName, formPrefix, className } = props;
    const { name, notice, value, type } = parameter;

    const inputLabels = !hideLabels ? { label: name, helpText: notice } : undefined;
    const formFieldName = proposalActionsDecoderUtils.getFieldName(fieldName, formPrefix);

    const commonProps = { placeholder: type, className, ...inputLabels };
    const fieldProps = { parameter, component, fieldName: formFieldName, ...commonProps };

    if (mode === ProposalActionsDecoderMode.WATCH) {
        return <ProposalActionsDecoderTextFieldWatch {...fieldProps} />;
    }

    if (mode === ProposalActionsDecoderMode.EDIT) {
        return <ProposalActionsDecoderTextFieldEdit {...fieldProps} />;
    }

    const Component = component === 'textarea' ? TextArea : InputText;

    return <Component value={value?.toString()} disabled={true} {...commonProps} placeholder="0x..." />;
};
