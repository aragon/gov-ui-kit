import { QueryClient } from '@tanstack/react-query';
import { act, render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { Address } from 'viem';
import type { UseEnsAddressReturnType, UseEnsNameReturnType } from 'wagmi';
import * as wagmi from 'wagmi';
import { IconType, clipboardUtils } from '../../../../core';
import { addressUtils } from '../../../utils';
import { GukModulesProvider } from '../../gukModulesProvider';
import { AddressInput, type IAddressInputProps } from './addressInput';

jest.mock('../../member', () => ({
    MemberAvatar: () => <div data-testid="member-avatar-mock" />,
}));

describe('<AddressInput /> component', () => {
    const pasteMock = jest.spyOn(clipboardUtils, 'paste');
    const copyMock = jest.spyOn(clipboardUtils, 'copy');

    const getChecksumMock = jest.spyOn(addressUtils, 'getChecksum');

    const useEnsAddressMock = jest.spyOn(wagmi, 'useEnsAddress');
    const useEnsNameMock = jest.spyOn(wagmi, 'useEnsName');

    beforeEach(() => {
        getChecksumMock.mockImplementation((value) => value as Address);
        useEnsAddressMock.mockReturnValue({
            data: undefined,
            isFetching: false,
            queryKey: ['', {}],
        } as unknown as UseEnsAddressReturnType);
        useEnsNameMock.mockReturnValue({
            data: undefined,
            isFetching: false,
            queryKey: ['', {}],
        } as unknown as UseEnsNameReturnType);
    });

    afterEach(() => {
        pasteMock.mockReset();
        copyMock.mockReset();

        useEnsAddressMock.mockReset();
        useEnsNameMock.mockReset();
    });

    const createTestComponent = (props?: Partial<IAddressInputProps>, queryClient?: QueryClient) => {
        const completeProps = {
            ...props,
        };

        return (
            <GukModulesProvider queryClient={queryClient}>
                <AddressInput {...completeProps} />
            </GukModulesProvider>
        );
    };

    it('renders an input field', () => {
        render(createTestComponent());
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('initialises the input field using the value property', () => {
        const value = 'test.eth';
        render(createTestComponent({ value }));
        expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });

    it('calls the onChange property on input field change', async () => {
        const user = userEvent.setup();
        const input = '0';
        const onChange = jest.fn();
        render(createTestComponent({ onChange }));
        await user.type(screen.getByRole('textbox'), input);
        expect(onChange).toHaveBeenCalledWith(input);
    });

    it('renders a paste button to read and paste the user clipboard into the input field', async () => {
        const user = userEvent.setup();
        const userClipboard = 'vitalik.eth';
        pasteMock.mockResolvedValue(userClipboard);
        const onChange = jest.fn();
        render(createTestComponent({ onChange }));

        const pasteButton = screen.getByRole('button', { name: 'Paste' });
        expect(pasteButton).toBeInTheDocument();

        await user.click(pasteButton);
        expect(onChange).toHaveBeenCalledWith(userClipboard);
    });

    it('hides the paste button when input field is not empty', () => {
        const value = 'test';
        render(createTestComponent({ value }));
        expect(screen.queryByRole('button', { name: 'Paste' })).not.toBeInTheDocument();
    });

    it('renders a clear button to clear current input value when input is focused', async () => {
        const user = userEvent.setup();
        const value = 'test-value';
        const onChange = jest.fn();
        render(createTestComponent({ value, onChange }));

        act(() => screen.getByRole('textbox').focus());
        const clearButton = screen.getByRole('button', { name: 'Clear' });
        expect(clearButton).toBeInTheDocument();

        await user.click(clearButton);
        expect(onChange).toHaveBeenCalledWith(undefined);
    });

    it('renders a copy button to copy current input value when current value is a valid address', async () => {
        const user = userEvent.setup();
        const value = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
        render(createTestComponent({ value }));
        const copyButton = screen.getAllByRole('button').find((button) => within(button).findByTestId(IconType.COPY));
        expect(copyButton).toBeInTheDocument();
        await user.click(copyButton!);
        expect(copyMock).toHaveBeenCalledWith(value);
    });

    it('renders the external link button when input value is a valid address', () => {
        const value = '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d';
        render(createTestComponent({ value }));
        const linkButton = screen.getByRole<HTMLAnchorElement>('link');
        expect(linkButton).toBeInTheDocument();
        expect(linkButton.href).toEqual(`https://etherscan.io/address/${value}`);
    });

    it('renders a loader as avatar when loading the user address', () => {
        useEnsAddressMock.mockReturnValue({ isFetching: true } as UseEnsAddressReturnType);
        render(createTestComponent());
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders the avatar for the current address', () => {
        render(createTestComponent());
        expect(screen.getByTestId('member-avatar-mock')).toBeInTheDocument();
    });

    it('displays a button to display the ENS value linked to the address input when address has ENS linked', async () => {
        const user = userEvent.setup();
        const ensValue = 'vitalik.eth';
        const value = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
        const onChange = jest.fn();
        useEnsNameMock.mockReturnValue({ data: ensValue, isFetching: false } as UseEnsNameReturnType);

        render(createTestComponent({ value, onChange }));
        const ensButton = screen.getByRole('button', { name: 'ENS' });
        expect(ensButton).toBeInTheDocument();

        await user.click(ensButton);
        expect(onChange).toHaveBeenCalledWith(ensValue);
    });

    it('displays a button to display the address value linked to the ENS input when ENS is linked to an address', async () => {
        const user = userEvent.setup();
        const addressValue: Address = '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d';
        const value = 'cdixon.eth';
        const onChange = jest.fn();
        useEnsAddressMock.mockReturnValue({ data: addressValue, isFetching: false } as UseEnsAddressReturnType);

        render(createTestComponent({ value, onChange }));
        const addressButton = screen.getByRole('button', { name: '0x …' });
        expect(addressButton).toBeInTheDocument();

        await user.click(addressButton);
        expect(onChange).toHaveBeenCalledWith(addressValue);
    });

    it('displays a truncated address when address is valid and input is not focused', async () => {
        const value = '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d';
        render(createTestComponent({ value }));
        expect(screen.getByDisplayValue('0xee…251d')).toBeInTheDocument();
        act(() => screen.getByRole('textbox').focus());
        expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });

    it('displays a truncated ENS name when ENS is valid and input is not focused', async () => {
        const value = 'longensname.eth';
        render(createTestComponent({ value }));
        expect(screen.getByDisplayValue('longe…eth')).toBeInTheDocument();
        act(() => screen.getByRole('textbox').focus());
        expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });

    it('triggers the onAccept property with the normalised ENS when input value is a valid ENS and has an address linked to it', () => {
        const value = 'ViTaLiK.eth';
        const acceptedValue = { name: 'vitalik.eth', address: '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d' };
        const onAccept = jest.fn();
        useEnsAddressMock.mockReturnValue({
            data: acceptedValue.address,
            isFetching: false,
        } as UseEnsAddressReturnType);
        render(createTestComponent({ value, onAccept }));
        expect(onAccept).toHaveBeenCalledWith(acceptedValue);
    });

    it('triggers the onAccept property with the address is checksum format when input value is a valid address', () => {
        const value = '0xeefb13c7d42efcc655e528da6d6f7bbcf9a2251d';
        const acceptedValue = { name: 'vitalik.eth', address: '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d' };
        const onAccept = jest.fn();
        getChecksumMock.mockImplementation(() => acceptedValue.address as Address);
        useEnsNameMock.mockReturnValue({
            data: acceptedValue.name,
            isFetching: false,
        } as UseEnsNameReturnType);
        render(createTestComponent({ value, onAccept }));
        expect(onAccept).toHaveBeenCalledWith(acceptedValue);
    });

    it('triggers the onAccept property with undefined ENS name when input value is a valid address', () => {
        const value = '0xeefb13c7d42efcc655e528da6d6f7bbcf9a2251d';
        const onAccept = jest.fn();
        useEnsNameMock.mockReturnValue({ data: undefined, isFetching: false } as UseEnsNameReturnType);
        render(createTestComponent({ value, onAccept }));
        expect(onAccept).toHaveBeenCalledWith({ address: value, name: undefined });
    });

    it('triggers the onAccept property with undefined when input is not a valid address nor ENS', () => {
        const value = 'test';
        const onAccept = jest.fn();
        useEnsAddressMock.mockReturnValue({ data: undefined, isFetching: false } as UseEnsAddressReturnType);
        render(createTestComponent({ value, onAccept }));
        expect(onAccept).toHaveBeenCalledWith(undefined);
    });

    it('does not try to resolve address when value is ENS name but current chain-id does not support ens names', () => {
        const value = 'vitalik.eth';
        const chainId = 137;
        render(createTestComponent({ value, chainId }));
        const queryObject = { query: { enabled: false } };
        expect(useEnsAddressMock).toHaveBeenCalledWith(expect.objectContaining(queryObject));
    });

    it('does not try to resolve ens when value is a valid address but current chain-id does not support ens names', () => {
        const value = '0xeefb13c7d42efcc655e528da6d6f7bbcf9a2251d';
        const chainId = 137;
        render(createTestComponent({ value, chainId }));
        const queryObject = { query: { enabled: false } };
        expect(useEnsNameMock).toHaveBeenCalledWith(expect.objectContaining(queryObject));
    });

    it('updates the query cache with the current resolved ens/address when input address is linked to an ENS name', () => {
        const queryClient = new QueryClient();
        queryClient.setQueryData = jest.fn();
        const value = '0xeefb13c7d42efcc655e528da6d6f7bbcf9a2251d';
        const resolvedEns = 'test.eth';
        useEnsNameMock.mockReturnValue({ data: resolvedEns, isFetching: false } as UseEnsNameReturnType);
        render(createTestComponent({ value }, queryClient));
        expect(queryClient.setQueryData).toHaveBeenCalledWith(['', { name: resolvedEns }], value);
    });

    it('updates the query cache with the current resolved ens/address when input ENS is linked to an address', () => {
        const queryClient = new QueryClient();
        queryClient.setQueryData = jest.fn();
        const value = 'abc.eth';
        const resolvedAddress: Address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
        useEnsAddressMock.mockReturnValue({ data: resolvedAddress, isFetching: false } as UseEnsAddressReturnType);
        render(createTestComponent({ value }, queryClient));
        expect(queryClient.setQueryData).toHaveBeenCalledWith(['', { address: resolvedAddress }], value);
    });
});
