import { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { Radio, RadioGroup } from '../../../../../../core';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import type { IProposalActionInputDataParameter } from '../../proposalActionsDefinitions';
import type { IProposalActionsDecoderProps } from '../proposalActionsDecoder.api';
import { type ProposalActionsFieldValue, proposalActionsDecoderUtils } from '../proposalActionsDecoderUtils';

export interface IProposalActionsDecoderBooleanFieldProps extends Pick<IProposalActionsDecoderProps, 'formPrefix'> {
    /**
     * Action parameter to be rendered.
     */
    parameter: IProposalActionInputDataParameter;
    /**
     * Name of the input field.
     */
    fieldName: string;
    /**
     * Hides the default labels when set to true.
     */
    hideLabels?: boolean;
}

export const ProposalActionsDecoderBooleanField: React.FC<IProposalActionsDecoderBooleanFieldProps> = (props) => {
    const { parameter, fieldName, formPrefix, hideLabels } = props;
    const { name, notice, type } = parameter;

    const { copy } = useGukModulesContext();

    const errorMessages = copy.proposalActionsDecoder.validation;
    const validateFunction = (value: ProposalActionsFieldValue) =>
        proposalActionsDecoderUtils.validateValue(value, { label: name, type, required: true, errorMessages });

    const formFieldName = proposalActionsDecoderUtils.getFieldName(fieldName, formPrefix);
    const { fieldState, field } = useController<Record<string, ProposalActionsFieldValue>>({
        name: formFieldName,
        rules: { validate: validateFunction },
    });

    const { error } = fieldState;
    const alert = error?.message == null ? undefined : { message: error.message, variant: 'critical' as const };

    const { value, onChange } = field;

    useEffect(() => {
        // Normalise string values ("true" / "false") seeded by the application to booleans as the transaction data
        // encoding only accepts boolean values for bool types.
        if (typeof value === 'string' && proposalActionsDecoderUtils.validateBoolean(value)) {
            onChange(value === 'true');
        }
    }, [value, onChange]);

    const label = hideLabels ? undefined : (
        <>
            {name} <span className="text-neutral-500">({type})</span>
        </>
    );

    const handleValueChange = (newValue: string) => onChange(newValue === 'true');

    return (
        <RadioGroup
            alert={alert}
            helpText={hideLabels ? undefined : notice}
            label={label}
            name={formFieldName}
            onBlur={field.onBlur}
            onValueChange={handleValueChange}
            ref={field.ref}
            value={value?.toString() ?? ''}
        >
            <Radio label={copy.proposalActionsDecoder.booleanTrue} value="true" />
            <Radio label={copy.proposalActionsDecoder.booleanFalse} value="false" />
        </RadioGroup>
    );
};
