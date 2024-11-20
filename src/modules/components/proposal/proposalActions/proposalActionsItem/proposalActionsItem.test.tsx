import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, IconType } from '../../../../../core';
import { testLogger } from '../../../../../core/test';
import { modulesCopy } from '../../../../assets';
import { generateProposalAction } from '../proposalActionsTestUtils';
import { ProposalActionsItem } from './proposalActionsItem';
import type { IProposalActionsItemProps } from './proposalActionsItem.api';
import { proposalActionsItemUtils } from './proposalActionsItemUtils';

jest.mock('./proposalActionsItemRawView', () => ({
    ProposalActionsItemRawView: () => <div data-testid="raw-view-mock" />,
}));

jest.mock('./proposalActionsItemDecodedView', () => ({
    ProposalActionsItemDecodedView: () => <div data-testid="decoded-view-mock" />,
}));

jest.mock('./proposalActionsItemBasicView', () => ({
    ProposalActionsItemBasicView: () => <div data-testid="basic-view-mock" />,
}));

describe('<ProposalActionsItem /> component', () => {
    const scrollIntoViewSpy = jest.spyOn(HTMLElement.prototype, 'scrollIntoView');
    const isActionSupportedSpy = jest.spyOn(proposalActionsItemUtils, 'isActionSupported');

    afterEach(() => {
        scrollIntoViewSpy.mockReset();
        isActionSupportedSpy.mockReset();
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

    it('throws error when index property is not defined', () => {
        testLogger.suppressErrors();
        const index = undefined;
        expect(() => render(createTestComponent({ index }))).toThrow();
    });

    it('renders the function name when smart contract is verified', () => {
        const functionName = 'mintTokens';
        const action = generateProposalAction({ inputData: { function: functionName, contract: '', parameters: [] } });
        render(createTestComponent({ action }));
        expect(screen.getByText(functionName)).toBeInTheDocument();
    });

    it('renders a not-verified label for function name when smart contract is not verified', () => {
        const action = generateProposalAction({ inputData: undefined });
        render(createTestComponent({ action }));
        expect(screen.getByText(modulesCopy.proposalActionsItem.notVerified.function)).toBeInTheDocument();
    });

    it('renders the contract name when smart contract is verified', () => {
        const contractName = 'Uniswap';
        const action = generateProposalAction({ inputData: { function: '', contract: contractName, parameters: [] } });
        render(createTestComponent({ action }));
        expect(screen.getByText(contractName)).toBeInTheDocument();
    });

    it('renders a not-verified label for contract name when smart contract is not verified', () => {
        const action = generateProposalAction({ inputData: undefined });
        render(createTestComponent({ action }));
        expect(screen.getByText(modulesCopy.proposalActionsItem.notVerified.contract)).toBeInTheDocument();
    });

    it('renders the truncated address of the action target', () => {
        const to = '0xF26a23f3E7B88e93A16970B74Ae6599d2993690F';
        const action = generateProposalAction({ to });
        render(createTestComponent({ action }));
        expect(screen.getByText('0xF2…690F')).toBeInTheDocument();
    });

    it('renders the action on an accordion and expands it on click', async () => {
        render(createTestComponent());
        const actionButton = screen.getByRole('button');
        expect(actionButton).toBeInTheDocument();
        expect(actionButton.dataset.state).toEqual('closed');
        await userEvent.click(actionButton);
        expect(actionButton.dataset.state).toEqual('open');
    });

    it('renders a dropdown to switch the action view mode inside the action', async () => {
        render(createTestComponent());
        await userEvent.click(screen.getByRole('button'));
        expect(
            screen.getByRole('button', { name: modulesCopy.proposalActionsItem.menu.dropdownLabel }),
        ).toBeInTheDocument();
    });

    it('defaults the view-mode to raw when action has no custom component and is not verified', async () => {
        const action = generateProposalAction({ inputData: null });
        render(createTestComponent({ action }));
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByTestId('raw-view-mock')).toBeInTheDocument();
    });

    it('defaults the view-mode to decoded when action has no custom component and is verified', async () => {
        const action = generateProposalAction({ inputData: { function: '', contract: '', parameters: [] } });
        render(createTestComponent({ action }));
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByTestId('decoded-view-mock')).toBeInTheDocument();
    });

    it('defaults the view-mode to basic when action is supported', async () => {
        isActionSupportedSpy.mockReturnValue(true);
        const action = generateProposalAction();
        render(createTestComponent({ action }));
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByTestId('basic-view-mock')).toBeInTheDocument();
    });

    it('defaults the view-mode to basic when CustomComponent is defined', async () => {
        const CustomComponent = () => 'custom';
        const action = generateProposalAction();
        render(createTestComponent({ action, CustomComponent }));
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByTestId('basic-view-mock')).toBeInTheDocument();
    });

    it('renders a warning icon when action smart contract is not verified', () => {
        const action = generateProposalAction();
        render(createTestComponent({ action }));
        expect(screen.getByTestId(IconType.WARNING)).toBeInTheDocument();
    });

    it('renders a critical icon and alert when action value is not zero and action is not a native transfer', async () => {
        const action = generateProposalAction({ value: '1000000000000000000', data: '0xabc' });
        render(createTestComponent({ action }));
        expect(screen.getByTestId(IconType.CRITICAL)).toBeInTheDocument();
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByText(modulesCopy.proposalActionsItem.nativeSendAlert)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsItem.nativeSendDescription('1')));
    });

    it('updates active view on view-mode change', async () => {
        const action = generateProposalAction({ inputData: { contract: '', function: '', parameters: [] } });
        render(createTestComponent({ action }));
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByTestId('decoded-view-mock')).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: modulesCopy.proposalActionsItem.menu.dropdownLabel }));
        await userEvent.click(screen.getByRole('menuitem', { name: modulesCopy.proposalActionsItem.menu.RAW }));
        expect(screen.getByTestId('raw-view-mock')).toBeInTheDocument();
    });

    it('renders a dropdown with the specified items when the dropdownItems property is set', async () => {
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
