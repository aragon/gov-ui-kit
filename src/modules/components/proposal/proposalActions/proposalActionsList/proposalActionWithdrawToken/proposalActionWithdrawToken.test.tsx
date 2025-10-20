import { render, screen } from '@testing-library/react';
import { AssetTransfer } from '../../../../asset';
import { ProposalActionWithdrawToken } from './proposalActionWithdrawToken';
import type { IProposalActionWithdrawTokenProps } from './proposalActionWithdrawToken.api';
import { generateProposalActionWithdrawToken } from './proposalActionWithdrawToken.testUtils';

jest.mock('../../../../asset', () => ({ AssetTransfer: jest.fn(() => <div>Mock AssetTransfer</div>) }));

describe('<ProposalActionWithdrawToken /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionWithdrawTokenProps>) => {
        const completeProps: IProposalActionWithdrawTokenProps = {
            action: generateProposalActionWithdrawToken(),
            index: 0,
            ...props,
        };

        return <ProposalActionWithdrawToken {...completeProps} />;
    };

    it('renders the AssetTransfer component', () => {
        render(createTestComponent());
        expect(screen.getByText('Mock AssetTransfer')).toBeInTheDocument();
    });

    it('passes correct props to AssetTransfer', () => {
        const sender = { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' };
        const receiver = { address: '0x1D03D98c0aac1f83860cec5156116FE687259999' };
        const token = {
            name: 'Bitcoin',
            symbol: 'BTC',
            logo: 'btc-logo.png',
            priceUsd: '50000',
            decimals: 6,
            address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
        };
        const amount = '10';
        const action = generateProposalActionWithdrawToken({ sender, receiver, token, amount });

        render(createTestComponent({ action }));

        const lastCall = (AssetTransfer as jest.Mock).mock.calls.at(-1) as unknown[];
        expect(lastCall[0]).toEqual(
            expect.objectContaining({
                sender: action.sender,
                recipient: action.receiver,
                assetName: action.token.name,
                assetAmount: action.amount,
                assetSymbol: action.token.symbol,
                assetIconSrc: action.token.logo,
                assetAddress: action.token.address,
            }),
        );
    });
});
