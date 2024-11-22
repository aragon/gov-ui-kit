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
        const expandButton = screen.getByRole('button', { name: modulesCopy.proposalActionsFooter.expand });
        expect(expandButton).toBeInTheDocument();
        await userEvent.click(expandButton);
        expect(setExpandedActions).toHaveBeenCalledWith(['0', '1', '2']);
    });

    it('renders a toggle button to collapse all actions when all actions are expanded', async () => {
        const setExpandedActions = jest.fn();
        const context = { expandedActions: ['0', '1'], actionsCount: 2, setExpandedActions };
        render(createTestComponent({ context }));
        const expandButton = screen.getByRole('button', { name: modulesCopy.proposalActionsFooter.collapse });
        expect(expandButton).toBeInTheDocument();
        await userEvent.click(expandButton);
        expect(setExpandedActions).toHaveBeenCalledWith([]);
    });
});
