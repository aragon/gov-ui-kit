import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Accordion, IconType } from '../../../../../core';
import { modulesCopy } from '../../../../assets';
import type { IProposalAction } from '../proposalActionsDefinitions';
import {
    generateProposalActionChangeMembers,
    generateProposalActionChangeSettings,
    generateProposalActionTokenMint,
    generateProposalActionUpdateMetadata,
    generateProposalActionWithdrawToken,
} from '../proposalActionsList';
import { generateProposalAction } from '../proposalActionsTestUtils';
import { ProposalActionsItem } from './proposalActionsItem';
import type { IProposalActionsItemProps } from './proposalActionsItem.api';

jest.mock('../actions', () => ({
    ProposalActionWithdrawToken: () => <div data-testid="withdraw-token" />,
    ProposalActionTokenMint: () => <div data-testid="token-mint" />,
    ProposalActionUpdateMetadata: () => <div data-testid="update-metadata" />,
    ProposalActionChangeMembers: () => <div data-testid="change-members" />,
    ProposalActionChangeSettings: () => <div data-testid="change-settings" />,
}));

describe('<ProposalActionsItem /> component', () => {
    const scrollIntoViewSpy = jest.spyOn(HTMLElement.prototype, 'scrollIntoView');

    afterEach(() => {
        scrollIntoViewSpy.mockReset();
    });

    const createTestComponent = (props?: Partial<IProposalActionsItemProps>) => {
        const completeProps: IProposalActionsItemProps = {
            action: generateProposalAction(),
            index: 0,
            ...props,
        };

        return (
            <Accordion.Container isMulti={true}>
                <ProposalActionsItem {...completeProps} />
            </Accordion.Container>
        );
    };

    it('renders not-verified label when action.inputData is null', () => {
        const action = generateProposalAction({ inputData: null });
        render(createTestComponent({ action }));
        expect(screen.getByText(modulesCopy.proposalActionsItem.notVerified)).toBeInTheDocument();
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

    it('updates view when dropdown value changes', async () => {
        const actionFunction = 'testFunction';
        const action = generateProposalAction({
            inputData: { function: actionFunction, contract: '', parameters: [] },
        });
        render(createTestComponent({ action }));

        await userEvent.click(screen.getByText(actionFunction));

        await userEvent.click(screen.getByText(modulesCopy.proposalActionsItem.menu.dropdownLabel));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsItem.menu.decoded));
        expect(screen.getByText(modulesCopy.proposalActionsItemDecodedView.valueHelper)).toBeInTheDocument();

        await userEvent.click(screen.getByText(modulesCopy.proposalActionsItem.menu.dropdownLabel));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsItem.menu.raw));
        expect(screen.getByText(modulesCopy.proposalActionsItemRawView.value)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsItemRawView.to)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsItemRawView.data)).toBeInTheDocument();
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
        const dropdownTrigger = screen.getByRole('button', { name: modulesCopy.proposalActionsItem.dropdownLabel });
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
