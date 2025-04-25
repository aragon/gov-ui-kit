import { render, screen } from '@testing-library/react';
import { ProposalVotingStatus } from '../../proposalUtils';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { type IProposalVotingTabsProps, ProposalVotingTabs } from './proposalVotingTabs';

describe('<ProposalVotingTabs /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingTabsProps>) => {
        const completeProps: IProposalVotingTabsProps = {
            status: ProposalVotingStatus.ACTIVE,
            ...props,
        };

        return <ProposalVotingTabs {...completeProps} />;
    };

    it('renders the tabs of the proposal voting component and sets the breakdown as default active tab', () => {
        render(createTestComponent());
        const breakdownTab = screen.getByRole('tab', { name: 'Breakdown' });
        expect(breakdownTab).toBeInTheDocument();
        expect(breakdownTab).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByRole('tab', { name: 'Votes' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Details' })).toBeInTheDocument();
    });

    it('supports customisation of initial active tab', () => {
        const defaultValue = ProposalVotingTab.DETAILS;
        render(createTestComponent({ defaultValue }));
        const detailsTab = screen.getByRole('tab', { name: 'Details' });
        expect(detailsTab).toHaveAttribute('aria-selected', 'true');
    });

    it('hides the specified tab when hideTabs prop is passed', () => {
        const hideTabs = [ProposalVotingTab.BREAKDOWN];
        render(createTestComponent({ hideTabs }));
        expect(screen.queryByRole('tab', { name: 'Breakdown' })).not.toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Votes' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Details' })).toBeInTheDocument();
    });

    it.each([{ status: ProposalVotingStatus.PENDING }, { status: ProposalVotingStatus.UNREACHED }])(
        'disables the breakdown and votes tabs when voting status is $status',
        ({ status }) => {
            render(createTestComponent({ status }));
            expect(screen.getByRole('tab', { name: 'Breakdown' }).getAttribute('disabled')).toEqual('');
            expect(screen.getByRole('tab', { name: 'Votes' }).getAttribute('disabled')).toEqual('');

            const detailsTab = screen.getByRole('tab', { name: 'Details' });
            expect(detailsTab.getAttribute('disabled')).toBeNull();
        },
    );
});
