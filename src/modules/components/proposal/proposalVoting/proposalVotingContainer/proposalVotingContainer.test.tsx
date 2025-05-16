import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProposalStatus } from '../../proposalUtils';
import { ProposalVotingStage } from '../proposalVotingStage';
import { type IProposalVotingContainerProps, ProposalVotingContainer } from './proposalVotingContainer';

describe('<ProposalVotingContainer /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingContainerProps>) => {
        const completeProps: IProposalVotingContainerProps = {
            ...props,
        };

        return <ProposalVotingContainer {...completeProps} />;
    };

    it('renders an accordion container when having more than one child', () => {
        const children = [
            <ProposalVotingStage key="0" status={ProposalStatus.ACCEPTED} />,
            <ProposalVotingStage key="1" status={ProposalStatus.ACCEPTED} />,
        ];
        render(createTestComponent({ children }));
        expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('does not render the accordion container when having only one child', () => {
        const children = 'test-child';
        render(createTestComponent({ children }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
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
            <ProposalVotingStage key="0" status={ProposalStatus.VETOED} />,
            <ProposalVotingStage key="1" status={ProposalStatus.UNREACHED} />,
        ];
        const activeStage = '1';
        render(createTestComponent({ children, activeStage }));
        expect(screen.getAllByRole('button')[1].dataset.state).toEqual('open');
    });

    it('calls the onStageClick property and updates the active stage when a new stage is selected', async () => {
        const onStageClick = jest.fn();
        const activeStage = '1';
        const children = [
            <ProposalVotingStage key="0" status={ProposalStatus.ACCEPTED} />,
            <ProposalVotingStage key="1" status={ProposalStatus.ACTIVE} />,
        ];
        const { rerender } = render(createTestComponent({ children, activeStage, onStageClick }));
        await userEvent.click(screen.getAllByRole('button')[0]);

        expect(onStageClick).toHaveBeenCalledWith('0');
        rerender(createTestComponent({ children, activeStage: '0', onStageClick }));
        expect(screen.getAllByRole('button')[0].dataset.state).toEqual('open');
    });
});
