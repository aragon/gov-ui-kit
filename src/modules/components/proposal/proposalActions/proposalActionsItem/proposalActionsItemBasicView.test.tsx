import { render, screen } from '@testing-library/react';
import { ProposalActionType } from '../proposalActionsDefinitions';
import { generateProposalAction } from '../proposalActionsTestUtils';
import { type IProposalActionsItemBasicViewProps, ProposalActionsItemBasicView } from './proposalActionsItemBasicView';

jest.mock('../proposalActionsList', () => ({
    ProposalActionChangeMembers: () => <div data-testid="change-members-mock" />,
    ProposalActionChangeSettings: () => <div data-testid="change-settings-mock" />,
    ProposalActionTokenMint: () => <div data-testid="token-mint-mock" />,
    ProposalActionUpdateMetadata: () => <div data-testid="update-metadata-mock" />,
    ProposalActionWithdrawToken: () => <div data-testid="withdraw-token-mock" />,
}));

describe('<ProposalActionsItemBasicView /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionsItemBasicViewProps>) => {
        const completeProps: IProposalActionsItemBasicViewProps = {
            action: generateProposalAction(),
            index: 0,
            ...props,
        };

        return <ProposalActionsItemBasicView {...completeProps} />;
    };

    it('renders the custom-component when defined', () => {
        const CustomComponent = () => 'custom-component';
        render(createTestComponent({ CustomComponent }));
        expect(screen.getByText('custom-component')).toBeInTheDocument();
    });

    it('renders null when custom-component is not defined and action is not supported', () => {
        const action = generateProposalAction({ type: 'unknown' });
        const { container } = render(createTestComponent({ action }));
        expect(container).toBeInTheDocument();
    });

    it.each([
        { type: ProposalActionType.WITHDRAW_TOKEN, testId: 'withdraw-token-mock' },
        { type: ProposalActionType.TOKEN_MINT, testId: 'token-mint-mock' },
        { type: ProposalActionType.CHANGE_SETTINGS_MULTISIG, testId: 'change-settings-mock' },
        { type: ProposalActionType.CHANGE_SETTINGS_TOKENVOTE, testId: 'change-settings-mock' },
        { type: ProposalActionType.ADD_MEMBERS, testId: 'change-members-mock' },
        { type: ProposalActionType.REMOVE_MEMBERS, testId: 'change-members-mock' },
        { type: ProposalActionType.UPDATE_METADATA, testId: 'update-metadata-mock' },
    ])('renders $type component when action is of $type type', ({ type, testId }) => {
        const action = generateProposalAction({ type });
        render(createTestComponent({ action }));
        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
});
