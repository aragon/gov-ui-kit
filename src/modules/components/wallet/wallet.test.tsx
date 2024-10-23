import { type QueryClient } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { sepolia } from 'viem/chains';
import * as wagmi from 'wagmi';
import { GukModulesProvider } from '../gukModulesProvider';
import { Wallet, type IWalletProps } from './wallet';

jest.mock('../member', () => ({
    MemberAvatar: (props: { chainId: number }) => <div data-testid="member-avatar-mock" data-chainid={props.chainId} />,
}));

jest.mock('../../utils/addressUtils', () => ({
    addressUtils: {
        getChecksum: (address: string) => address,
        truncateAddress: (address: string) => `${address?.slice(0, 4)}…${address?.slice(-4)}`,
    },
}));

describe('<Wallet /> component', () => {
    const useEnsNameMock = jest.spyOn(wagmi, 'useEnsName');

    const createTestComponent = (props?: Partial<IWalletProps>, queryClient?: QueryClient) => {
        const completeProps = {
            ...props,
        };

        return (
            <GukModulesProvider queryClient={queryClient}>
                <Wallet {...completeProps} />
            </GukModulesProvider>
        );
    };

    beforeEach(() => {
        useEnsNameMock.mockReturnValue({ data: null, isLoading: false } as wagmi.UseEnsNameReturnType);
    });

    afterEach(() => {
        useEnsNameMock.mockReset();
    });

    it('renders connect button when disconnected', () => {
        render(createTestComponent());
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Connect');
    });

    it('renders a loading indicator when loading the user ENS name', () => {
        const user = { address: '0x0987654321098765432109876543210987654321' };
        useEnsNameMock.mockReturnValue({ isLoading: true } as wagmi.UseEnsNameReturnType);
        render(createTestComponent({ user }));
        expect(screen.getByTestId('stateSkeletonBar')).toBeInTheDocument();
    });

    it('renders member avatar when connected', () => {
        const user = { address: '0x0987654321098765432109876543210987654321' };
        render(createTestComponent({ user }));
        expect(screen.getByTestId('member-avatar-mock')).toBeInTheDocument();
    });

    it('renders truncated user address when connected and user has no ENS name linked', () => {
        const user = { address: '0x0987654321098765432109876543210987654321' };
        useEnsNameMock.mockReturnValue({ data: null, isLoading: false } as wagmi.UseEnsNameReturnType);

        render(createTestComponent({ user }));
        expect(screen.getByText('0x09…4321')).toBeInTheDocument();
    });

    it('resolves and renders the linked ENS name when connected and no user name provided', () => {
        const user = { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' };
        useEnsNameMock.mockReturnValue({ data: 'vitalik.eth', isLoading: false } as wagmi.UseEnsNameReturnType);

        render(createTestComponent({ user }));
        expect(useEnsNameMock).toHaveBeenCalledWith(expect.objectContaining({ query: { enabled: true } }));
        expect(screen.getByText('vitalik.eth')).toBeInTheDocument();
        expect(screen.queryByText('0xd8…6045')).not.toBeInTheDocument();
    });

    it('renders user name provided when connected and does not resolve the ENS name', () => {
        const user = { address: '0x0987654321098765432109876543210987654321', name: 'vitalik.eth' };
        useEnsNameMock.mockReturnValue({ data: 'vitalikeviltwin.eth', isLoading: false } as wagmi.UseEnsNameReturnType);

        render(createTestComponent({ user }));
        expect(useEnsNameMock).toHaveBeenCalledWith(expect.objectContaining({ query: { enabled: false } }));
        expect(screen.getByText('vitalik.eth')).toBeInTheDocument();
        expect(screen.queryByText('0x09…4321')).not.toBeInTheDocument();
    });

    it('supports custom chainId and wagmi configurations', () => {
        const chainId = 137;
        const wagmiConfig = { chains: [sepolia] } as unknown as wagmi.Config;
        const user = { address: '0x0987654321098765432109876543210987654321' };
        render(createTestComponent({ user, chainId, wagmiConfig }));
        expect(useEnsNameMock).toHaveBeenCalledWith(expect.objectContaining({ chainId, config: wagmiConfig }));
        const avatar = screen.getByTestId('member-avatar-mock');
        expect(avatar.dataset.chainid).toEqual(chainId.toString());
    });
});
