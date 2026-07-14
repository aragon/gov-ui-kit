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
    private unsignedNumberRegex = /^[0-9]+$/;
    private signedNumberRegex = /^-?[0-9]+$/;

    getFieldName = (name: string, prefix?: string) => (prefix == null ? name : `${prefix}.${name}`);

    validateValue = (value: ProposalActionsFieldValue, params: IGetValidationRulesParams) => {
        const { type, label, errorMessages, required } = params;

        if (required && !this.validateRequired(value)) {
            return errorMessages.required(label);
        }
        if (type === 'bool') {
            return this.validateBoolean(value) || errorMessages.boolean(label);
        }
        if (type === 'address') {
            return addressUtils.isAddress(value?.toString(), { strict: true }) || errorMessages.address(label);
        }
        if (type.startsWith('bytes')) {
            return this.validateBytes(type, value) || errorMessages.bytes(label);
        }
        if (this.isUnsignedNumberType(type)) {
            if (!this.validateUnsignedNumber(value)) {
                return errorMessages.unsignedNumber(label);
            }
            return this.validateNumberRange(type, value) || errorMessages.numberRange(label, type);
        }
        if (this.isSignedNumberType(type)) {
            if (!this.validateSignedNumber(value)) {
                return errorMessages.signedNumber(label);
            }
            return this.validateNumberRange(type, value) || errorMessages.numberRange(label, type);
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

        return bytesSize.length ? valueSize === Number.parseInt(bytesSize, 10) : parsedValue.length % 2 === 0;
    };

    validateUnsignedNumber = (value?: ProposalActionsFieldValue): boolean =>
        value != null && this.unsignedNumberRegex.test(value.toString());

    validateSignedNumber = (value?: ProposalActionsFieldValue): boolean =>
        value != null && this.signedNumberRegex.test(value.toString());

    // Checks that the value fits the bit-width of the number type (e.g. 0 to 2^8-1 for uint8, -2^7 to 2^7-1 for int8).
    // Only call after the value passed the unsigned / signed number format validation.
    validateNumberRange = (type: string, value?: ProposalActionsFieldValue): boolean => {
        const isSigned = this.isSignedNumberType(type);
        const sizeString = type.slice(isSigned ? 3 : 4);
        const size = sizeString.length === 0 ? 256 : Number.parseInt(sizeString, 10);

        // ABI integer sizes are limited to 8..256 bits in steps of 8 (bare uint / int alias to 256 bits).
        if (Number.isNaN(size) || size < 8 || size > 256 || size % 8 !== 0) {
            return false;
        }

        let parsedValue: bigint;
        try {
            parsedValue = BigInt(value?.toString() ?? '');
        } catch {
            return false;
        }

        const bits = BigInt(size);
        const minValue = isSigned ? -(2n ** (bits - 1n)) : 0n;
        const maxValue = isSigned ? 2n ** (bits - 1n) - 1n : 2n ** bits - 1n;

        return parsedValue >= minValue && parsedValue <= maxValue;
    };

    isArrayType = (type: string) => type.endsWith('[]');

    isTupleType = (type: string) => type === 'tuple';

    isStringType = (type: string) => type === 'string';

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
        }
        if (this.isTupleType(type)) {
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
