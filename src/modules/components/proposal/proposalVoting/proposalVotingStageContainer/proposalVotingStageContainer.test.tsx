import { render, screen } from '@testing-library/react';
import { ProposalStatus } from '../../proposalUtils';
import { ProposalVotingStage } from '../proposalVotingStage';
import { type IProposalVotingStageContainerProps, ProposalVotingStageContainer } from './proposalVotingStageContainer';

describe('<ProposalVotingContainer /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingStageContainerProps>) => {
        const completeProps: IProposalVotingStageContainerProps = { ...props };

        return <ProposalVotingStageContainer {...completeProps} />;
    };

    it('renders the children property on an accordion container', () => {
        const children = [
            <ProposalVotingStage key="0" name="1" status={ProposalStatus.ACCEPTED} />,
            <ProposalVotingStage key="1" name="2" status={ProposalStatus.ACCEPTED} />,
        ];
        render(createTestComponent({ children }));
        expect(screen.getAllByRole('button')).toHaveLength(2);
    });
});
