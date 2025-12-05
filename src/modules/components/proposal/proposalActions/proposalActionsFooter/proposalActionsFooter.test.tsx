import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { modulesCopy } from '../../../../assets';
import { type IProposalActionsContext, ProposalActionsContextProvider } from '../proposalActionsContext';
import { generateProposalActionsContext } from '../proposalActionsTestUtils';
import { type IProposalActionsFooterProps, ProposalActionsFooter } from './proposalActionsFooter';

describe('<ProposalActionsFooter /> component', () => {
    const createTestComponent = (values?: {
        props?: Partial<IProposalActionsFooterProps>;
        context?: Partial<IProposalActionsContext>;
    }) => {
        const completeProps: IProposalActionsFooterProps = { ...values?.props };

        return (
            <ProposalActionsContextProvider value={generateProposalActionsContext(values?.context)}>
                <ProposalActionsFooter {...completeProps} />
            </ProposalActionsContextProvider>
        );
    };

    it('renders empty container when actions-count is 0 and children is not defined', () => {
        const context = { actionsCount: 0 };
        const props = { children: undefined };
        const { container } = render(createTestComponent({ context, props }));
        expect(container).toBeEmptyDOMElement();
    });

    it('renders the children property', () => {
        const children = 'test';
        render(createTestComponent({ props: { children } }));
        expect(screen.getByText(children)).toBeInTheDocument();
    });

    it('renders a toggle button to expand all actions when some action is not expanded', async () => {
        const setExpandedActions = jest.fn();
        const context = { expandedActions: ['0'], actionsCount: 3, setExpandedActions };
        render(createTestComponent({ context }));

        const moreButton = screen.getByRole('button', { name: modulesCopy.proposalActionsFooter.more });
        expect(moreButton).toBeInTheDocument();
        await userEvent.click(moreButton);

        const expandMenuItem = screen.getByRole('menuitem', { name: modulesCopy.proposalActionsFooter.expand });
        expect(expandMenuItem).toBeInTheDocument();
        await userEvent.click(expandMenuItem);
        expect(setExpandedActions).toHaveBeenCalledWith(['0', '1', '2']);
    });

    it('renders a toggle button to collapse all actions when all actions are expanded', async () => {
        const setExpandedActions = jest.fn();
        const context = { expandedActions: ['0', '1'], actionsCount: 2, setExpandedActions };
        render(createTestComponent({ context }));

        const moreButton = screen.getByRole('button', { name: modulesCopy.proposalActionsFooter.more });
        expect(moreButton).toBeInTheDocument();
        await userEvent.click(moreButton);

        const collapseMenuItem = screen.getByRole('menuitem', { name: modulesCopy.proposalActionsFooter.collapse });
        expect(collapseMenuItem).toBeInTheDocument();
        await userEvent.click(collapseMenuItem);
        expect(setExpandedActions).toHaveBeenCalledWith([]);
    });

    it('uses the actionIds property to expand all actions when set', async () => {
        const actionIds = ['a', 'b', 'c'];
        const setExpandedActions = jest.fn();
        const context = { expandedActions: [], actionsCount: actionIds.length, setExpandedActions };
        render(createTestComponent({ context, props: { actionIds } }));

        const moreButton = screen.getByRole('button', { name: modulesCopy.proposalActionsFooter.more });
        await userEvent.click(moreButton);

        const expandMenuItem = screen.getByRole('menuitem', { name: modulesCopy.proposalActionsFooter.expand });
        await userEvent.click(expandMenuItem);
        expect(setExpandedActions).toHaveBeenCalledWith(actionIds);
    });

    it('renders a disabled `More` button on loading state', async () => {
        const setExpandedActions = jest.fn();
        const context = {
            expandedActions: [],
            actionsCount: 3,
            setExpandedActions,
            isLoading: true,
        };
        render(createTestComponent({ context }));

        const moreButton = screen.getByRole('button', { name: modulesCopy.proposalActionsFooter.more });
        expect(moreButton).toBeDisabled();

        await userEvent.click(moreButton);
        expect(setExpandedActions).not.toHaveBeenCalled();
    });
});
