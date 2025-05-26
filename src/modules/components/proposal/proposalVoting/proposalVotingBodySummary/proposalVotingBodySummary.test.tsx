import { render, screen } from '@testing-library/react';
import * as useProposalVotingContext from '../proposalVotingContext';
import { type IProposalVotingBodySummaryProps, ProposalVotingBodySummary } from './proposalVotingBodySummary';

describe('<ProposalVotingBodySummary /> component', () => {
    const useProposalVotingContextSpy = jest.spyOn(useProposalVotingContext, 'useProposalVotingContext');

    beforeEach(() => {
        useProposalVotingContextSpy.mockReturnValue({});
    });

    afterEach(() => {
        useProposalVotingContextSpy.mockReset();
    });

    const createTestComponent = (props?: Partial<IProposalVotingBodySummaryProps>) => {
        const completeProps: IProposalVotingBodySummaryProps = { ...props };

        return <ProposalVotingBodySummary {...completeProps} />;
    };

    it('renders null when activeBody is set', () => {
        const children = 'test';
        useProposalVotingContextSpy.mockReturnValue({ activeBody: 'body-1' });
        const { container } = render(createTestComponent({ children }));
        expect(container).toBeEmptyDOMElement();
    });

    it('renders children when activeBody is undefined', () => {
        const children = 'Some content';
        render(createTestComponent({ children }));
        expect(screen.getByText(children)).toBeInTheDocument();
    });
});
