import { render, screen } from '@testing-library/react';
import { generateProposalAction } from '../proposalActionsList/generators/proposalAction';
import { generateProposalActionWithdrawToken } from '../proposalActionsList/proposalActionWithdrawToken/proposalActionWithdrawToken';
import { type IProposalActionWithdrawToken } from '../types';
import {
    ProposalActionsActionVerification,
    type IProposalActionsActionVerificationProps,
} from './proposalActionsActionVerification';

jest.mock('../../../../utils', () => ({
    addressUtils: { truncateAddress: jest.fn((address: string) => `truncated_${address}`) },
}));

describe('<ProposalActionsActionVerification /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionsActionVerificationProps>) => {
        const completeProps: IProposalActionsActionVerificationProps = {
            action: generateProposalAction(),
            ...props,
        };

        return <ProposalActionsActionVerification {...completeProps} />;
    };

    it('renders with warning when inputData is null', () => {
        const action = generateProposalActionWithdrawToken({ inputData: null });
        render(createTestComponent({ action }));
        expect(screen.getByTestId('WARNING')).toBeInTheDocument();
    });

    it('renders with success when inputData is present and action type is unknown', () => {
        const action = generateProposalAction({
            type: 'unknownType',
            inputData: {
                function: 'myFunction',
                contract: 'myContract',
                parameters: [],
            },
        });
        render(createTestComponent({ action }));
        expect(screen.getByTestId('SUCCESS')).toBeInTheDocument();
    });

    it('renders contract name if verified action', () => {
        const action: IProposalActionWithdrawToken = generateProposalActionWithdrawToken({
            inputData: { contract: 'contract-name', function: 'func', parameters: [] },
        });
        render(createTestComponent({ action }));
        expect(screen.getByText(action.inputData!.contract)).toBeInTheDocument();
    });
});
