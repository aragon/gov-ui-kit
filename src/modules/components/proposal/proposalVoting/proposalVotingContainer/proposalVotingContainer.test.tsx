import { render, screen } from '@testing-library/react';
import { ProposalStatus } from '../../proposalUtils';
import { type IProposalVotingContainerProps, ProposalVotingContainer } from './proposalVotingContainer';

describe('<ProposalVotingContainer /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingContainerProps>) => {
        const completeProps: IProposalVotingContainerProps = {
            status: ProposalStatus.ACCEPTED,
            ...props,
        };

        return <ProposalVotingContainer {...completeProps} />;
    };

    it('renders the stage status and the children property', () => {
        const status = ProposalStatus.EXPIRED;
        const children = 'body-content';
        render(createTestComponent({ status, children }));
        expect(screen.getByText('has expired')).toBeInTheDocument();
        expect(screen.getByText(children)).toBeInTheDocument();
    });
});
