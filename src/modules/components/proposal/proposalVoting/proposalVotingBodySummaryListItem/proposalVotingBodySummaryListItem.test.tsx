import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { type IProposalVotingStageContext, ProposalVotingStageContextProvider } from '../proposalVotingStageContext';
import {
    type IProposalVotingBodySummaryListItemProps,
    ProposalVotingBodySummaryListItem,
} from './proposalVotingBodySummaryListItem';
import { IconType } from '../../../../../core';

describe('<ProposalVotingBodySummaryListItem /> component', () => {
    const createTestComponent = (
        props?: Partial<IProposalVotingBodySummaryListItemProps>,
        contextValues?: Partial<IProposalVotingStageContext>,
    ) => {
        const defaultProps: IProposalVotingBodySummaryListItemProps = {
            id: 'body1',
            children: 'List Item Content',
        };
        const completeProps = { ...defaultProps, ...props };
        const defaultContextValues = {
            startDate: 0,
            endDate: 0,
        };

        const contextValue = { ...defaultContextValues, ...contextValues };
        return (
            <ProposalVotingStageContextProvider value={contextValue}>
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
