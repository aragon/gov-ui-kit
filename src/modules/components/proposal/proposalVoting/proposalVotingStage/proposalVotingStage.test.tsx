import { render, screen } from '@testing-library/react';
import { AccordionContainer } from '../../../../../core';
import { testLogger } from '../../../../../core/test';
import { ProposalVotingStatus } from '../../proposalUtils';
import { type IProposalVotingStageProps, ProposalVotingStage } from './proposalVotingStage';

jest.mock('../proposalVotingStageStatus', () => ({
    ProposalVotingStageStatus: (props: { status: string }) => (
        <div data-testid="proposal-status-mock">{props.status}</div>
    ),
}));

describe('<ProposalVotingStage /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingStageProps>) => {
        const completeProps: IProposalVotingStageProps = {
            status: ProposalVotingStatus.PENDING,
            startDate: 0,
            endDate: 0,
            ...props,
        };

        if (completeProps.isMultiStage) {
            return (
                <AccordionContainer isMulti={true}>
                    <ProposalVotingStage index={0} {...completeProps} />
                </AccordionContainer>
            );
        }

        return <ProposalVotingStage {...completeProps} />;
    };

    it('renders the proposal stage with its name inside an accordion item', () => {
        const isMultiStage = true;
        const name = 'Stage name';
        const status = ProposalVotingStatus.ACCEPTED;
        render(createTestComponent({ isMultiStage, name, status, index: 2 }));
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText('Stage 3')).toBeInTheDocument();
    });

    it('passes correct props to ProposalVotingStageStatus', () => {
        const status = ProposalVotingStatus.ACTIVE;
        render(createTestComponent({ status }));
        expect(screen.getByTestId('proposal-status-mock')).toHaveTextContent(status);
    });

    it('renders the proposal status and content for single-stage proposals', () => {
        const isMultiStage = false;
        const status = ProposalVotingStatus.REJECTED;
        const children = 'test-children';
        render(createTestComponent({ isMultiStage, status, children }));
        expect(screen.getByText(status)).toBeInTheDocument();
        expect(screen.getByText(children)).toBeInTheDocument();
    });

    it('throws error when proposal is multi-stage and index property is not set', () => {
        testLogger.suppressErrors();
        const isMultiStage = true;
        const index = undefined;
        expect(() => render(createTestComponent({ isMultiStage, index }))).toThrow();
    });

    it('renders the stage name for single-stage proposals with multiple bodies', () => {
        const isMultiStage = false;
        const name = 'Stage name';
        const bodyList = ['body1', 'body2'];
        render(createTestComponent({ isMultiStage, name, bodyList }));
        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('renders the stage name for single‐stage proposals', () => {
        const isMultiStage = false;
        const name = 'Stage name';
        render(createTestComponent({ isMultiStage, name }));
        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('renders the stage name for multi-stage proposals with multiple bodies', () => {
        const isMultiStage = true;
        const name = 'Stage name';
        const index = 1;
        const bodyList = ['body1', 'body2'];
        render(createTestComponent({ isMultiStage, name, index, bodyList }));
        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('renders the stage name for multi-stage proposals with a single body', () => {
        const isMultiStage = true;
        const name = 'Stage name';
        const index = 1;
        const bodyList = ['body1'];
        render(createTestComponent({ isMultiStage, name, index, bodyList }));
        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('renders the stage name for multi-stage proposals when bodyList is undefined', () => {
        const isMultiStage = true;
        const name = 'Stage name';
        const index = 1;
        render(createTestComponent({ isMultiStage, name, index, bodyList: undefined }));
        expect(screen.getByText(name)).toBeInTheDocument();
    });
});
