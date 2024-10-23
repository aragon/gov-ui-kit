import { render, screen } from '@testing-library/react';
import { GukModulesProvider } from '../../../../gukModulesProvider';
import { generateProposalActionTokenMint } from '../generators';
import { ProposalActionTokenMint, type IProposalActionTokenMintProps } from './proposalActionTokenMint';

jest.mock('../../../../member/memberDataListItem/memberDataListItemStructure', () => ({
    MemberDataListItemStructure: ({ tokenAmount, tokenSymbol }: { tokenAmount: number; tokenSymbol: string }) => (
        <div data-testid="member-data-list-item">{`${tokenAmount} ${tokenSymbol}`}</div>
    ),
}));

describe('<ProposalActionTokenMint /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionTokenMintProps>) => {
        const completeProps: IProposalActionTokenMintProps = {
            action: generateProposalActionTokenMint(),
            index: 0,
            ...props,
        };

        return (
            <GukModulesProvider>
                <ProposalActionTokenMint {...completeProps} />
            </GukModulesProvider>
        );
    };

    it('renders a Member when a receiver is passed correctly', () => {
        const receiver = {
            currentBalance: '0',
            newBalance: '5',
            address: '0x32c2FE388ABbB3e678D44DF6a0471086D705316a',
        };
        const action = generateProposalActionTokenMint({ receiver });
        render(createTestComponent({ action }));
        const memberItems = screen.getByTestId('member-data-list-item');
        expect(memberItems).toBeInTheDocument();
    });

    it('renders the correct token amount being minted for the receiver', () => {
        const receiver = {
            currentBalance: '50',
            newBalance: '200',
            address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        };
        const tokenSymbol = 'PDC';
        const action = generateProposalActionTokenMint({ receiver, tokenSymbol });
        render(createTestComponent({ action }));
        expect(
            screen.getByText(`${+receiver.newBalance - +receiver.currentBalance} ${tokenSymbol}`),
        ).toBeInTheDocument();
    });

    it('does not render Voting Power label', () => {
        render(createTestComponent());
        expect(screen.queryByText('Voting Power')).not.toBeInTheDocument();
    });
});
