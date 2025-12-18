import type { IInputContainerProps } from '../../../../../../core';
import type { IProposalActionInputDataParameter } from '../../proposalActionsDefinitions';
import type { IProposalActionsDecoderProps } from '../proposalActionsDecoder.api';

export interface IProposalActionsDecoderTextFieldBaseProps {
    /**
     * Action parameter to be rendered.
     */
    parameter: IProposalActionInputDataParameter;
    /**
     * Name of the input field.
     */
    fieldName: string;
    /**
     * Component to be used.
     * @default input
     */
    component?: 'textarea' | 'input';
    /**
     * Classname for the input component.
     */
    className?: string;
}

export interface IProposalActionsDecoderTextFieldProps
    extends IProposalActionsDecoderTextFieldBaseProps, Pick<IProposalActionsDecoderProps, 'mode' | 'formPrefix'> {
    /**
     * Hides the default labels when set to true.
     */
    hideLabels?: boolean;
}

export interface IProposalActionsDecoderTextFieldComponentProps
    extends IProposalActionsDecoderTextFieldBaseProps, Pick<IInputContainerProps, 'label' | 'helpText'> {}
