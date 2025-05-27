import { render, screen } from '@testing-library/react';
import {
    ProposalVotingBodySummaryList,
    type IProposalVotingBodySummaryListProps,
} from './proposalVotingBodySummaryList';

describe('<ProposalVotingBodySummaryList /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingBodySummaryListProps>) => {
        const completeProps: IProposalVotingBodySummaryListProps = { ...props };

        return <ProposalVotingBodySummaryList {...completeProps} />;
    };

    it('renders the children property', () => {
        const children = 'test content';
        render(createTestComponent({ children }));
        expect(screen.getByText(children)).toBeInTheDocument();
    });
});
