import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ProposalVotingStatus } from '../../proposalUtils';
import { ProposalVotingStageContextProvider, type IProposalVotingStageContext } from '../proposalVotingStageContext';
import { ProposalVotingBodyContent, type IProposalVotingBodyContentProps } from './proposalVotingBodyContent';

describe('<ProposalVotingBodyContent /> component', () => {
    const createTestComponent = (
        props?: Partial<IProposalVotingBodyContentProps>,
        contextValues?: Partial<IProposalVotingStageContext>,
    ) => {
        const completeProps: IProposalVotingBodyContentProps = {
            status: ProposalVotingStatus.PENDING,
            name: 'Test Stage',
            bodyId: 'body1',
            ...props,
        };
        const completeContextValues: IProposalVotingStageContext = {
            startDate: 0,
            endDate: 0,
            ...contextValues,
        };

        return (
            <ProposalVotingStageContextProvider value={completeContextValues}>
                <ProposalVotingBodyContent {...completeProps} />
            </ProposalVotingStageContextProvider>
        );
    };

    it('renders null when bodyId does not match activeBody', () => {
        const bodyId = 'body1';

        const { container } = render(createTestComponent({ bodyId }));
        expect(container).toBeEmptyDOMElement();
    });

    it('renders content when bodyId matches activeBody', () => {
        const bodyId = 'body1';
        const activeBody = 'body1';
        const contextValues = {
            activeBody: activeBody,
        };

        const children = 'Test Children';

        render(createTestComponent({ bodyId, children }, contextValues));

        expect(screen.getByText(children)).toBeInTheDocument();
        expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders back button and name when bodyList has more than one element', () => {
        const bodyId = 'body1';
        const activeBody = 'body1';
        const name = 'Test Stage';
        const contextValues = {
            bodyList: ['body1', 'body2'],
            activeBody: activeBody,
        };

        render(createTestComponent({ bodyId, name }, contextValues));

        expect(screen.getByRole('button', { name: 'All bodies' })).toBeInTheDocument();
        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('does not render back button and name when bodyList has one or fewer elements', () => {
        const bodyId = 'body1';
        const activeBody = 'body1';
        const contextValues = {
            activeBody: activeBody,
        };

        render(createTestComponent({ bodyId }, contextValues));

        expect(screen.queryByRole('button', { name: 'All bodies' })).not.toBeInTheDocument();
        expect(screen.queryByText('Test Stage')).not.toBeInTheDocument();
    });

    test.each([
        { status: ProposalVotingStatus.PENDING, expectedTab: 'Details' },
        { status: ProposalVotingStatus.UNREACHED, expectedTab: 'Details' },
        { status: ProposalVotingStatus.ACTIVE, expectedTab: 'Breakdown' },
        { status: ProposalVotingStatus.ACCEPTED, expectedTab: 'Breakdown' },
        { status: ProposalVotingStatus.REJECTED, expectedTab: 'Breakdown' },
    ])('sets initial activeTab based on status', ({ status, expectedTab }) => {
        const bodyId = 'body1';
        const activeBody = 'body1';
        const contextValues = {
            activeBody: activeBody,
        };

        render(createTestComponent({ bodyId, status }, contextValues));

        const selectedTab = screen.getByRole('tab', { selected: true });
        expect(selectedTab).toHaveTextContent(expectedTab);
    });

    it('updates activeTab when status changes', () => {
        const bodyId = 'body1';
        const activeBody = 'body1';
        const contextValues = {
            activeBody: activeBody,
        };

        const { rerender } = render(
            createTestComponent({ bodyId, status: ProposalVotingStatus.PENDING }, contextValues),
        );

        let selectedTab = screen.getByRole('tab', { selected: true });
        expect(selectedTab).toHaveTextContent('Details');

        rerender(createTestComponent({ bodyId, status: ProposalVotingStatus.ACTIVE }, contextValues));

        selectedTab = screen.getByRole('tab', { selected: true });
        expect(selectedTab).toHaveTextContent('Breakdown');
    });

    it('clicking back button calls setActiveBody with undefined', async () => {
        const user = userEvent.setup();
        const bodyId = 'body1';
        const activeBody = 'body1';
        const setActiveBodyMock = jest.fn();
        const contextValues = {
            bodyList: ['body1', 'body2'],
            activeBody: activeBody,
            setActiveBody: setActiveBodyMock,
        };

        render(createTestComponent({ bodyId }, contextValues));

        const backButton = screen.getByRole('button', { name: 'All bodies' });
        await user.click(backButton);

        expect(setActiveBodyMock).toHaveBeenCalledWith(undefined);
    });

    it('does not render back button and name when bodyList is undefined', () => {
        const bodyId = 'body1';
        const activeBody = 'body1';
        const contextValues = {
            bodyList: undefined,
            activeBody: activeBody,
        };

        render(createTestComponent({ bodyId }, contextValues));

        expect(screen.queryByRole('button', { name: 'All bodies' })).not.toBeInTheDocument();
        expect(screen.queryByText('Test Stage')).not.toBeInTheDocument();
    });

    it('renders the avatar component and brand label when brandedExternal is provided', () => {
        const brandedExternal = {
            label: 'Sample Label',
            logo: 'https://example.com/sample-logo.png',
        };

        const bodyId = 'sampleBodyId';
        const activeBody = 'sampleBodyId';
        const contextValues = {
            activeBody: activeBody,
            bodyList: [bodyId, 'bodyIdTwo'],
        };

        render(createTestComponent({ bodyId, brandedExternal }, contextValues));

        expect(screen.getByText(brandedExternal.label)).toBeInTheDocument();

        const logoImage = screen.getByTestId('fallback');
        expect(logoImage).toBeInTheDocument();
    });
});
