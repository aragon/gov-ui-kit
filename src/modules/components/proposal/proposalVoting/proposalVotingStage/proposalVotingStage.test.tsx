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

    it('only renders the proposal status and the tabs for single-stage proposals', () => {
        const isMultiStage = false;
        const status = ProposalVotingStatus.REJECTED;
        const children = 'test-children';
        render(createTestComponent({ isMultiStage, status, children }));
        expect(screen.getByText(status)).toBeInTheDocument();
        expect(screen.getByRole('tablist')).toBeInTheDocument();
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

    test.each([{ status: ProposalVotingStatus.PENDING }, { status: ProposalVotingStatus.UNREACHED }])(
        'sets the default active tab to details when proposal status is $status',
        ({ status }) => {
            render(createTestComponent({ status }));
            expect(screen.getByRole('tab', { name: 'Details' })).toHaveAttribute('aria-selected', 'true');
        },
    );

    test.each([
        { status: ProposalVotingStatus.ACTIVE },
        { status: ProposalVotingStatus.ACCEPTED },
        { status: ProposalVotingStatus.REJECTED },
    ])('sets the default active tab to breakdown when proposal status is $status', ({ status }) => {
        render(createTestComponent({ status }));
        expect(screen.getByRole('tab', { name: 'Breakdown' })).toHaveAttribute('aria-selected', 'true');
    });

    it('correctly updates the active-tab when the stage status changes', () => {
        const status = ProposalVotingStatus.PENDING;
        const { rerender } = render(createTestComponent({ status }));
        expect(screen.getByRole('tab', { name: 'Details' })).toHaveAttribute('aria-selected', 'true');
        rerender(createTestComponent({ status: ProposalVotingStatus.ACTIVE }));
        expect(screen.getByRole('tab', { name: 'Details' })).toHaveAttribute('aria-selected', 'false');
        expect(screen.getByRole('tab', { name: 'Breakdown' })).toHaveAttribute('aria-selected', 'true');
    });
});
