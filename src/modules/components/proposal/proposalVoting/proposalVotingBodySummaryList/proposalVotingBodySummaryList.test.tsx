import { render, screen } from '@testing-library/react';
import {
    ProposalVotingBodySummaryList,
    type IProposalVotingBodySummaryListProps,
} from './proposalVotingBodySummaryList';

describe('<ProposalVotingBodySummaryList /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingBodySummaryListProps>) => {
        const completeProps: IProposalVotingBodySummaryListProps = {
            children: 'Test Body',
            ...props,
        };

        return <ProposalVotingBodySummaryList {...completeProps} />;
    };

    it('renders children', () => {
        render(createTestComponent({ children: 'Test Content' }));
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
});
