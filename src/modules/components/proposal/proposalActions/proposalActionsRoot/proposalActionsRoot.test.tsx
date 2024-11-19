import { render, screen } from '@testing-library/react';
import { type IProposalActionsRootProps, ProposalActionsRoot } from './proposalActionsRoot';

describe('<ProposalActionsRoot /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionsRootProps>) => {
        const completeProps: IProposalActionsRootProps = { ...props };

        return <ProposalActionsRoot {...completeProps} />;
    };

    it('renders the children property', () => {
        const children = 'test';
        render(createTestComponent({ children }));
        expect(screen.getByText(children)).toBeInTheDocument();
    });
});
