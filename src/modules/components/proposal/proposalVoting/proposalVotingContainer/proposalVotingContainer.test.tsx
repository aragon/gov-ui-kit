import { render, screen } from '@testing-library/react';
import { ProposalVotingStatus } from '../../proposalUtils';
import { ProposalVotingStage } from '../proposalVotingStage';
import { type IProposalVotingContainerProps, ProposalVotingContainer } from './proposalVotingContainer';

describe('<ProposalVotingContainer /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingContainerProps>) => {
        const completeProps: IProposalVotingContainerProps = {
            title: '',
            description: '',
            ...props,
        };

        return <ProposalVotingContainer {...completeProps} />;
    };

    it('renders an accordion container when having more than one child', () => {
        const children = [
            <ProposalVotingStage key="0" status={ProposalVotingStatus.ACCEPTED} startDate={0} endDate={0} />,
            <ProposalVotingStage key="1" status={ProposalVotingStatus.ACCEPTED} startDate={0} endDate={0} />,
        ];
        const { container } = render(createTestComponent({ children }));
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        expect(container.querySelector('div[data-orientation=vertical]')).toBeInTheDocument();
    });

    it('does not render the accordion container when having only one child', () => {
        const children = 'test-child';
        const { container } = render(createTestComponent({ children }));
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        expect(container.querySelector('div[data-orientation=vertical]')).not.toBeInTheDocument();
        expect(screen.getByText(children)).toBeInTheDocument();
    });

    it('supports simple ReactNodes as children', () => {
        const children = ['test-1', 'test-2'];
        render(createTestComponent({ children }));
        expect(screen.getByText(new RegExp(children[0]))).toBeInTheDocument();
        expect(screen.getByText(new RegExp(children[1]))).toBeInTheDocument();
    });

    it('sets the defined stage as active when activeStage property is set', () => {
        const children = [
            <ProposalVotingStage key="0" status={ProposalVotingStatus.ACCEPTED} startDate={0} endDate={0} />,
            <ProposalVotingStage key="1" status={ProposalVotingStatus.ACCEPTED} startDate={0} endDate={0} />,
        ];
        const activeStage = '1';
        render(createTestComponent({ children, activeStage }));
        expect(screen.getAllByRole('button')[1].dataset.state).toEqual('open');
    });
});
