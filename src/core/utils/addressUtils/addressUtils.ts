import { type Address, getAddress, isAddress, isHash } from 'viem';

export interface IIsAddressParams {
    /**
     * Whether or not to compare the address against its checksum.
     * @default false
     */
    strict?: boolean;
}

class AddressUtils {
    /**
     * Checks if the given address is a valid address or not
     * @param address The address to be checked
     * @param options Options for the address check (@see IIsAddressParams)
     * @returns True when the given address is a valid address, false otherwise.
     */
    isAddress = (address = '', options: IIsAddressParams = { strict: false }): boolean => isAddress(address, options);

    /**
     * Truncates the input address by displaying the first and last 4 characters.
     * @param address The address to truncate
     * @returns The truncated address when the address input is valid, the address input as is otherwise.
     */
    truncateAddress = (address = ''): string => (this.isAddress(address) ? this.truncate(address, 6, 4) : address);

    /**
     * Truncates the input hash (e.g. a merkle root, transaction or block hash) by displaying the first 10 and last 8 characters.
     * @param hash The 32-byte hash to truncate
     * @returns The truncated hash when the input is a valid 32-byte hash, the input as is otherwise.
     */
    truncateHash = (hash = ''): string => (isHash(hash) ? this.truncate(hash, 10, 8) : hash);

    private truncate = (value: string, start: number, end: number): string =>
        `${value.slice(0, start)}…${value.slice(value.length - end, value.length)}`;

    /**
     * Returns the address on its checksum format
     * @param address The address to be formatted
     * @returns The address in checksum format
     */
    getChecksum = (address = ''): Address => getAddress(address);

    /**
     * Compares two addresses (ignoring checksum) to see if they are the same
     * @param addressOne The first address
     * @param addressTwo The second address
     * @returns true if the addresses are the same, false otherwise
     */
    isAddressEqual = (addressOne = '', addressTwo = ''): boolean =>
        this.isAddress(addressOne) &&
        this.isAddress(addressTwo) &&
        addressOne.toLowerCase() === addressTwo.toLowerCase();
}

export const addressUtils = new AddressUtils();
