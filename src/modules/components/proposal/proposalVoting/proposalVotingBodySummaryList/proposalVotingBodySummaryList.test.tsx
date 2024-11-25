import { render, screen } from '@testing-library/react';
import { type IProposalVotingStageContext, ProposalVotingStageContextProvider } from '../proposalVotingStageContext';
import {
    type IProposalVotingBodySummaryListProps,
    ProposalVotingBodySummaryList,
} from './proposalVotingBodySummaryList';

describe('<ProposalVotingBodySummaryList /> component', () => {
    const createTestComponent = (
        props?: Partial<IProposalVotingBodySummaryListProps>,
        contextValues?: Partial<IProposalVotingStageContext>,
    ) => {
        const completeProps: IProposalVotingBodySummaryListProps = {
            children: <div>Test Body</div>,
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
                <ProposalVotingBodySummaryList {...completeProps} />
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
        expect(screen.getByText('Test Body')).toBeInTheDocument();
    });
});
