import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Accordion, IconType } from '../../../../../core';
import { modulesCopy } from '../../../../assets';
import {
    generateProposalActionChangeMembers,
    generateProposalActionChangeSettings,
    generateProposalActionTokenMint,
    generateProposalActionUpdateMetadata,
} from '../actions/generators';
import { generateProposalAction } from '../actions/generators/proposalAction';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import type { IProposalAction } from '../proposalActionsTypes';
import { ProposalActionsAction, type IProposalActionsActionProps } from './proposalActionsAction';

jest.mock('../actions', () => ({
    ProposalActionWithdrawToken: () => <div data-testid="withdraw-token" />,
    ProposalActionTokenMint: () => <div data-testid="token-mint" />,
    ProposalActionUpdateMetadata: () => <div data-testid="update-metadata" />,
    ProposalActionChangeMembers: () => <div data-testid="change-members" />,
    ProposalActionChangeSettings: () => <div data-testid="change-settings" />,
}));

describe('<ProposalActionsAction /> component', () => {
    const scrollIntoViewSpy = jest.spyOn(HTMLElement.prototype, 'scrollIntoView');

    afterEach(() => {
        scrollIntoViewSpy.mockReset();
    });

    const createTestComponent = (props?: Partial<IProposalActionsActionProps>) => {
        const completeProps: IProposalActionsActionProps = {
            action: generateProposalAction(),
            index: 0,
            ...props,
        };

        return (
            <Accordion.Container isMulti={true}>
                <ProposalActionsAction {...completeProps} />
            </Accordion.Container>
        );
    };

    it('renders not-verified label when action.inputData is null', () => {
        const action = generateProposalActionWithdrawToken({ inputData: null });
        render(createTestComponent({ action }));
        expect(screen.getByText(modulesCopy.proposalActionsAction.notVerified)).toBeInTheDocument();
    });

    it('renders custom action component when provided', async () => {
        const CustomComponent = (props: { action: IProposalAction }) => props.action.type;
        const action = generateProposalAction({
            type: 'customType',
            inputData: { function: 'transfer', contract: 'DAI', parameters: [] },
        });

        render(createTestComponent({ action, CustomComponent }));

        await userEvent.click(screen.getByText('transfer'));
        expect(screen.getByText(action.type)).toBeInTheDocument();
    });

    it('renders action name when provided and contract is verified', () => {
        const action = generateProposalAction({ inputData: { function: '', contract: '', parameters: [] } });
        const name = 'Custom Action Name';
        render(createTestComponent({ name, action }));
        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('updates view when dropdown value changes', async () => {
        const action = generateProposalAction({ inputData: { function: '', contract: '', parameters: [] } });
        const name = 'Custom Action Name';
        render(createTestComponent({ action, name }));

        await userEvent.click(screen.getByText(name));

        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.decoded));
        expect(screen.getByText(modulesCopy.proposalActionsActionDecodedView.valueHelper)).toBeInTheDocument();

        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.raw));
        expect(screen.getByText(modulesCopy.proposalActionsActionRawView.value)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsActionRawView.to)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsActionRawView.data)).toBeInTheDocument();
    });

    it('calls scrollIntoView when changing dropdown value', async () => {
        const action = generateProposalAction({
            inputData: { function: 'myFunction', contract: 'myContract', parameters: [] },
        });
        const name = 'Custom Action Name';
        render(createTestComponent({ action, name }));

        await userEvent.click(screen.getByText(name));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.raw));
        expect(scrollIntoViewSpy).toHaveBeenCalled();
    });

    it.each([
        { action: generateProposalActionWithdrawToken(), testId: 'withdraw-token' },
        { action: generateProposalActionTokenMint(), testId: 'token-mint' },
        { action: generateProposalActionUpdateMetadata(), testId: 'update-metadata' },
        { action: generateProposalActionChangeMembers(), testId: 'change-members' },
        { action: generateProposalActionChangeSettings(), testId: 'change-settings' },
    ])('renders correct UI for $testId action', async ({ action, testId }) => {
        render(createTestComponent({ action }));
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('renders an alert when action has value is not "0" and is not a native transfer', async () => {
        const action = generateProposalAction({ value: '1000000000000000000', data: 'some-data' });
        render(createTestComponent({ action }));

        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('does not render an alert when action has value but it is a native transfer', async () => {
        const action = generateProposalAction({ value: '0', data: '0x' });
        render(createTestComponent({ action }));

        await userEvent.click(screen.getByRole('button'));
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('renders the dropdown with the specified items when the dropdownItems property is set', async () => {
        const dropdownItems = [
            { label: 'Select', icon: IconType.APP_ASSETS, onClick: jest.fn() },
            { label: 'Edit', icon: IconType.APP_TRANSACTIONS, onClick: jest.fn() },
        ];
        const action = generateProposalAction();
        render(createTestComponent({ dropdownItems, action }));

        await userEvent.click(screen.getByRole('button'));
        const dropdownTrigger = screen.getByRole('button', { name: modulesCopy.proposalActionsAction.dropdownLabel });
        expect(dropdownTrigger).toBeInTheDocument();
        await userEvent.click(dropdownTrigger);

        const dropdownItem = screen.getByRole('menuitem', { name: dropdownItems[0].label });
        expect(dropdownItem).toBeInTheDocument();
        expect(screen.getByTestId(dropdownItems[0].icon)).toBeInTheDocument();

        expect(screen.getByRole('menuitem', { name: dropdownItems[1].label })).toBeInTheDocument();
        expect(screen.getByTestId(dropdownItems[1].icon)).toBeInTheDocument();

        await userEvent.click(dropdownItem);
        expect(dropdownItems[0].onClick).toHaveBeenCalledWith(action, 0);
    });
});
