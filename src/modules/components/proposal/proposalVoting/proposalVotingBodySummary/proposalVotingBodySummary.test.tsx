import { render, screen } from '@testing-library/react';
import { type IProposalVotingStageContext, ProposalVotingStageContextProvider } from '../proposalVotingStageContext';
import { type IProposalVotingBodySummaryProps, ProposalVotingBodySummary } from './proposalVotingBoodySummary';

describe('<ProposalVotingBodySummary /> component', () => {
    const createTestComponent = (
        props?: Partial<IProposalVotingBodySummaryProps>,
        contextValues?: Partial<IProposalVotingStageContext>,
    ) => {
        const completeProps: IProposalVotingBodySummaryProps = {
            children: <div>Test Content</div>,
            ...props,
        };
        const defaultContextValues = {
            activeBody: undefined,
            setActiveBody: jest.fn(),
            bodyList: [],
            startDate: 0,
            endDate: 0,
        };

        const contextValue = { ...defaultContextValues, ...contextValues };

        return (
            <ProposalVotingStageContextProvider value={contextValue}>
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
        render(createTestComponent(undefined));
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
});
