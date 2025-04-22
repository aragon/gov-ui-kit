import { render, screen } from '@testing-library/react';
import { IconType, Tabs } from '../../../../../core';
import { ProposalVotingStatus } from '../../proposalUtils';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import {
    type IProposalVotingBreakdownExternalProps,
    ProposalVotingBreakdownExternal,
} from './proposalVotingBreakdownExternal';

describe('<ProposalVotingBreakdownExternal /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingBreakdownExternalProps>) => {
        const completeProps: IProposalVotingBreakdownExternalProps = {
            status: ProposalVotingStatus.ACTIVE,
            isOptimistic: false,
            ...props,
        };

        return (
            <Tabs.Root defaultValue={ProposalVotingTab.BREAKDOWN}>
                <ProposalVotingBreakdownExternal {...completeProps} />
            </Tabs.Root>
        );
    };

    it('renders a breakdown tab', () => {
        render(createTestComponent());
        const tabPabel = screen.getByRole('tabpanel');
        expect(tabPabel).toBeInTheDocument();
        expect(tabPabel.id).toContain(ProposalVotingTab.BREAKDOWN);
    });

    it('renders the correct label based on status', () => {
        render(createTestComponent());
        expect(screen.getByText('Not approved yet')).toBeInTheDocument();
    });

    it('renders success indicator on success statuses', () => {
        const status = ProposalVotingStatus.ACCEPTED;
        const isOptimistic = true;
        render(createTestComponent({ status, isOptimistic }));
        expect(screen.getByText('Did not veto')).toBeInTheDocument();
        expect(screen.getByTestId(IconType.CHECKMARK)).toBeInTheDocument();
    });

    it('renders failure indicator on failure statuses', () => {
        const status = ProposalVotingStatus.REJECTED;
        const isOptimistic = false;
        render(createTestComponent({ status, isOptimistic }));
        expect(screen.getByTestId(IconType.CLOSE)).toBeInTheDocument();
    });
});
