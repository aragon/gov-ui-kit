import { render, screen } from '@testing-library/react';
import { AccordionContainer } from '../../../../../core';
import { testLogger } from '../../../../../core/test';
import { ProposalStatus } from '../../proposalUtils';
import { IProposalVotingStageStatusProps } from '../proposalVotingStatus';
import { type IProposalVotingStageProps, ProposalVotingStage } from './proposalVotingStage';

jest.mock('../proposalVotingStageStatus', () => ({
    ProposalVotingStageStatus: (props: IProposalVotingStageStatusProps) => (
        <div data-testid="proposal-status-mock">{props.status}</div>
    ),
}));

describe('<ProposalVotingStage /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingStageProps>) => {
        const completeProps: IProposalVotingStageProps = {
            status: ProposalStatus.PENDING,
            name: 'body name',
            startDate: 0,
            endDate: 0,
            index: 0,
            ...props,
        };

        return (
            <AccordionContainer isMulti={true}>
                <ProposalVotingStage {...completeProps} />
            </AccordionContainer>
        );
    };

    it('renders the stage name and its index inside an accordion item', () => {
        const name = 'Stage name';
        const status = ProposalStatus.ACCEPTED;
        render(createTestComponent({ name, status, index: 2 }));
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText('Stage 3')).toBeInTheDocument();
    });

    it('passes correct props to ProposalVotingStageStatus', () => {
        const status = ProposalStatus.ACTIVE;
        render(createTestComponent({ status }));
        expect(screen.getByTestId('proposal-status-mock')).toHaveTextContent(status);
    });

    it('throws error when index property is not set', () => {
        testLogger.suppressErrors();
        const index = undefined;
        expect(() => render(createTestComponent({ index }))).toThrow();
    });
});
