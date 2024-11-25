import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import {
    type IProposalVotingBodySummaryListItemProps,
    ProposalVotingBodySummaryListItem,
} from './proposalVotingBodySummaryListItem';

describe('<ProposalVotingBodySummaryListItem /> component', () => {
    const defaultProps: IProposalVotingBodySummaryListItemProps = {
        id: 'body1',
        onBodyClick: jest.fn(),
        children: <div>List Item Content</div>,
    };

    const createTestComponent = (props?: Partial<IProposalVotingBodySummaryListItemProps>) => {
        const completeProps = { ...defaultProps, ...props };
        return <ProposalVotingBodySummaryListItem {...completeProps} />;
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('calls onBodyClick with id when clicked', async () => {
        const user = userEvent.setup();
        const onBodyClickMock = jest.fn();
        const id = 'body1';
        render(
            createTestComponent({
                id,
                onBodyClick: onBodyClickMock,
            }),
        );

        const dataListItem = screen.getByRole('button');
        await user.click(dataListItem);

        expect(onBodyClickMock).toHaveBeenCalledWith(id);
    });

    it('renders children and AvatarIcon', () => {
        render(createTestComponent());

        expect(screen.getByText('List Item Content')).toBeInTheDocument();
        expect(screen.getByTestId('CHEVRON_RIGHT')).toBeInTheDocument();
    });

    it('passes the correct className to DataListItem', () => {
        render(createTestComponent());

        const dataListItem = screen.getByRole('button');
        expect(dataListItem).toHaveClass('flex items-center gap-3');
    });
});
