import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { modulesCopy } from '../../../../assets';
import { ProposalStatus } from '../../proposalUtils';
import * as useProposalVotingContext from '../proposalVotingContext';
import { ProposalVotingBodyContent, type IProposalVotingBodyContentProps } from './proposalVotingBodyContent';

jest.mock('../../../../../core/components/avatars/avatar', () => ({
    Avatar: ({ src }: { src?: string }) => <div data-testid={src} />,
}));

describe('<ProposalVotingBodyContent /> component', () => {
    const useProposalVotingContextSpy = jest.spyOn(useProposalVotingContext, 'useProposalVotingContext');

    beforeEach(() => {
        useProposalVotingContextSpy.mockReturnValue({});
    });

    afterEach(() => {
        useProposalVotingContextSpy.mockReset();
    });

    const createTestComponent = (props?: Partial<IProposalVotingBodyContentProps>) => {
        const completeProps: IProposalVotingBodyContentProps = {
            status: ProposalStatus.PENDING,
            name: 'Test Stage',
            ...props,
        };

        return <ProposalVotingBodyContent {...completeProps} />;
    };

    it('renders null when bodyId does not match the current active body', () => {
        const bodyId = 'body1';
        useProposalVotingContextSpy.mockReturnValue({ activeBody: 'body-2' });
        const { container } = render(createTestComponent({ bodyId }));
        expect(container).toBeEmptyDOMElement();
    });

    it('renders the body content when bodyId matches the current active body', () => {
        const bodyId = 'body1';
        const children = 'Test Children';
        useProposalVotingContextSpy.mockReturnValue({ activeBody: bodyId });
        render(createTestComponent({ bodyId, children }));
        expect(screen.getByText(children)).toBeInTheDocument();
        expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    test.each([
        { status: ProposalStatus.PENDING, expectedTab: modulesCopy.proposalVotingTabs.DETAILS },
        { status: ProposalStatus.UNREACHED, expectedTab: modulesCopy.proposalVotingTabs.DETAILS },
        { status: ProposalStatus.ACTIVE, expectedTab: modulesCopy.proposalVotingTabs.BREAKDOWN },
        { status: ProposalStatus.ACCEPTED, expectedTab: modulesCopy.proposalVotingTabs.BREAKDOWN },
        { status: ProposalStatus.REJECTED, expectedTab: modulesCopy.proposalVotingTabs.BREAKDOWN },
    ])('sets the initial active tab based on status', ({ status, expectedTab }) => {
        useProposalVotingContextSpy.mockReturnValue({ activeBody: undefined });
        render(createTestComponent({ status }));
        const selectedTab = screen.getByRole('tab', { selected: true });
        expect(selectedTab).toHaveTextContent(expectedTab);
    });

    it('updates the active tab when the status changes', () => {
        const { rerender } = render(createTestComponent({ status: ProposalStatus.PENDING }));
        expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(modulesCopy.proposalVotingTabs.DETAILS);
        rerender(createTestComponent({ status: ProposalStatus.ACTIVE }));
        expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(modulesCopy.proposalVotingTabs.BREAKDOWN);
    });

    it('resets the current active body when clicking on the back button', async () => {
        const setActiveBody = jest.fn();
        const bodyList = ['body-1', 'body-2'];
        useProposalVotingContextSpy.mockReturnValue({ bodyList, setActiveBody });
        render(createTestComponent());
        await userEvent.click(screen.getByRole('button', { name: 'All bodies' }));
        expect(setActiveBody).toHaveBeenCalledWith(undefined);
    });

    it('does not render back button when having one or fewer bodies', () => {
        const bodyList = ['body-1'];
        useProposalVotingContextSpy.mockReturnValue({ bodyList });
        render(createTestComponent());
        expect(screen.queryByRole('button', { name: 'All bodies' })).not.toBeInTheDocument();
    });

    it('renders back button when having more than one body', () => {
        const bodyList = ['body1', 'body2'];
        useProposalVotingContextSpy.mockReturnValue({ bodyList });
        render(createTestComponent());
        expect(screen.getByRole('button', { name: 'All bodies' })).toBeInTheDocument();
    });

    it('correctly renders the body name', () => {
        const name = 'Active test';
        render(createTestComponent({ name }));
        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('renders the avatar component and brand label when bodyBrand is provided', async () => {
        const bodyBrand = { label: 'Sample Label', logo: 'https://example.com/sample-logo.png' };
        render(createTestComponent({ bodyBrand }));
        expect(screen.getByText(bodyBrand.label)).toBeInTheDocument();
        expect(await screen.findByTestId(bodyBrand.logo)).toBeInTheDocument();
    });
});
