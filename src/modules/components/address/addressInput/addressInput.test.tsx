import { QueryClient } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { Address } from 'viem';
import { mainnet } from 'viem/chains';
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
    const isAddressMock = jest.spyOn(addressUtils, 'isAddress');

    const useEnsAddressMock = jest.spyOn(wagmi, 'useEnsAddress');
    const useEnsNameMock = jest.spyOn(wagmi, 'useEnsName');

    beforeEach(() => {
        isAddressMock.mockReturnValue(true);
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
        getChecksumMock.mockReset();
        isAddressMock.mockReset();
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
        isAddressMock.mockReturnValue(false);
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

    it('calls the onChange prop with the address in checksum format when enforceChecksum prop is set to true', async () => {
        const enforceChecksum = true;
        const onChange = jest.fn();
        const value = '0x9fc3da866e7df3a1c57ade1a97c9f00a70f010c';
        getChecksumMock.mockReturnValue('0x9FC3da866e7DF3a1c57adE1a97c9f00a70f010c8');
        render(createTestComponent({ value, enforceChecksum, onChange }));
        await userEvent.type(screen.getByRole('textbox'), '8');
        expect(getChecksumMock).toHaveBeenCalledWith(`${value}8`);
        expect(onChange).toHaveBeenLastCalledWith('0x9FC3da866e7DF3a1c57adE1a97c9f00a70f010c8');
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

        await userEvent.click(screen.getByRole('textbox'));
        const clearButton = screen.getByRole('button', { name: 'Clear' });
        expect(clearButton).toBeInTheDocument();

        await user.click(clearButton);
        expect(onChange).toHaveBeenCalledWith(undefined);
    });

    it('renders a copy button to copy current input value when current value is a valid address', async () => {
        const user = userEvent.setup();
        const value = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
        render(createTestComponent({ value }));
        const copyButton = screen.getAllByRole('button').find((button) => within(button).queryByTestId(IconType.COPY));
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

    it('defaults to ENS mode when address has ENS linked (and shows address toggle button)', () => {
        const ensValue = 'vitalik.eth';
        const value = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
        const onChange = jest.fn();
        useEnsNameMock.mockReturnValue({ data: ensValue, isFetching: false } as UseEnsNameReturnType);

        render(createTestComponent({ value, onChange }));
        // Auto-switched to ENS mode -> button should show '0x …' (toggle to address)
        const addressToggleButton = screen.getByRole('button', { name: '0x …' });
        expect(addressToggleButton).toBeInTheDocument();
        // onChange should have been called with the ENS value due to initial ENS defaulting
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
        expect(screen.getByDisplayValue('0xeefB…251d')).toBeInTheDocument();
        await userEvent.click(screen.getByRole('textbox'));
        expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });

    it('does not truncate ENS name when input is not focused', async () => {
        const value = 'longensname.eth';
        isAddressMock.mockReturnValue(false);
        render(createTestComponent({ value }));
        expect(screen.getByDisplayValue(value)).toBeInTheDocument();
        await userEvent.click(screen.getByRole('textbox'));
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
        isAddressMock.mockReturnValue(false);
        const onAccept = jest.fn();
        useEnsAddressMock.mockReturnValue({ data: undefined, isFetching: false } as UseEnsAddressReturnType);
        render(createTestComponent({ value, onAccept }));
        expect(onAccept).toHaveBeenCalledWith(undefined);
    });

    it('tries to resolve address when value is ENS name even if current chain-id does not support ens names, because ENS always works on mainnet', () => {
        const value = 'vitalik.eth';
        const chainId = 137; // Polygon doesn't have ENS, but mainnet does
        render(createTestComponent({ value, chainId }));
        // ENS resolution should be enabled because mainnet is configured in defaultWagmiConfig
        const queryObject = { query: { enabled: true } };
        expect(useEnsAddressMock).toHaveBeenCalledWith(expect.objectContaining(queryObject));
    });

    it('tries to resolve ens when value is a valid address even if current chain-id does not support ens names, because ENS always works on mainnet', () => {
        const value = '0xeefb13c7d42efcc655e528da6d6f7bbcf9a2251d';
        const chainId = 137; // Polygon doesn't have ENS, but mainnet does
        render(createTestComponent({ value, chainId }));
        // ENS resolution should be enabled because mainnet is configured in defaultWagmiConfig
        const queryObject = { query: { enabled: true } };
        expect(useEnsNameMock).toHaveBeenCalledWith(expect.objectContaining(queryObject));
    });

    it('does not try to resolve ENS when mainnet is not configured in wagmi config', () => {
        const value = 'vitalik.eth';
        const chainId = 137;
        // Create a wagmi config without mainnet
        const wagmiConfigWithoutMainnet = {
            chains: [{ id: 137, contracts: {} }],
        } as unknown as wagmi.Config;
        render(createTestComponent({ value, chainId, wagmiConfig: wagmiConfigWithoutMainnet }));
        const queryObject = { query: { enabled: false } };
        expect(useEnsAddressMock).toHaveBeenCalledWith(expect.objectContaining(queryObject));
    });

    it('defaults chain-id to ethereum mainnet when not provided', () => {
        render(createTestComponent());
        expect(useEnsNameMock).toHaveBeenCalledWith(expect.objectContaining({ chainId: mainnet.id }));
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

    it('displays a critical alert when address checksum is invalid', () => {
        const value = '0xeefb13c7d42efcc655e528da6d6f7bbcf9a2251d';
        isAddressMock.mockImplementation((_, opts) => opts?.strict !== true);
        render(createTestComponent({ value }));
        expect(screen.getByRole('alert')).toHaveTextContent(/checksum/i);
        isAddressMock.mockRestore();
    });

    it('always uses mainnet chainId for ENS address resolution regardless of chainId prop', () => {
        const value = 'vitalik.eth';
        const chainId = 137; // Polygon
        isAddressMock.mockReturnValue(false);
        render(createTestComponent({ value, chainId }));

        expect(useEnsAddressMock).toHaveBeenCalledWith(
            expect.objectContaining({
                chainId: mainnet.id,
                name: 'vitalik.eth',
            }),
        );
    });

    it('always uses mainnet chainId for ENS name resolution regardless of chainId prop', () => {
        const value = '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d';
        const chainId = 137;
        render(createTestComponent({ value, chainId }));

        expect(useEnsNameMock).toHaveBeenCalledWith(
            expect.objectContaining({
                chainId: mainnet.id,
                address: value,
            }),
        );
    });

    it('uses the provided chainId for block explorer link, not the ENS chainId', () => {
        const value = '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d';
        const chainId = 137;
        render(createTestComponent({ value, chainId }));

        const linkButton = screen.getByRole<HTMLAnchorElement>('link');
        expect(linkButton).toBeInTheDocument();
        expect(linkButton.href).toEqual(`https://polygonscan.com/address/${value}`);
    });

    it('uses the correct network explorer when input is an ENS that resolves to an address', () => {
        const ens = 'alice.eth';
        const resolvedAddress: Address = '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d';
        const chainId = 137; // Polygon
        useEnsAddressMock.mockReturnValue({ data: resolvedAddress, isFetching: false } as UseEnsAddressReturnType);

        render(createTestComponent({ value: ens, chainId }));

        const linkButton = screen.getByRole<HTMLAnchorElement>('link');
        expect(linkButton).toBeInTheDocument();
        expect(linkButton.href).toEqual(`https://polygonscan.com/address/${resolvedAddress}`);
    });
});
