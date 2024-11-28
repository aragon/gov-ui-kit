import type { FieldError } from 'react-hook-form';
import type { IInputComponentProps } from '../../../../../../core';
import type { ModulesCopy } from '../../../../../assets';
import { addressUtils } from '../../../../../utils';
import type { IProposalActionInputDataParameter } from '../../proposalActionsDefinitions';
import type {
    IUseProposalActionsItemFormFieldReturn,
    ProposalActionFieldType,
} from './useProposalActionsItemFormField.api';

export interface IGetValidationRulesParams {
    /**
     * Label of the field used for validation errors.
     */
    label: string;
    /**
     * Type of the field to build the validation rules.
     */
    type: ProposalActionFieldType;
    /**
     * Strings to use for validation errors.
     */
    errorMessages: ModulesCopy['proposalActionsItemFormField'];
    /**
     * Defines if the field is required or not.
     */
    required?: boolean;
}

class ProposalActionsItemFormFieldUtils {
    guardValueType = (value: unknown): value is boolean | string | null | undefined =>
        value == null || ['string', 'boolean'].includes(typeof value);

    guardArrayType = (value: unknown[]): value is boolean[] | string[] =>
        value.every((item) => (Array.isArray(item) ? this.guardArrayType(item) : this.guardValueType(item)));

    getValidationRules = (params: IGetValidationRulesParams) => {
        const { required, label, errorMessages } = params;

        return {
            required: required ? errorMessages.required(label) : undefined,
            validate: (value: string | boolean) => this.validateValue(value, params),
        };
    };

    validateValue = (value: string | boolean | undefined | null = null, params: IGetValidationRulesParams) => {
        const { type, label, errorMessages } = params;

        if (type === 'boolean') {
            return proposalActionsItemFormFieldUtils.validateBoolean(value) || errorMessages.boolean(label);
        } else if (type === 'address') {
            return addressUtils.isAddress(value?.toString()) || errorMessages.address(label);
        }

        return undefined;
    };

    validateBoolean = (value?: string | boolean | null): boolean => ['true', 'false'].includes(value?.toString() ?? '');

    valueSetter = (
        value: string | boolean | undefined | null = null,
        type: ProposalActionFieldType,
    ): string | boolean | undefined | null => {
        // Store value as boolean on form when valid, otherwise store it as lowercase string.
        if (type === 'boolean') {
            return this.validateBoolean(value) ? value === 'true' : value?.toString().toLocaleLowerCase();
        }

        return value;
    };

    getDefaultFormField = (name: string, value?: string | boolean | null): IUseProposalActionsItemFormFieldReturn => ({
        name,
        value: value?.toString(),
        onChange: () => Promise.resolve(true),
        onBlur: () => Promise.resolve(true),
        ref: () => null,
    });

    fieldErrorToAlert = (error?: FieldError): IInputComponentProps['alert'] | undefined => {
        if (error?.message == null) {
            return undefined;
        }

        return { message: error.message, variant: 'critical' };
    };

    isArrayType = (type: string) => type.endsWith('[]');

    isTupleType = (type: string) => type === 'tuple';

    abiToFieldType = (type: string): ProposalActionFieldType => {
        let formFieldType: ProposalActionFieldType = 'string';

        if (type.includes('uint')) {
            formFieldType = 'number';
        } else if (type === 'bool') {
            formFieldType = 'boolean';
        } else if (type === 'address') {
            formFieldType = 'address';
        }

        return formFieldType;
    };

    // Returns the array item type (e.g. address[] => address, uint[][] => uint[])
    getArrayItemType = (type: string) => type.slice(0, -2);

    getNestedParameters = (parameter: IProposalActionInputDataParameter): IProposalActionInputDataParameter[] => {
        const { value, type, components } = parameter;

        if (!Array.isArray(value) || !this.guardArrayType(value)) {
            return [];
        }

        return this.isArrayType(type)
            ? value.map((item) => ({ ...parameter, type: this.getArrayItemType(type), value: item }))
            : (components?.map((component, index) => ({ ...component, value: value[index] })) ?? []);
    };

    getDefaultNestedParameter = (
        parameter: IProposalActionInputDataParameter,
        nestedTuple?: boolean,
    ): IProposalActionInputDataParameter => {
        const { type } = parameter;

        if (type === 'tuple') {
            return { ...parameter, value: [] };
        } else if (type === 'tuple[]') {
            const isNestedTuple = nestedTuple == null || nestedTuple;

            const tupleValue = parameter.components?.map(
                (component) => this.getDefaultNestedParameter({ ...component, value: undefined }, isNestedTuple).value,
            );

            const processedValue = nestedTuple ? [tupleValue] : tupleValue;

            return { ...parameter, type: this.getArrayItemType(type), value: processedValue };
        } else if (type.includes('[]')) {
            // Set value as array for multi-dimentional arrays.
            const value = type.includes('[][]') ? [] : undefined;

            return { ...parameter, type: this.getArrayItemType(type), value };
        }

        return { ...parameter, value: undefined };
    };
}

export const proposalActionsItemFormFieldUtils = new ProposalActionsItemFormFieldUtils();
