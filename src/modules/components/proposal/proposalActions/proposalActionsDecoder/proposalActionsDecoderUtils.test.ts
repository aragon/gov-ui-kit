import { addressUtils } from '../../../../utils';
import { type IGetValidationRulesParams, proposalActionsDecoderUtils } from './proposalActionsDecoderUtils';

describe('ProposalActionsDecoder utils', () => {
    describe('getFieldName', () => {
        it('prepends the formPrefix to the field name when defined', () => {
            const formPrefix = 'actions.0';
            const fieldName = 'data';
            expect(proposalActionsDecoderUtils.getFieldName(fieldName, formPrefix)).toEqual(
                `${formPrefix}.${fieldName}`,
            );
        });

        it('returns the field name when form prefix is not defined', () => {
            const fieldName = 'inputData.parameters.0.value';
            expect(proposalActionsDecoderUtils.getFieldName(fieldName, undefined)).toEqual(fieldName);
        });
    });

    describe('validateValue', () => {
        const validateRequiredSpy = jest.spyOn(proposalActionsDecoderUtils, 'validateRequired');
        const validateBooleanSpy = jest.spyOn(proposalActionsDecoderUtils, 'validateBoolean');
        const validateAddressSpy = jest.spyOn(addressUtils, 'isAddress');
        const validateBytesSpy = jest.spyOn(proposalActionsDecoderUtils, 'validateBytes');
        const validateUnsignedNumberSpy = jest.spyOn(proposalActionsDecoderUtils, 'validateUnsignedNumber');

        afterEach(() => {
            validateRequiredSpy.mockReset();
            validateBooleanSpy.mockReset();
            validateAddressSpy.mockReset();
            validateBytesSpy.mockReset();
            validateUnsignedNumberSpy.mockReset();
        });

        afterAll(() => {
            validateRequiredSpy.mockRestore();
            validateBooleanSpy.mockRestore();
            validateAddressSpy.mockRestore();
            validateBytesSpy.mockRestore();
            validateUnsignedNumberSpy.mockRestore();
        });

        const buildValidateValueParams = (params?: Partial<IGetValidationRulesParams>): IGetValidationRulesParams => ({
            label: '',
            type: '',
            errorMessages: {
                required: () => 'required-error',
                boolean: () => 'bool-error',
                address: () => 'address-error',
                bytes: () => 'bytes-error',
                unsignedNumber: () => 'uint-error',
            },
            ...params,
        });

        it('returns required error message when value is required but not set', () => {
            validateRequiredSpy.mockReturnValue(false);
            const params = buildValidateValueParams({ required: true });
            expect(proposalActionsDecoderUtils.validateValue(undefined, params)).toEqual('required-error');
        });

        it('returns undefined when value is required and valid', () => {
            validateRequiredSpy.mockReturnValue(true);
            const params = buildValidateValueParams({ required: true });
            expect(proposalActionsDecoderUtils.validateValue('value', params)).toBeUndefined();
        });

        it('returns bool error message when value has bool type and is not valid', () => {
            validateBooleanSpy.mockReturnValue(false);
            const params = buildValidateValueParams({ type: 'bool' });
            expect(proposalActionsDecoderUtils.validateValue('tru', params)).toEqual('bool-error');
        });

        it('returns true when value has bool type and is valid', () => {
            validateBooleanSpy.mockReturnValue(true);
            const params = buildValidateValueParams({ type: 'bool' });
            expect(proposalActionsDecoderUtils.validateValue('false', params)).toBeTruthy();
        });

        it('returns address error message when value has address type and is not valid', () => {
            validateAddressSpy.mockReturnValue(false);
            const params = buildValidateValueParams({ type: 'address' });
            expect(proposalActionsDecoderUtils.validateValue('0x123', params)).toEqual('address-error');
        });

        it('returns true when value has address type and is valid', () => {
            validateBooleanSpy.mockReturnValue(true);
            const params = buildValidateValueParams({ type: 'address' });
            expect(
                proposalActionsDecoderUtils.validateValue('0x0B2a45c2bCb56dA84920585f985087973c715364', params),
            ).toBeTruthy();
        });

        it('returns bytes error message when value has bytes type and is not valid', () => {
            validateBytesSpy.mockReturnValue(false);
            const params = buildValidateValueParams({ type: 'bytes' });
            expect(proposalActionsDecoderUtils.validateValue('0x1', params)).toEqual('bytes-error');
        });

        it('returns true when value has bytes type and is valid', () => {
            validateBytesSpy.mockReturnValue(true);
            const params = buildValidateValueParams({ type: 'bytes32' });
            expect(proposalActionsDecoderUtils.validateValue('0x0001', params)).toBeTruthy();
        });

        it('returns uint error message when value has uint type and is not valid', () => {
            validateUnsignedNumberSpy.mockReturnValue(false);
            const params = buildValidateValueParams({ type: 'uint' });
            expect(proposalActionsDecoderUtils.validateValue('-1', params)).toEqual('uint-error');
        });

        it('returns true when value has uint type and is valid', () => {
            validateUnsignedNumberSpy.mockReturnValue(true);
            const params = buildValidateValueParams({ type: 'uint16' });
            expect(proposalActionsDecoderUtils.validateValue('10', params)).toBeTruthy();
        });
    });

    describe('validateRequired', () => {
        it('returns false when value is not defined or empty string', () => {
            expect(proposalActionsDecoderUtils.validateRequired(null)).toBeFalsy();
            expect(proposalActionsDecoderUtils.validateRequired(undefined)).toBeFalsy();
            expect(proposalActionsDecoderUtils.validateRequired('')).toBeFalsy();
        });

        it('returns true when value is defined', () => {
            expect(proposalActionsDecoderUtils.validateRequired('test')).toBeTruthy();
            expect(proposalActionsDecoderUtils.validateRequired(true)).toBeTruthy();
            expect(proposalActionsDecoderUtils.validateRequired(false)).toBeTruthy();
        });
    });

    describe('validateBoolean', () => {
        it('returns false when value is not a valid boolean', () => {
            expect(proposalActionsDecoderUtils.validateBoolean(undefined)).toBeFalsy();
            expect(proposalActionsDecoderUtils.validateBoolean(null)).toBeFalsy();
            expect(proposalActionsDecoderUtils.validateBoolean('')).toBeFalsy();
            expect(proposalActionsDecoderUtils.validateBoolean('fals')).toBeFalsy();
        });

        it('returns true when value is a valid boolean', () => {
            expect(proposalActionsDecoderUtils.validateBoolean('true')).toBeTruthy();
            expect(proposalActionsDecoderUtils.validateBoolean('false')).toBeTruthy();
        });
    });

    describe('validateBytes', () => {
        it('returns false when value is not a valid bytes value', () => {
            expect(proposalActionsDecoderUtils.validateBytes(undefined)).toBeFalsy();
            expect(proposalActionsDecoderUtils.validateBytes('0x1')).toBeFalsy();
            expect(proposalActionsDecoderUtils.validateBytes('0x123')).toBeFalsy();
            expect(proposalActionsDecoderUtils.validateBytes('0x-1')).toBeFalsy();
        });

        it('returns true when value is a valid bytes value', () => {
            expect(proposalActionsDecoderUtils.validateBytes('0x')).toBeTruthy();
            expect(proposalActionsDecoderUtils.validateBytes('0x00')).toBeTruthy();
            expect(proposalActionsDecoderUtils.validateBytes('0xab99')).toBeTruthy();
        });
    });

    describe('validateUnsignedNumber', () => {
        it('returns false when value is not a valid uint value', () => {
            expect(proposalActionsDecoderUtils.validateUnsignedNumber(undefined)).toBeFalsy();
            expect(proposalActionsDecoderUtils.validateUnsignedNumber('-1')).toBeFalsy();
            expect(proposalActionsDecoderUtils.validateUnsignedNumber('79.11')).toBeFalsy();
        });

        it('returns true when value is a valid uint value', () => {
            expect(proposalActionsDecoderUtils.validateUnsignedNumber('0')).toBeTruthy();
            expect(proposalActionsDecoderUtils.validateUnsignedNumber('8645312')).toBeTruthy();
        });
    });

    describe('isArrayType', () => {
        it('returns false when type is not an array type', () => {
            expect(proposalActionsDecoderUtils.isArrayType('uint')).toBeFalsy();
            expect(proposalActionsDecoderUtils.isArrayType('tuple')).toBeFalsy();
        });

        it('returns true when type is an array type', () => {
            expect(proposalActionsDecoderUtils.isArrayType('uint[]')).toBeTruthy();
            expect(proposalActionsDecoderUtils.isArrayType('address[][]')).toBeTruthy();
        });
    });

    describe('isTupleType', () => {
        it('returns false when type is not a tuple type', () => {
            expect(proposalActionsDecoderUtils.isTupleType('uint')).toBeFalsy();
            expect(proposalActionsDecoderUtils.isTupleType('address[]')).toBeFalsy();
        });

        it('returns true when type is a tuple type', () => {
            expect(proposalActionsDecoderUtils.isTupleType('tuple')).toBeTruthy();
        });
    });

    describe('isNumberType', () => {
        it('returns false when type is not a number type', () => {
            expect(proposalActionsDecoderUtils.isNumberType('address')).toBeFalsy();
            expect(proposalActionsDecoderUtils.isNumberType('tuple')).toBeFalsy();
        });

        it('returns true when type is a number type', () => {
            expect(proposalActionsDecoderUtils.isNumberType('uint256')).toBeTruthy();
            expect(proposalActionsDecoderUtils.isNumberType('int')).toBeTruthy();
            expect(proposalActionsDecoderUtils.isNumberType('int[]')).toBeTruthy();
        });
    });

    describe('isUnsignedNumberType', () => {
        it('returns false when type is not an unsigned number type', () => {
            expect(proposalActionsDecoderUtils.isUnsignedNumberType('int')).toBeFalsy();
            expect(proposalActionsDecoderUtils.isUnsignedNumberType('address')).toBeFalsy();
        });

        it('returns true when type is an unsigned number type', () => {
            expect(proposalActionsDecoderUtils.isUnsignedNumberType('uint')).toBeTruthy();
            expect(proposalActionsDecoderUtils.isUnsignedNumberType('uint[]')).toBeTruthy();
        });
    });

    describe('isSignedNumberType', () => {
        it('returns false when type is not a signed number type', () => {
            expect(proposalActionsDecoderUtils.isSignedNumberType('uint')).toBeFalsy();
            expect(proposalActionsDecoderUtils.isSignedNumberType('tuple')).toBeFalsy();
        });

        it('returns true when type is a signed number type', () => {
            expect(proposalActionsDecoderUtils.isSignedNumberType('int')).toBeTruthy();
            expect(proposalActionsDecoderUtils.isSignedNumberType('int[]')).toBeTruthy();
        });
    });

    describe('getArrayItemType', () => {
        it('returns the item type of the array', () => {
            expect(proposalActionsDecoderUtils.getArrayItemType('uint[]')).toEqual('uint');
            expect(proposalActionsDecoderUtils.getArrayItemType('tuple[]')).toEqual('tuple');
            expect(proposalActionsDecoderUtils.getArrayItemType('int[][]')).toEqual('int[]');
        });
    });

    describe('formValuesToFunctionParameters', () => {
        it('returns the values of all action parameters', () => {
            const params = ['0x00', ['0', true, 'test']];
            const actionParameters = [
                { name: '_data', value: params[0] },
                { name: '_struct', value: params[1] },
            ];
            const formValues = { inputData: { parameters: actionParameters } };
            expect(proposalActionsDecoderUtils.formValuesToFunctionParameters(formValues)).toEqual(params);
        });

        it('correctly extracts form values when using a form prefix', () => {
            const params = ['0', [['0x123', true], '0']];
            const actionParameters = [
                { name: '_data', value: params[0] },
                { name: '_struct', value: params[1] },
            ];
            const formPrefix = 'actions.0';
            const formValues = { actions: [{ inputData: { parameters: actionParameters } }] };
            expect(proposalActionsDecoderUtils.formValuesToFunctionParameters(formValues, formPrefix)).toEqual(params);
        });
    });

    describe('getNestedParameters', () => {
        it('returns empty array when value is not an array', () => {
            const parameter = { name: '_struct', type: 'tuple', value: 'test' };
            expect(proposalActionsDecoderUtils.getNestedParameters(parameter)).toEqual([]);
        });

        it('returns empty array when value is null', () => {
            const parameter = { name: '_struct', type: 'tuple', value: null };
            expect(proposalActionsDecoderUtils.getNestedParameters(parameter)).toEqual([]);
        });

        it('returns empty array when value is undefined', () => {
            const parameter = { name: '_struct', type: 'tuple', value: undefined };
            expect(proposalActionsDecoderUtils.getNestedParameters(parameter)).toEqual([]);
        });

        it('returns empty array when value is not supported', () => {
            const parameter = { name: '_struct', type: 'tuple', value: 11 };
            expect(proposalActionsDecoderUtils.getNestedParameters(parameter)).toEqual([]);
        });

        it('correctly maps the values for array type', () => {
            const parameter = {
                name: 'addresses',
                type: 'address[]',
                value: ['0x8Da8bfAc659D7608323652fa2013E43F589b62Cc', '0x0aAb5717E90043d54e363aAfd32Cd449A358aF62'],
            };
            expect(proposalActionsDecoderUtils.getNestedParameters(parameter)).toEqual([
                { name: parameter.name, type: 'address', value: parameter.value[0] },
                { name: parameter.name, type: 'address', value: parameter.value[1] },
            ]);
        });

        it('correctly maps the values for tuple type', () => {
            const parameter = {
                name: 'voteSettings',
                type: 'tuple',
                value: ['0', '1000000', true],
                components: [
                    { name: 'votingMode', type: 'uint8' },
                    { name: 'supportThreshold', type: 'uint32' },
                    { name: 'boolTest', type: 'uint32' },
                ],
            };
            expect(proposalActionsDecoderUtils.getNestedParameters(parameter)).toEqual([
                { ...parameter.components[0], value: parameter.value[0] },
                { ...parameter.components[1], value: parameter.value[1] },
                { ...parameter.components[2], value: parameter.value[2] },
            ]);
        });
    });

    describe('getDefaultNestedParameter', () => {
        it('returns parameter with undefined value for simple type', () => {
            const parameter = { name: 'simple-type', type: 'address', value: '0x123' };
            expect(proposalActionsDecoderUtils.getDefaultNestedParameter(parameter)).toEqual({
                ...parameter,
                value: undefined,
            });
        });

        it('returns parameter with undefined value and correct type for one-dimentional array type', () => {
            const parameter = { name: 'one-dimentional-array', type: 'uint[]', value: ['1', '2'] };
            expect(proposalActionsDecoderUtils.getDefaultNestedParameter(parameter)).toEqual({
                ...parameter,
                type: 'uint',
                value: undefined,
            });
        });

        it('returns parameter with empty array value and correct type for multi-dimentional array type', () => {
            const parameter = { name: 'one-dimentional-array', type: 'uint[][]', value: [['1']] };
            expect(proposalActionsDecoderUtils.getDefaultNestedParameter(parameter)).toEqual({
                ...parameter,
                type: 'uint[]',
                value: [],
            });
        });

        it('returns parameter with empty array value for tuple type', () => {
            const parameter = { name: 'tuple-type', type: 'tuple', value: ['1000', true] };
            expect(proposalActionsDecoderUtils.getDefaultNestedParameter(parameter)).toEqual({
                ...parameter,
                value: [],
            });
        });

        it('returns correct parameter for tuple array', () => {
            const pluginComponents = [
                { name: 'address', type: 'address' },
                { name: 'allowed', type: 'boolean' },
            ];
            const stageComponents = [
                { name: 'plugins', type: 'tuple[]', components: pluginComponents },
                { name: 'maxAdvance', type: 'uint' },
            ];
            const parameter = {
                name: 'tuple-array',
                type: 'tuple[]',
                value: undefined,
                components: stageComponents,
            };

            expect(proposalActionsDecoderUtils.getDefaultNestedParameter(parameter)).toEqual({
                ...parameter,
                type: 'tuple',
                value: [[[undefined, undefined], undefined]],
            });
        });
    });

    describe('guardArrayType', () => {
        it('returns false when value contains unsupported types', () => {
            expect(proposalActionsDecoderUtils['guardArrayType']([12])).toBeFalsy();
            expect(proposalActionsDecoderUtils['guardArrayType']([[{}]])).toBeFalsy();
        });

        it('returns true when value contains supported types', () => {
            expect(proposalActionsDecoderUtils['guardArrayType']([null])).toBeTruthy();
            expect(proposalActionsDecoderUtils['guardArrayType']([undefined])).toBeTruthy();
            expect(proposalActionsDecoderUtils['guardArrayType']([['false', '0x123']])).toBeTruthy();
        });
    });

    describe('guardValueType', () => {
        it('returns false when value type is not supported', () => {
            expect(proposalActionsDecoderUtils['guardValueType']({})).toBeFalsy();
            expect(proposalActionsDecoderUtils['guardValueType'](12)).toBeFalsy();
        });

        it('returns true when value type is supported', () => {
            expect(proposalActionsDecoderUtils['guardValueType'](null)).toBeTruthy();
            expect(proposalActionsDecoderUtils['guardValueType'](undefined)).toBeTruthy();
            expect(proposalActionsDecoderUtils['guardValueType']('0x')).toBeTruthy();
            expect(proposalActionsDecoderUtils['guardValueType'](false)).toBeTruthy();
        });
    });
});
