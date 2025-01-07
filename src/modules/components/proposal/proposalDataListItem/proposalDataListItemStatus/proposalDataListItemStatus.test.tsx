import { render, screen } from '@testing-library/react';
import { DateFormat, IconType, formatterUtils } from '../../../../../core';
import { modulesCopy } from '../../../../assets';
import { ProposalStatus } from '../../proposalUtils';
import { proposalDataListItemUtils } from '../proposalDataListItemUtils';
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

        const formattedDate = formatterUtils.formatDate(date, { format: DateFormat.RELATIVE })!;
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
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

        const formattedDate = formatterUtils.formatDate(date, { format: DateFormat.RELATIVE })!;
        expect(screen.getByText(modulesCopy.proposalDataListItemStatus.statusLabel[status])).toBeInTheDocument();
        expect(screen.queryByText(formattedDate)).not.toBeInTheDocument();
        expect(screen.queryByTestId(IconType.CALENDAR)).not.toBeInTheDocument();
    });

    test.each(proposalDataListItemUtils.ongoingStatuses)(
        'displays the date and a pinging indicator when the status is %s and voted is false',
        (status) => {
            const date = 1719563030308;
            render(createTestComponent({ date, status, voted: false }));

            const formattedDate = formatterUtils.formatDate(date, { format: DateFormat.RELATIVE })!;
            expect(screen.getByText(formattedDate)).toBeInTheDocument();
            expect(screen.getByTestId('statePingAnimation')).toBeInTheDocument();
        },
    );

    test.each(proposalDataListItemUtils.ongoingStatuses)(
        'displays a you-voted label with an icon checkmark when the status is %s and voted is true',
        (status) => {
            render(createTestComponent({ status, voted: true }));

            expect(screen.getByText(/You've voted/i)).toBeInTheDocument();
            expect(screen.getByTestId(IconType.CHECKMARK)).toBeInTheDocument();
        },
    );

    it('displays the status context when statusContext is provided', () => {
        const statusContext = 'Stage 1';
        render(createTestComponent({ statusContext }));
        expect(screen.getByText(modulesCopy.proposalDataListItemStatus.in(statusContext))).toBeInTheDocument();
    });

    it('does not display a you-voted label when the status is not an ongoing one and the voted is true', () => {
        render(createTestComponent({ status: ProposalStatus.EXECUTED, voted: true }));

        expect(screen.queryByText(/You've voted/i)).not.toBeInTheDocument();
        expect(screen.queryByTestId(IconType.CHECKMARK)).not.toBeInTheDocument();
    });
});
