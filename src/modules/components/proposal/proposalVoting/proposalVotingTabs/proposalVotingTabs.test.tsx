import { render, screen } from '@testing-library/react';
import { modulesCopy } from '../../../../assets';
import { ProposalStatus } from '../../proposalUtils';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { type IProposalVotingTabsProps, ProposalVotingTabs } from './proposalVotingTabs';

describe('<ProposalVotingTabs /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingTabsProps>) => {
        const completeProps: IProposalVotingTabsProps = {
            status: ProposalStatus.ACTIVE,
            ...props,
        };

        return <ProposalVotingTabs {...completeProps} />;
    };

    it('renders the tabs of the proposal voting component and sets the breakdown as default active tab', () => {
        render(createTestComponent());
        const breakdownTab = screen.getByRole('tab', { name: modulesCopy.proposalVotingTabs.BREAKDOWN });
        expect(breakdownTab).toBeInTheDocument();
        expect(breakdownTab).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByRole('tab', { name: modulesCopy.proposalVotingTabs.VOTES })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: modulesCopy.proposalVotingTabs.DETAILS })).toBeInTheDocument();
    });

    it('supports customisation of initial active tab', () => {
        const defaultValue = ProposalVotingTab.DETAILS;
        render(createTestComponent({ defaultValue }));
        const detailsTab = screen.getByRole('tab', { name: modulesCopy.proposalVotingTabs.DETAILS });
        expect(detailsTab).toHaveAttribute('aria-selected', 'true');
    });

    it('hides the specified tab when hideTabs prop is passed', () => {
        const hideTabs = [ProposalVotingTab.BREAKDOWN];
        render(createTestComponent({ hideTabs }));
        expect(screen.queryByRole('tab', { name: modulesCopy.proposalVotingTabs.BREAKDOWN })).not.toBeInTheDocument();
        expect(screen.getByRole('tab', { name: modulesCopy.proposalVotingTabs.VOTES })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: modulesCopy.proposalVotingTabs.DETAILS })).toBeInTheDocument();
    });

    it.each([{ status: ProposalStatus.PENDING }, { status: ProposalStatus.UNREACHED }])(
        'disables the breakdown and votes tabs when voting status is $status',
        ({ status }) => {
            render(createTestComponent({ status }));
            const breakdownTab = screen.getByRole('tab', { name: modulesCopy.proposalVotingTabs.BREAKDOWN });
            const votesTab = screen.getByRole('tab', { name: modulesCopy.proposalVotingTabs.VOTES });
            expect(breakdownTab.getAttribute('disabled')).toEqual('');
            expect(votesTab.getAttribute('disabled')).toEqual('');

            const detailsTab = screen.getByRole('tab', { name: modulesCopy.proposalVotingTabs.DETAILS });
            expect(detailsTab.getAttribute('disabled')).toBeNull();
        },
    );
});
