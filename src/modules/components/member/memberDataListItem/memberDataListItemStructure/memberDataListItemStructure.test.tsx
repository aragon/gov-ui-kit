import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as wagmi from 'wagmi';
import { MemberDataListItemStructure, type IMemberDataListItemProps } from './memberDataListItemStructure';

jest.mock('../../memberAvatar', () => ({ MemberAvatar: () => <div data-testid="member-avatar-mock" /> }));

describe('<MemberDataListItem /> component', () => {
    const useAccountMock = jest.spyOn(wagmi, 'useAccount');

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- wagmi v2/v3 compatibility
        useAccountMock.mockReturnValue({} as wagmi.UseAccountReturnType);
    });

    afterEach(() => {
        useAccountMock.mockReset();
    });

    const createTestComponent = (props?: Partial<IMemberDataListItemProps>) => {
        const completeProps: IMemberDataListItemProps = {
            address: '0x1234567890123456789012345678901234567890',
            ...props,
        };

        return <MemberDataListItemStructure {...completeProps} />;
    };

    it('renders the member avatar', () => {
        render(createTestComponent());
        const avatar = screen.getByTestId('member-avatar-mock');
        expect(avatar).toBeInTheDocument();
    });

    it('renders a delegate tag when isDelegate property is set to true', () => {
        const address = '0x0987654321098765432109876543210987654321';
        render(createTestComponent({ isDelegate: true, address }));
        expect(screen.getByText('Your Delegate')).toBeInTheDocument();
    });

    it('renders the member ENS user handle instead of address if provided', () => {
        const ensName = 'testUserHandle';
        const address = '0x000000633b68f5D8D3a86593ebB815b4663BCBe0';
        render(createTestComponent({ ensName }));
        expect(screen.getByRole('heading', { name: ensName })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: address })).not.toBeInTheDocument();
    });

    it('renders and formats the delegation count of the member when defined', () => {
        const { rerender } = render(createTestComponent({ delegationCount: 340 }));
        expect(screen.getByRole('heading', { level: 3, name: '340 Delegations' })).toBeInTheDocument();

        rerender(createTestComponent({ delegationCount: 2959 }));
        expect(screen.getByRole('heading', { level: 3, name: '2.96K Delegations' })).toBeInTheDocument();
    });

    it('renders the token amount of the member when not null', () => {
        const tokenAmount = 0;
        const tokenSymbol = 'PDC';
        render(createTestComponent({ tokenAmount, tokenSymbol }));
        expect(screen.getByRole('heading', { level: 3, name: '0 PDC Voting Power' })).toBeInTheDocument();
    });

    it('renders and formats the voting power of the member', () => {
        const tokenAmount = 420689;
        const tokenSymbol = 'ETH';
        render(createTestComponent({ tokenAmount, tokenSymbol }));
        expect(screen.getByRole('heading', { level: 3, name: '420.69K ETH Voting Power' })).toBeInTheDocument();
    });

    it('renders a you tag when the user is the current connected account', () => {
        const address = '0x50ce432B38eE98dE5Fa375D5125aA6d0d054E662';
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- wagmi v2/v3 compatibility
        useAccountMock.mockReturnValue({ isConnected: true, address } as unknown as wagmi.UseAccountReturnType);
        render(createTestComponent({ address }));
        expect(screen.getByText('You')).toBeInTheDocument();
    });

    it('hides the voting power label when hideLabelTokenVoting is true', () => {
        render(createTestComponent({ hideLabelTokenVoting: true }));
        expect(screen.queryByText('Voting Power')).not.toBeInTheDocument();
    });

    it('displays the correct token symbol', () => {
        const tokenAmount = 1000;
        const tokenSymbol = 'XYZ';
        render(createTestComponent({ tokenAmount, tokenSymbol }));
        expect(screen.getByRole('heading', { level: 3, name: '1K XYZ Voting Power' })).toBeInTheDocument();
    });
});
