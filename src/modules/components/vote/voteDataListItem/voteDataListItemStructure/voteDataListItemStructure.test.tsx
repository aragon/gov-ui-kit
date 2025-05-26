import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as viem from 'viem';
import * as wagmi from 'wagmi';
import { NumberFormat, formatterUtils } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import { VoteDataListItemStructure, type IVoteDataListItemStructureProps } from '../../voteDataListItem';

jest.mock('../../../../../core/components/tag', () => ({
    Tag: ({ label }: { label: string }) => <div data-testid="tag">{label}</div>,
}));

jest.mock('../../../member', () => ({ MemberAvatar: () => <div data-testid="member-avatar" /> }));

describe('<VoteDataListItemStructure /> component', () => {
    const isAddressSpy = jest.spyOn(viem, 'isAddress');
    const getAddressSpy = jest.spyOn(viem, 'getAddress');
    const useAccountSpy = jest.spyOn(wagmi, 'useAccount');

    const createTestComponent = (props?: Partial<IVoteDataListItemStructureProps>) => {
        const completeProps: IVoteDataListItemStructureProps = {
            voter: { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' },
            voteIndicator: 'yes',
            ...props,
        };

        return <VoteDataListItemStructure {...completeProps} />;
    };

    beforeEach(() => {
        isAddressSpy.mockImplementation(() => true);
        getAddressSpy.mockImplementation((address: string) => `0x${address}`);
        useAccountSpy.mockReturnValue({
            address: '0x1234567890123456789012345678901234567890' as viem.Address,
            isConnected: true,
        } as wagmi.UseAccountReturnType);
    });

    afterEach(() => {
        isAddressSpy.mockReset();
        getAddressSpy.mockReset();
        useAccountSpy.mockReset();
    });

    it('renders the vote and the voter information', () => {
        const voter = { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' };
        const voteIndicator = 'no';
        render(createTestComponent({ voter, voteIndicator }));
        const formattedAddress = addressUtils.truncateAddress(voter.address);

        expect(screen.getByTestId('member-avatar')).toBeInTheDocument();
        expect(screen.getByText(formattedAddress)).toBeInTheDocument();
        expect(screen.getByTestId('tag')).toHaveTextContent('No');
    });

    it('renders the formatted token vote amount and symbol', () => {
        const votingPower = 50000;
        const tokenSymbol = 'WIP';
        const formattedTokenNumber = formatterUtils.formatNumber(votingPower, {
            format: NumberFormat.TOKEN_AMOUNT_SHORT,
        })!;

        render(createTestComponent({ votingPower, tokenSymbol }));

        expect(screen.getByText(`${formattedTokenNumber} ${tokenSymbol}`)).toBeInTheDocument();
    });

    it('renders the voter name if available', () => {
        const voter = { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E', name: 'John Doe' };
        render(createTestComponent({ voter }));

        expect(screen.getByText(voter.name)).toBeInTheDocument();
    });

    it('renders the "You" tag if the voter is the current user', () => {
        const voter = { address: '0x1234567890123456789012345678901234567890' };
        useAccountSpy.mockReturnValue({ address: voter.address, isConnected: true } as wagmi.UseAccountReturnType);

        render(createTestComponent({ voter }));

        expect(screen.getByText('You')).toBeInTheDocument();
    });

    it('renders "Your delegate" tag if the voter is a delegate of the current user', () => {
        const voter = { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' };
        const isDelegate = true;
        render(createTestComponent({ voter, isDelegate }));

        expect(screen.getByText('Your delegate')).toBeInTheDocument();
    });

    it('renders the custom confirmation label', () => {
        const confirmationLabel = 'Voted';
        render(createTestComponent({ confirmationLabel }));

        expect(screen.getByText(confirmationLabel)).toBeInTheDocument();
    });

    it('renders the vote indicator description if provided', () => {
        const voteIndicatorDescription = 'to approve';
        render(createTestComponent({ voteIndicatorDescription }));

        expect(screen.getByText(voteIndicatorDescription)).toBeInTheDocument();
    });
});
