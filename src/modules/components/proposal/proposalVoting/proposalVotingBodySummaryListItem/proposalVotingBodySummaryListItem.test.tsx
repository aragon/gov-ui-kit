import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { IconType } from '../../../../../core';
import { type IProposalVotingStageContext, ProposalVotingStageContextProvider } from '../proposalVotingStageContext';
import {
    type IProposalVotingBodySummaryListItemProps,
    ProposalVotingBodySummaryListItem,
} from './proposalVotingBodySummaryListItem';

describe('<ProposalVotingBodySummaryListItem /> component', () => {
    const createTestComponent = (
        props?: Partial<IProposalVotingBodySummaryListItemProps>,
        contextValues?: Partial<IProposalVotingStageContext>,
    ) => {
        const completeProps: IProposalVotingBodySummaryListItemProps = {
            id: 'body1',
            children: 'List Item Content',
            ...props,
        };

        const completeContextValues: IProposalVotingStageContext = {
            startDate: 0,
            endDate: 0,
            ...contextValues,
        };

        return (
            <ProposalVotingStageContextProvider value={completeContextValues}>
                <ProposalVotingBodySummaryListItem {...completeProps} />
            </ProposalVotingStageContextProvider>
        );
    };

    it('calls setActiveBody with id when clicked', async () => {
        const setActiveBodyMock = jest.fn();
        const user = userEvent.setup();
        render(createTestComponent({ id: '0x' }, { setActiveBody: setActiveBodyMock }));

        const dataListItem = screen.getByRole('button');
        await user.click(dataListItem);

        expect(setActiveBodyMock).toHaveBeenCalledWith('0x');
    });

    it('renders the children property and an arrow icon', () => {
        render(createTestComponent({ children: 'Body name' }));

        expect(screen.getByText('Body name')).toBeInTheDocument();
        expect(screen.getByTestId(IconType.CHEVRON_RIGHT)).toBeInTheDocument();
    });
});
