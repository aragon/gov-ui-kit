import { render, screen } from '@testing-library/react';
import { DateFormat, IconType, formatterUtils } from '../../../../../core';
import { modulesCopy } from '../../../../assets';
import { ProposalStatus } from '../../proposalUtils';
import { ProposalDataListItemStatus, type IProposalDataListItemStatusProps } from './proposalDataListItemStatus';

describe('<ProposalDataListItemStatus /> component', () => {
    const createTestComponent = (props?: Partial<IProposalDataListItemStatusProps>) => {
        const completeProps: IProposalDataListItemStatusProps = {
            status: ProposalStatus.ACCEPTED,
            ...props,
        };

        return <ProposalDataListItemStatus {...completeProps} />;
    };

    it('displays the date, calendar icon and status', () => {
        const date = 1719563030308;
        const status = ProposalStatus.ACCEPTED;

        render(createTestComponent({ date, status }));

        const formattedDate = formatterUtils.formatDate(date, { format: DateFormat.DURATION })!;
        expect(screen.getByText(`${formattedDate} ago`)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalDataListItemStatus.statusLabel[status])).toBeInTheDocument();
        expect(screen.getByTestId(IconType.CALENDAR)).toBeInTheDocument();
    });

    it('does not render the calendar icon and date when date property is not defined', () => {
        const status = ProposalStatus.ACCEPTED;
        const date = undefined;

        render(createTestComponent({ status, date }));

        expect(screen.queryByTestId(IconType.CALENDAR)).not.toBeInTheDocument();
        expect(screen.queryByText(/ago/)).not.toBeInTheDocument();
        expect(screen.queryByText(/left/)).not.toBeInTheDocument();
    });

    it("only displays the date for proposals with a status that is not 'draft'", () => {
        const date = 1719563030308;
        const status = ProposalStatus.DRAFT;

        render(createTestComponent({ date, status }));

        const formattedDate = formatterUtils.formatDate(date, { format: DateFormat.DURATION })!;
        expect(screen.getByText(modulesCopy.proposalDataListItemStatus.statusLabel[status])).toBeInTheDocument();
        expect(screen.queryByText(`${formattedDate} ago`)).not.toBeInTheDocument();
        expect(screen.queryByTestId(IconType.CALENDAR)).not.toBeInTheDocument();
    });

    it('displays the date and a pinging indicator when the status is active and voted is false', () => {
        const status = ProposalStatus.ACTIVE;
        const date = 1719563030308;
        render(createTestComponent({ date, status, voted: false }));

        const formattedDate = formatterUtils.formatDate(date, { format: DateFormat.DURATION })!;
        expect(screen.getByText(`${formattedDate} ago`)).toBeInTheDocument();
        expect(screen.getByTestId('statePingAnimation')).toBeInTheDocument();
    });

    it('displays a voted label when the status is active and voted is true', () => {
        const status = ProposalStatus.ACTIVE;
        render(createTestComponent({ status, voted: true }));

        expect(screen.getByText(/Voted/i)).toBeInTheDocument();
        expect(screen.getByTestId(IconType.CHECKMARK)).toBeInTheDocument();
    });

    it('does not display a voted label when the status is not active and voted is true', () => {
        render(createTestComponent({ status: ProposalStatus.EXECUTED, voted: true }));

        expect(screen.queryByText(/Voted/i)).not.toBeInTheDocument();
        expect(screen.queryByTestId(IconType.CHECKMARK)).not.toBeInTheDocument();
    });

    it('displays the status context when statusContext is provided and status is active', () => {
        const statusContext = 'Stage 1';
        const status = ProposalStatus.ACTIVE;
        render(createTestComponent({ statusContext, status }));
        expect(screen.getByText(statusContext)).toBeInTheDocument();
    });

    it('displays the status context when statusContext is provided and status is advanceable', () => {
        const statusContext = 'Stage 1';
        const status = ProposalStatus.ADVANCEABLE;
        render(createTestComponent({ status, statusContext }));
        expect(screen.getByText(modulesCopy.proposalDataListItemStatus.statusLabel[status])).toBeInTheDocument();
        expect(screen.getByText(statusContext)).toBeInTheDocument();
    });

    it('does not display the status context when statusContext is provided and status is final', () => {
        const statusContext = 'Stage 1';
        const status = ProposalStatus.EXECUTED;
        render(createTestComponent({ statusContext, status }));
        expect(screen.queryByText(statusContext)).not.toBeInTheDocument();
    });
});
