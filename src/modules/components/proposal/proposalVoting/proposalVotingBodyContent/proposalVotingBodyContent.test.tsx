import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { modulesCopy } from '../../../../assets';
import { ProposalStatus } from '../../proposalUtils';
import { ProposalVotingStageContextProvider, type IProposalVotingStageContext } from '../proposalVotingStageContext';
import { ProposalVotingBodyContent, type IProposalVotingBodyContentProps } from './proposalVotingBodyContent';

jest.mock('../../../../../core/components/avatars/avatar', () => ({
    Avatar: ({ src }: { src?: string }) => <div data-testid={src} />,
}));

describe('<ProposalVotingBodyContent /> component', () => {
    const createTestComponent = (
        props?: Partial<IProposalVotingBodyContentProps>,
        contextValues: Partial<IProposalVotingStageContext> = {},
    ) => {
        const completeProps: IProposalVotingBodyContentProps = {
            status: ProposalStatus.PENDING,
            name: 'Test Stage',
            bodyId: 'body1',
            ...props,
        };

        return (
            <ProposalVotingStageContextProvider value={contextValues}>
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

    test.each([
        { status: ProposalStatus.PENDING, expectedTab: modulesCopy.proposalVotingTabs.DETAILS },
        { status: ProposalStatus.UNREACHED, expectedTab: modulesCopy.proposalVotingTabs.DETAILS },
        { status: ProposalStatus.ACTIVE, expectedTab: modulesCopy.proposalVotingTabs.BREAKDOWN },
        { status: ProposalStatus.ACCEPTED, expectedTab: modulesCopy.proposalVotingTabs.BREAKDOWN },
        { status: ProposalStatus.REJECTED, expectedTab: modulesCopy.proposalVotingTabs.BREAKDOWN },
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

        const { rerender } = render(createTestComponent({ bodyId, status: ProposalStatus.PENDING }, contextValues));

        let selectedTab = screen.getByRole('tab', { selected: true });
        expect(selectedTab).toHaveTextContent(modulesCopy.proposalVotingTabs.DETAILS);

        rerender(createTestComponent({ bodyId, status: ProposalStatus.ACTIVE }, contextValues));

        selectedTab = screen.getByRole('tab', { selected: true });
        expect(selectedTab).toHaveTextContent(modulesCopy.proposalVotingTabs.BREAKDOWN);
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

    it('does not render back button when bodyList has one or fewer elements', () => {
        const bodyId = 'body1';
        const activeBody = 'body1';
        const contextValues = {
            activeBody: activeBody,
        };

        render(createTestComponent({ bodyId }, contextValues));

        expect(screen.queryByRole('button', { name: 'All bodies' })).not.toBeInTheDocument();
    });

    it('renders back button when bodyList has more than one element', () => {
        const bodyId = 'body1';
        const activeBody = 'body1';
        const contextValues = {
            bodyList: ['body1', 'body2'],
            activeBody: activeBody,
        };

        render(createTestComponent({ bodyId }, contextValues));

        expect(screen.getByRole('button', { name: 'All bodies' })).toBeInTheDocument();
    });

    it('renders the body name when provided', () => {
        const bodyId = 'body1';
        const activeBody = 'body1';
        const name = 'Active test';
        const contextValues = { activeBody, bodyList: undefined };

        render(createTestComponent({ bodyId, name }, contextValues));

        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('renders the avatar component and brand label when bodyBrand is provided', async () => {
        const bodyBrand = {
            label: 'Sample Label',
            logo: 'https://example.com/sample-logo.png',
        };

        const bodyId = 'sampleBodyId';
        const contextValues = {
            activeBody: bodyId,
            bodyList: [bodyId, 'bodyIdTwo'],
        };

        render(createTestComponent({ bodyId, bodyBrand }, contextValues));

        expect(screen.getByText(bodyBrand.label)).toBeInTheDocument();

        const avatar = await screen.findByTestId(bodyBrand.logo);
        expect(avatar).toBeInTheDocument();
    });
});
