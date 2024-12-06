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

export type ProposalActionsFieldValue = string | boolean | undefined | null | unknown[];

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
            return this.validateBytes(type, value) || errorMessages.bytes(label);
        } else if (this.isUnsignedNumberType(type)) {
            return this.validateUnsignedNumber(value) || errorMessages.unsignedNumber(label);
        }

        return undefined;
    };

    validateRequired = (value?: ProposalActionsFieldValue): boolean => value != null && value.toString().length > 0;

    validateBoolean = (value?: ProposalActionsFieldValue): boolean =>
        ['true', 'false'].includes(value?.toString() ?? '');

    validateBytes = (type: string, value?: ProposalActionsFieldValue): boolean => {
        const parsedValue = value?.toString();

        if (parsedValue == null || !this.bytesRegex.test(parsedValue)) {
            return false;
        }

        const [, bytesSize] = type.split('bytes');
        const valueSize = Math.ceil((parsedValue.length - 2) / 2);

        return bytesSize.length ? valueSize === Number.parseInt(bytesSize) : parsedValue.length % 2 === 0;
    };

    validateUnsignedNumber = (value?: ProposalActionsFieldValue): boolean =>
        value != null && this.unsignedNumberRegex.test(value.toString());

    isArrayType = (type: string) => type.endsWith('[]');

    isTupleType = (type: string) => type === 'tuple';

    isNumberType = (type: string) => this.isUnsignedNumberType(type) || this.isSignedNumberType(type);

    isUnsignedNumberType = (type: string) => type.startsWith('uint');

    isSignedNumberType = (type: string) => type.startsWith('int');

    // Returns the array item type (e.g. address[] => address, uint[][] => uint[])
    getArrayItemType = (type: string) => type.slice(0, -2);

    formValuesToFunctionParameters = (
        formValues: NestedProposalActionFormValues,
        formPrefix?: string,
    ): unknown[] | undefined => {
        const formPrefixKeys = formPrefix != null && formPrefix.length > 0 ? formPrefix.split('.') : [];
        const currentFormValues: DeepPartial<IProposalAction> = formPrefixKeys.reduce(
            (current, key) => current[key as keyof typeof current] as NestedProposalActionFormValues,
            formValues,
        );

        const values = currentFormValues.inputData?.parameters?.map((parameter) => parameter?.value);

        return values;
    };

    getNestedParameters = (parameter: IProposalActionInputDataParameter): IProposalActionInputDataParameter[] => {
        const { value, type, components = [] } = parameter;

        if (this.isArrayType(type) && this.guardArrayType(value)) {
            return value.map((item) => ({ ...parameter, type: this.getArrayItemType(type), value: item }));
        } else if (this.isTupleType(type)) {
            return components.map((component, index) => ({
                ...component,
                value: this.guardArrayType(value) ? value[index] : undefined,
            }));
        }

        return [];
    };

    private guardArrayType = (value: unknown): value is boolean[] | string[] =>
        Array.isArray(value) &&
        value.every((item) => (Array.isArray(item) ? this.guardArrayType(item) : this.guardValueType(item)));

    private guardValueType = (value: unknown): value is ProposalActionsFieldValue =>
        value == null || ['string', 'boolean'].includes(typeof value);
}

export const proposalActionsDecoderUtils = new ProposalActionsDecoderUtils();
