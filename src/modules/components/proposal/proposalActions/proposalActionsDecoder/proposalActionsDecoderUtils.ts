import type { DeepPartial } from 'react-hook-form';
import type { ModulesCopy } from '../../../../assets';
import { addressUtils } from '../../../../utils';
import type { IProposalAction, IProposalActionInputDataParameter } from '../proposalActionsDefinitions';

export interface IGetValidationRulesParams {
    /**
     * Label of the field used for validation errors.
     */
    label: string;
    /**
     * Type of the field to build the validation rules.
     */
    type: string;
    /**
     * Strings to use for validation errors.
     */
    errorMessages: ModulesCopy['proposalActionsDecoder']['validation'];
    /**
     * Defines if the field is required or not.
     */
    required?: boolean;
}

export type ProposalActionsFieldValue = string | boolean | undefined | null;

export type NestedProposalActionFormValues = DeepPartial<IProposalAction> | Record<string, unknown>;

class ProposalActionsDecoderUtils {
    private bytesRegex = /^0x[0-9a-fA-F]*$/;
    private unsignedNumberRegex = /^[0-9]*$/;

    getFieldName = (name: string, prefix?: string) => (prefix != null ? `${prefix}.${name}` : name);

    validateValue = (value: ProposalActionsFieldValue = null, params: IGetValidationRulesParams) => {
        const { type, label, errorMessages, required } = params;

        if (required && !this.validateRequired(value)) {
            return errorMessages.required(label);
        } else if (type === 'bool') {
            return this.validateBoolean(value) || errorMessages.boolean(label);
        } else if (type === 'address') {
            return addressUtils.isAddress(value?.toString()) || errorMessages.address(label);
        } else if (type.startsWith('bytes')) {
            return this.validateBytes(value) || errorMessages.bytes(label);
        } else if (this.isUnsignedNumberType(type)) {
            return this.validateUnsignedNumber(value) || errorMessages.unsignedNumber(label);
        }

        return undefined;
    };

    validateRequired = (value?: ProposalActionsFieldValue): boolean => value != null && value.toString().length > 0;

    validateBoolean = (value?: ProposalActionsFieldValue): boolean =>
        ['true', 'false'].includes(value?.toString() ?? '');

    validateBytes = (value?: ProposalActionsFieldValue): boolean =>
        value != null && value.toString().length % 2 === 0 && this.bytesRegex.test(value.toString());

    validateUnsignedNumber = (value?: ProposalActionsFieldValue): boolean =>
        value != null && this.unsignedNumberRegex.test(value.toString());

    formValuesToFunctionParameters = (
        formValues: NestedProposalActionFormValues,
        formPrefix?: string,
    ): unknown[] | undefined => {
        const formPrefixKeys = formPrefix != null && formPrefix.length > 0 ? formPrefix.split('.') : [];
        const currentFormValues: DeepPartial<IProposalAction> = formPrefixKeys.reduce(
            (current, key) => current[key as keyof typeof current] as NestedProposalActionFormValues,
            formValues,
        );

        const values = currentFormValues.inputData?.parameters?.map((parameter) =>
            parameter?.type === 'bool' ? parameter.value === 'true' : parameter?.value,
        );

        return values;
    };

    isArrayType = (type: string) => type.endsWith('[]');

    isTupleType = (type: string) => type === 'tuple';

    isNumberType = (type: string) => this.isUnsignedNumberType(type) || this.isSignedNumberType(type);

    isUnsignedNumberType = (type: string) => type.startsWith('uint');

    isSignedNumberType = (type: string) => type.startsWith('int');

    // Returns the array item type (e.g. address[] => address, uint[][] => uint[])
    getArrayItemType = (type: string) => type.slice(0, -2);

    getNestedParameters = (parameter: IProposalActionInputDataParameter): IProposalActionInputDataParameter[] => {
        const { value, type, components = [] } = parameter;

        const isValidArray = Array.isArray(value) && this.guardArrayType(value);

        if (!isValidArray) {
            return [];
        }

        return this.isArrayType(type)
            ? value.map((item) => ({ ...parameter, type: this.getArrayItemType(type), value: item }))
            : components.map((component, index) => ({ ...component, value: value[index] }));
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

    private guardArrayType = (value: unknown[]): value is boolean[] | string[] =>
        value.every((item) => (Array.isArray(item) ? this.guardArrayType(item) : this.guardValueType(item)));

    private guardValueType = (value: unknown): value is ProposalActionsFieldValue =>
        value == null || ['string', 'boolean'].includes(typeof value);
}

export const proposalActionsDecoderUtils = new ProposalActionsDecoderUtils();
