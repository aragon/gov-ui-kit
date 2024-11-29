import { render, screen } from '@testing-library/react';
import { type IProposalVotingStageContext, ProposalVotingStageContextProvider } from '../proposalVotingStageContext';
import { type IProposalVotingBodySummaryProps, ProposalVotingBodySummary } from './proposalVotingBodySummary';

describe('<ProposalVotingBodySummary /> component', () => {
    const createTestComponent = (
        props?: Partial<IProposalVotingBodySummaryProps>,
        contextValues?: Partial<IProposalVotingStageContext>,
    ) => {
        const completeProps: IProposalVotingBodySummaryProps = {
            children: 'Test Content',
            ...props,
        };

        const completeContextValues: IProposalVotingStageContext = {
            startDate: 0,
            endDate: 0,
            ...contextValues,
        };

        return (
            <ProposalVotingStageContextProvider value={completeContextValues}>
                <ProposalVotingBodySummary {...completeProps} />
            </ProposalVotingStageContextProvider>
        );
    };

    it('renders null when activeBody is set', () => {
        const contextValues = { activeBody: 'body1' };
        const { container } = render(createTestComponent(undefined, contextValues));
        expect(container).toBeEmptyDOMElement();
    });

    it('renders children when activeBody is undefined', () => {
        render(createTestComponent({ children: 'Some content' }));
        expect(screen.getByText('Some content')).toBeInTheDocument();
    });
});
