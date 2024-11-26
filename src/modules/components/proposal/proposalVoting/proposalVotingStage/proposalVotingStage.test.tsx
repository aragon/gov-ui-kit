import { render, screen } from '@testing-library/react';
import { AccordionContainer } from '../../../../../core';
import { ProposalVotingStatus } from '../../proposalUtils';
import { type IProposalVotingStageProps, ProposalVotingStage } from './proposalVotingStage';
import { testLogger } from '../../../../../core/test';

jest.mock('../proposalVotingStageStatus', () => ({
    ProposalVotingStageStatus: (props: { status: string }) => (
        <div data-testid="proposal-status-mock">{props.status}</div>
    ),
}));

jest.mock('../proposalVotingBodySummary', () => ({
    ProposalVotingBodySummary: (props: { children: React.ReactNode }) => (
        <div data-testid="proposal-body-summary">{props.children}</div>
    ),
}));

jest.mock('../proposalVotingBodyContent', () => ({
    ProposalVotingBodyContent: (props: { bodyId: string; children: React.ReactNode }) => (
        <div data-testid="proposal-body-content" data-bodyid={props.bodyId}>
            {props.children}
        </div>
    ),
}));

describe('<ProposalVotingStage /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingStageProps>) => {
        const completeProps: IProposalVotingStageProps = {
            status: ProposalVotingStatus.PENDING,
            startDate: 0,
            endDate: 0,
            bodyList: undefined,
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

    it('renders ProposalVotingBodySummary when activeBody is null', () => {
        const bodyList = ['body1', 'body2'];
        const children = 'test-children';
        render(createTestComponent({ bodyList, children }));
        expect(screen.getByTestId('proposal-body-summary')).toBeInTheDocument();
        expect(screen.queryByTestId('proposal-body-content')).not.toBeInTheDocument();
        expect(screen.getByText(children)).toBeInTheDocument();
    });

    it('renders children directly when bodyList has one element', () => {
        const bodyList = ['body1'];
        const children = 'test-children';
        render(createTestComponent({ bodyList, children }));
        expect(screen.queryByTestId('proposal-body-summary')).not.toBeInTheDocument();
        expect(screen.getByText(children)).toBeInTheDocument();
    });

    it('renders the children directly when bodyList is undefined and activeBody is null', () => {
        const children = 'test-children';
        render(createTestComponent({ bodyList: undefined, children }));
        expect(screen.queryByTestId('proposal-body-summary')).not.toBeInTheDocument();
        expect(screen.getByText(children)).toBeInTheDocument();
    });

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

    it('renders the proposal stage with its name inside an accordion item', () => {
        const isMultiStage = true;
        const name = 'Stage name';
        const status = ProposalVotingStatus.ACCEPTED;
        render(createTestComponent({ isMultiStage, name, status, index: 2 }));
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText('Stage 3')).toBeInTheDocument();
    });
});
