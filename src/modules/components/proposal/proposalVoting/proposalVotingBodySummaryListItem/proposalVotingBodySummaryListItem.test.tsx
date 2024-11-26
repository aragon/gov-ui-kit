import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import {
    type IProposalVotingBodySummaryListItemProps,
    ProposalVotingBodySummaryListItem,
} from './proposalVotingBodySummaryListItem';
import { type IProposalVotingStageContext, ProposalVotingStageContextProvider } from '../proposalVotingStageContext';

describe('<ProposalVotingBodySummaryListItem /> component', () => {
    const defaultProps: IProposalVotingBodySummaryListItemProps = {
        id: 'body1',
        children: <div>List Item Content</div>,
    };

    const createTestComponent = (
        props?: Partial<IProposalVotingBodySummaryListItemProps>,
        contextValues?: Partial<IProposalVotingStageContext>,
    ) => {
        const completeProps = { ...defaultProps, ...props };
        const defaultContextValues = {
            activeBody: undefined,
            setActiveBody: jest.fn(),
            bodyList: [],
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

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('calls setActiveBody with id when clicked', async () => {
        const setActiveBodyMock = jest.fn();
        const user = userEvent.setup();
        render(createTestComponent({}, { setActiveBody: setActiveBodyMock }));

        const dataListItem = screen.getByRole('button');
        await user.click(dataListItem);

        expect(setActiveBodyMock).toHaveBeenCalledWith(defaultProps.id);
    });

    it('renders children and AvatarIcon', () => {
        render(createTestComponent());

        expect(screen.getByText('List Item Content')).toBeInTheDocument();
        expect(screen.getByTestId('CHEVRON_RIGHT')).toBeInTheDocument();
    });

    it('passes the correct className to DataListItem', () => {
        render(createTestComponent());

        const dataListItem = screen.getByRole('button');
        expect(dataListItem).toHaveClass('flex items-center justify-between gap-3 p-6');
    });
});
