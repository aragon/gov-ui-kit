import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { modulesCopy } from '../../../../assets';
import { GukModulesProvider } from '../../../gukModulesProvider';
import { ProposalActionsContextProvider, type IProposalActionsContext } from '../proposalActionsContext';
import { ProposalActionsItem } from '../proposalActionsItem';
import { generateProposalAction, generateProposalActionsContext } from '../proposalActionsTestUtils';
import { ProposalActionsContainer, type IProposalActionsContainerProps } from './proposalActionsContainer';

describe('<ProposalActionsContainer /> component', () => {
    const createTestComponent = (values?: {
        context?: Partial<IProposalActionsContext>;
        props?: Partial<IProposalActionsContainerProps>;
    }) => {
        const completeProps: IProposalActionsContainerProps = {
            emptyStateDescription: 'test',
            ...values?.props,
        };

        return (
            <GukModulesProvider>
                <ProposalActionsContextProvider value={generateProposalActionsContext(values?.context)}>
                    <ProposalActionsContainer {...completeProps} />
                </ProposalActionsContextProvider>
            </GukModulesProvider>
        );
    };

    it('renders an empty state when actions list is empty', () => {
        const context = { actionsCount: 0 };
        const props = { emptyStateDescription: 'no-actions' };
        render(createTestComponent({ context, props }));
        expect(screen.getByText(modulesCopy.proposalActionsContainer.emptyHeader)).toBeInTheDocument();
        expect(screen.getByText(props.emptyStateDescription)).toBeInTheDocument();
    });

    it('correctly renders the proposal actions', () => {
        const children = [
            <ProposalActionsItem key={1} action={generateProposalAction()} />,
            <ProposalActionsItem key={2} action={generateProposalAction()} />,
        ];
        const context = { actionsCount: children.length };
        render(createTestComponent({ props: { children }, context }));
        expect(screen.queryByText(modulesCopy.proposalActionsContainer.emptyHeader)).not.toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(children.length);
    });

    it('updates the list of expanded actions on action click', async () => {
        const children = [
            <ProposalActionsItem key={1} action={generateProposalAction()} />,
            <ProposalActionsItem key={2} action={generateProposalAction()} />,
        ];
        const setExpandedActions = jest.fn();
        const context = { actionsCount: children.length, setExpandedActions };
        render(createTestComponent({ props: { children }, context }));
        await userEvent.click(screen.getAllByRole('button')[1]);
        expect(setExpandedActions).toHaveBeenCalledWith(['1']);
    });

    it('updates the actions-count context value using the number of child components', () => {
        const children = <ProposalActionsItem key={1} action={generateProposalAction()} />;
        const setActionsCount = jest.fn();
        const context = { setActionsCount };
        render(createTestComponent({ props: { children }, context }));
        expect(setActionsCount).toHaveBeenCalledWith(1);
    });
});
