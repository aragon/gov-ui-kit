import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, IconType } from '../../../../../core';
import { testLogger } from '../../../../../core/test';
import { modulesCopy } from '../../../../assets';
import { GukModulesProvider } from '../../../gukModulesProvider';
import { ProposalActionsContextProvider } from '../proposalActionsContext';
import type * as ProposalActionsDecoder from '../proposalActionsDecoder';
import { ProposalActionsDecoderMode, ProposalActionsDecoderView } from '../proposalActionsDecoder';
import { generateProposalAction, generateProposalActionsContext } from '../proposalActionsTestUtils';
import { ProposalActionsItem } from './proposalActionsItem';
import type { IProposalActionsItemProps } from './proposalActionsItem.api';
import { proposalActionsItemUtils } from './proposalActionsItemUtils';

jest.mock('../proposalActionsDecoder', () => ({
    ...jest.requireActual<typeof ProposalActionsDecoder>('../proposalActionsDecoder'),
    ProposalActionsDecoder: (props: { mode: string; view: string }) => (
        <div data-testid="decoder-mock" data-mode={props.mode} data-view={props.view} />
    ),
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
            <GukModulesProvider>
                <ProposalActionsContextProvider value={generateProposalActionsContext()}>
                    <Accordion.Container isMulti={true}>
                        <ProposalActionsItem {...completeProps} />
                    </Accordion.Container>
                </ProposalActionsContextProvider>
            </GukModulesProvider>
        );
    };

    it('throws error when index property is not defined', () => {
        testLogger.suppressErrors();
        const index = undefined;
        expect(() => render(createTestComponent({ index }))).toThrow();
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

    it('defaults the view-mode to raw and read mode when action has no custom component and is not verified', async () => {
        const action = generateProposalAction({ inputData: null });
        render(createTestComponent({ action }));
        await userEvent.click(screen.getByRole('button'));
        const actionDecoder = screen.getByTestId('decoder-mock');
        expect(actionDecoder.dataset.view).toEqual(ProposalActionsDecoderView.RAW);
        expect(actionDecoder.dataset.mode).toEqual(ProposalActionsDecoderMode.READ);
    });

    it('defaults the view-mode to decoded and read mode when action has no custom component, is verified but has no parameters', async () => {
        const action = generateProposalAction({ inputData: { function: '', contract: '', parameters: [] } });
        render(createTestComponent({ action }));
        await userEvent.click(screen.getByRole('button'));
        const actionDecoder = screen.getByTestId('decoder-mock');
        expect(actionDecoder.dataset.view).toEqual(ProposalActionsDecoderView.DECODED);
        expect(actionDecoder.dataset.mode).toEqual(ProposalActionsDecoderMode.READ);
    });

    it('defaults the view-mode to decoded and read mode when action has no custom component, is verified and has parameters', async () => {
        const params = [{ name: 'test', type: 'uint', value: '' }];
        const action = generateProposalAction({ inputData: { function: '', contract: '', parameters: params } });
        render(createTestComponent({ action }));
        await userEvent.click(screen.getByRole('button'));
        const actionDecoder = screen.getByTestId('decoder-mock');
        expect(actionDecoder.dataset.view).toEqual(ProposalActionsDecoderView.DECODED);
        expect(actionDecoder.dataset.mode).toEqual(ProposalActionsDecoderMode.READ);
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

    it('renders a warning icon and alert when action value is not zero and action is not a native transfer', async () => {
        const action = generateProposalAction({ value: '1000000000000000000', data: '0xabc' });
        render(createTestComponent({ action, chainId: 137 }));
        expect(screen.getByTestId(IconType.WARNING)).toBeInTheDocument();
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByText(modulesCopy.proposalActionsItem.nativeSendAlert)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsItem.nativeSendDescription('1', 'POL')));
    });

    it('updates active view on view-mode change', async () => {
        const params = [{ name: 'amount', type: 'uint', value: null }];
        const action = generateProposalAction({ inputData: { contract: '', function: '', parameters: params } });
        render(createTestComponent({ action }));
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByTestId('decoder-mock').dataset.view).toEqual(ProposalActionsDecoderView.DECODED);

        await userEvent.click(screen.getByRole('button', { name: modulesCopy.proposalActionsItem.menu.dropdownLabel }));
        await userEvent.click(screen.getByRole('menuitem', { name: modulesCopy.proposalActionsItem.menu.RAW }));
        expect(screen.getByTestId('decoder-mock').dataset.view).toEqual(ProposalActionsDecoderView.RAW);
    });

    it('renders movement controls in edit mode when movementControls property is set', () => {
        const moveUpMock = jest.fn();
        const moveDownMock = jest.fn();
        const removeMock = jest.fn();
        const movementControls = {
            moveUp: { label: 'Move up', onClick: moveUpMock, disabled: false },
            moveDown: { label: 'Move down', onClick: moveDownMock, disabled: false },
            remove: { label: 'Remove', onClick: removeMock, disabled: false },
        };
        const action = generateProposalAction();
        render(createTestComponent({ movementControls, action, editMode: true, actionCount: 3, index: 1 }));

        // Check remove button in header is visible
        expect(screen.getByTestId(IconType.CLOSE)).toBeInTheDocument();

        // Check that movement controls icons are rendered (there should be at least one of each)
        expect(screen.getAllByTestId(IconType.CHEVRON_UP).length).toBeGreaterThan(0);
        expect(screen.getAllByTestId(IconType.CHEVRON_DOWN).length).toBeGreaterThan(0);

        // Check action counter is rendered
        expect(screen.getByText('2 of 3')).toBeInTheDocument();
    });

    it('forces the action content to be displayed on edit mode to register all form fields', () => {
        render(createTestComponent({ editMode: true }));
        expect(screen.getByTestId('decoder-mock')).toBeInTheDocument();
    });

    it('renders the decoded-view in edit mode when editMode prop is true and action does not support basic view', () => {
        const params = [{ name: 'param', type: 'address', value: '' }];
        const action = generateProposalAction({ inputData: { contract: '', function: '', parameters: params } });
        isActionSupportedSpy.mockReturnValue(false);
        render(createTestComponent({ action, editMode: true }));
        expect(screen.getByTestId('decoder-mock').dataset.view).toEqual(ProposalActionsDecoderView.DECODED);
        expect(screen.getByTestId('decoder-mock').dataset.mode).toEqual(ProposalActionsDecoderMode.EDIT);
    });

    it('renders the decoded-view in watch mode when editMode prop is true and action supports basic view', async () => {
        const params = [{ name: 'amount', type: 'uint', value: null }];
        const action = generateProposalAction({ inputData: { contract: '', function: '', parameters: params } });
        isActionSupportedSpy.mockReturnValue(true);
        render(createTestComponent({ action, editMode: true }));
        await userEvent.click(screen.getByRole('button', { name: modulesCopy.proposalActionsItem.menu.dropdownLabel }));
        await userEvent.click(screen.getByRole('menuitem', { name: modulesCopy.proposalActionsItem.menu.DECODED }));
        expect(screen.getByTestId('decoder-mock').dataset.mode).toEqual(ProposalActionsDecoderMode.WATCH);
    });

    it('renders the raw-view in edit mode when editMode prop is true and action has no abi available', () => {
        const action = generateProposalAction({ inputData: null });
        isActionSupportedSpy.mockReturnValue(false);
        render(createTestComponent({ action, editMode: true }));
        expect(screen.getByTestId('decoder-mock').dataset.view).toEqual(ProposalActionsDecoderView.RAW);
        expect(screen.getByTestId('decoder-mock').dataset.mode).toEqual(ProposalActionsDecoderMode.EDIT);
    });

    it('renders the raw-view in watch mode when editMode prop is true and action supports decoded view', async () => {
        const params = [{ name: 'amount', type: 'uint', value: null }];
        const action = generateProposalAction({ inputData: { contract: '', function: '', parameters: params } });
        isActionSupportedSpy.mockReturnValue(true);
        render(createTestComponent({ action, editMode: true }));
        await userEvent.click(screen.getByRole('button', { name: modulesCopy.proposalActionsItem.menu.dropdownLabel }));
        await userEvent.click(screen.getByRole('menuitem', { name: modulesCopy.proposalActionsItem.menu.RAW }));
        expect(screen.getByTestId('decoder-mock').dataset.mode).toEqual(ProposalActionsDecoderMode.WATCH);
    });
});
