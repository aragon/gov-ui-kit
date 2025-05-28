import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import {
    VoteProposalDataListItemStructure,
    type IVoteProposalDataListItemStructureProps,
} from './voteProposalDataListItemStructure';

jest.mock('../../../../../core/components/tag', () => ({
    Tag: ({ label, variant }: { label: string; variant: string }) => (
        <div data-testid="tag" className={variant}>
            {label}
        </div>
    ),
}));

describe('<VoteProposalDataListItemStructure /> component', () => {
    const createTestComponent = (props?: Partial<IVoteProposalDataListItemStructureProps>) => {
        const completeProps: IVoteProposalDataListItemStructureProps = {
            proposalId: 'PIP-06',
            proposalTitle: 'Introduction of Layer 2 Scaling Solutions',
            voteIndicator: 'yes',
            ...props,
        };

        return <VoteProposalDataListItemStructure {...completeProps} />;
    };

    it('renders the vote and the proposal information', () => {
        const proposalId = 'PIP-06';
        const voteIndicator = 'no';
        render(createTestComponent({ proposalId, voteIndicator }));

        expect(screen.getByTestId('tag')).toHaveTextContent(voteIndicator);
        expect(screen.getByText(proposalId)).toBeInTheDocument();
    });

    it('renders the date if available', () => {
        const date = DateTime.now().minus({ days: 2 }).toMillis();
        render(createTestComponent({ date }));

        expect(screen.getByText('2 days ago')).toBeInTheDocument();
    });

    it('renders the custom vote indicator description if available', () => {
        const voteIndicatorDescription = 'Custom description';
        render(createTestComponent({ voteIndicatorDescription }));

        expect(screen.getByText(voteIndicatorDescription)).toBeInTheDocument();
    });

    it('renders success vote indicator for yes vote', () => {
        const voteIndicator = 'yes';
        render(createTestComponent({ voteIndicator }));
        expect(screen.getByTestId('tag')).toHaveTextContent(voteIndicator);
        expect(screen.getByTestId('tag')).toHaveClass('success');
    });

    it('renders critical vote indicator for yes vote in veto mode', () => {
        const voteIndicator = 'yes';
        render(createTestComponent({ voteIndicator, isVeto: true }));
        expect(screen.getByTestId('tag')).toHaveTextContent(voteIndicator);
        expect(screen.getByTestId('tag')).toHaveClass('critical');
    });
});
