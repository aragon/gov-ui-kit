/**
 * Set node as jest environment because the checksum check on the viem isAddress utility does not properly work on jsdom
 * (See here https://github.com/jestjs/jest/issues/7780#issuecomment-865077151)
 * @jest-environment node
 */
import { testLogger } from '../../../core/test';
import { addressUtils } from './addressUtils';

describe('address utils', () => {
    describe('isAddress', () => {
        it('returns true when the input is a valid address', () => {
            const value = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
            expect(addressUtils.isAddress(value)).toBeTruthy();
        });

        it('returns false when the input is not a valid address', () => {
            const value = 'name.eth';
            expect(addressUtils.isAddress(value)).toBeFalsy();
        });

        it('returns true when the input is a valid address but not in the checksum format', () => {
            const value = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aa96045';
            expect(addressUtils.isAddress(value)).toBeTruthy();
        });

        it('returns false when the input is a valid address but not in the checksum format when the strict property is set to true', () => {
            const value = '0xe11bFCBDd43745d4Aa6f4f18E24aD24f4623af04';
            const options = { strict: true };
            expect(addressUtils.isAddress(value, options)).toBeFalsy();
        });
    });

    describe('truncateAddress', () => {
        it('returns empty string when address is not defined', () => {
            expect(addressUtils.truncateAddress()).toEqual('');
        });

        it('returns input string when input is not a valid address', () => {
            const value = '0x123';
            expect(addressUtils.truncateAddress(value)).toEqual(value);
        });

        it('correctly truncates the address', () => {
            const value = '0xe11bfcbdd43745d4aa6f4f18e24ad24f4623af04';
            const expectedValue = '0xe11b…af04';
            expect(addressUtils.truncateAddress(value)).toEqual(expectedValue);
        });
    });

    describe('getChecksum', () => {
        it('returns the address on its checksum format', () => {
            const value = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
            const checksum = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
            expect(addressUtils.getChecksum(value)).toEqual(checksum);
        });

        it('throws error when input value is not a valid address ', () => {
            testLogger.suppressErrors();
            const value = 'test';
            expect(() => addressUtils.getChecksum(value)).toThrow();
            expect(() => addressUtils.getChecksum(undefined)).toThrow();
        });
    });

    describe('isAddressEqual', () => {
        it('returns true when both addresses are the same regardless of checksum', () => {
            const addressOne = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
            const addressTwo = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

            expect(addressUtils.isAddressEqual(addressOne, addressTwo)).toBeTruthy();
        });

        it('returns false when the addresses are not the same', () => {
            const addressOne = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
            const addressTwo = '0x0000000000000000000000000000000000000000';

            expect(addressUtils.isAddressEqual(addressOne, addressTwo)).toBeFalsy();
        });

        it('returns false when either of the inputs is an invalid address', () => {
            const invalidAddress = 'test';
            const validAddress = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';

            expect(addressUtils.isAddressEqual(validAddress, invalidAddress)).toBeFalsy();
            expect(addressUtils.isAddressEqual(invalidAddress, validAddress)).toBeFalsy();
            expect(addressUtils.isAddressEqual(invalidAddress, invalidAddress)).toBeFalsy();
        });

        it('returns false when some or both inputs are not defined', () => {
            const validAddress = '0x253553366Da8546fC250F225fe3d25d0C782303b';
            expect(addressUtils.isAddressEqual(undefined, validAddress)).toBeFalsy();
            expect(addressUtils.isAddressEqual(validAddress, undefined)).toBeFalsy();
            expect(addressUtils.isAddressEqual(undefined, undefined)).toBeFalsy();
        });
    });
});
