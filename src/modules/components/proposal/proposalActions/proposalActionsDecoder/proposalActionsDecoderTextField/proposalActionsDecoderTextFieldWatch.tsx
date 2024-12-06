import { useWatch } from 'react-hook-form';
import { InputText, TextArea } from '../../../../../../core';
import { type ProposalActionsFieldValue } from '../proposalActionsDecoderUtils';
import type { IProposalActionsDecoderTextFieldComponentProps } from './proposalActionsDecoderTextField.api';

export interface IProposalActionsDecoderTextFieldWatchProps extends IProposalActionsDecoderTextFieldComponentProps {}

export const ProposalActionsDecoderTextFieldWatch: React.FC<IProposalActionsDecoderTextFieldWatchProps> = (props) => {
    const { parameter, fieldName, component = 'input', ...otherProps } = props;

    const value = useWatch<Record<string, ProposalActionsFieldValue>>({ name: fieldName });
    const Component = component === 'textarea' ? TextArea : InputText;

    return <Component value={value?.toString()} disabled={true} {...otherProps} />;
};
