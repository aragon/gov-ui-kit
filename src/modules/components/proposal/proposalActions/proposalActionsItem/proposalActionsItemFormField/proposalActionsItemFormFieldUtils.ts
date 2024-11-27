import type { FieldError } from 'react-hook-form';
import type { IInputComponentProps } from '../../../../../../core';
import type { IProposalActionInputDataParameter } from '../../proposalActionsDefinitions';
import type {
    IUseProposalActionsItemFormFieldReturn,
    ProposalActionFieldType,
} from './useProposalActionsItemFormField.api';

export interface IGetParameterLabelParams {
    /**
     * Action parameter to process the name.
     */
    parameter: IProposalActionInputDataParameter;
    /**
     * Includes the parameter type when set to true.
     * @default true
     */
    includeType?: boolean;
}

class ProposalActionsItemFormFieldUtils {
    getParameterLabel = (params: IGetParameterLabelParams) => {
        const { parameter, includeType = true } = params;
        const { name, type } = parameter;

        return includeType ? `${name} (${type})` : name;
    };

    guardValueType = (value: unknown): value is boolean | string | null | undefined =>
        value == null || ['string', 'boolean'].includes(typeof value);

    guardArrayType = (value: unknown[]): value is boolean[] | string[] =>
        value.every((item) => (Array.isArray(item) ? this.guardArrayType(item) : this.guardValueType(item)));

    validateBoolean = (value: string | boolean): boolean => ['true', 'false'].includes(value.toString());

    valueSetter = (value: string | boolean, type: ProposalActionFieldType): string | boolean => {
        // Store value as boolean on form when valid, otherwise store it as lowercase string.
        if (type === 'boolean') {
            return this.validateBoolean(value) ? Boolean(value) : value.toString().toLocaleLowerCase();
        }

        return value;
    };

    getDefaultFormField = (name: string, value?: string): IUseProposalActionsItemFormFieldReturn => ({
        name,
        value,
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

    parseType = (type: string): ProposalActionFieldType => {
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
