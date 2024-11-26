import { render, screen } from '@testing-library/react';
import {
    ProposalVotingBodySummaryList,
    type IProposalVotingBodySummaryListProps,
} from './proposalVotingBodySummaryList';

describe('<ProposalVotingBodySummaryList /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingBodySummaryListProps>) => {
        const completeProps: IProposalVotingBodySummaryListProps = {
            children: <div>Test Body</div>,
            ...props,
        };

        return <ProposalVotingBodySummaryList {...completeProps} />;
    };

    it('renders children', () => {
        render(createTestComponent());
        expect(screen.getByText('Test Body')).toBeInTheDocument();
    });

    it('renders multiple children', () => {
        const multipleChildren = (
            <div>
                <div>Child 1</div>
                <div>Child 2</div>
                <div>Child 3</div>
            </div>
        );
        render(createTestComponent({ children: multipleChildren }));
        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
        expect(screen.getByText('Child 3')).toBeInTheDocument();
    });
});
