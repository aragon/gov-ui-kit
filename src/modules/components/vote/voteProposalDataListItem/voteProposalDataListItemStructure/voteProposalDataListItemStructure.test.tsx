import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import {
    VoteProposalDataListItemStructure,
    type IVoteProposalDataListItemStructureProps,
} from './voteProposalDataListItemStructure';

jest.mock('../../../../../core/components/tag', () => ({
    Tag: ({ label }: { label: string }) => <div data-testid="tag">{label}</div>,
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
        const voteIndicatorLabel = 'No';
        render(createTestComponent({ proposalId, voteIndicator }));

        expect(screen.getByTestId('tag')).toHaveTextContent(voteIndicatorLabel);
        expect(screen.getByText(proposalId)).toBeInTheDocument();
    });

    it('renders the date if available', () => {
        const date = DateTime.now().minus({ days: 2 }).toMillis();
        render(createTestComponent({ date }));

        expect(screen.getByText('2 days ago')).toBeInTheDocument();
    });

    it('renders the custom label if available', () => {
        const confirmationLabel = 'Custom label';
        render(createTestComponent({ confirmationLabel }));

        expect(screen.getByText(confirmationLabel)).toBeInTheDocument();
    });

    it('renders the vote indicator description if provided', () => {
        const voteIndicatorDescription = 'to approve';
        render(createTestComponent({ voteIndicatorDescription }));

        expect(screen.getByText(voteIndicatorDescription)).toBeInTheDocument();
    });
});
