import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { IconType } from '../../../../../core';
import * as useProposalVotingContext from '../proposalVotingContext';
import {
    type IProposalVotingBodySummaryListItemProps,
    ProposalVotingBodySummaryListItem,
} from './proposalVotingBodySummaryListItem';

jest.mock('../../../../../core/components/avatars/avatar', () => ({
    Avatar: ({ src }: { src?: string }) => <div data-testid={src} />,
}));

describe('<ProposalVotingBodySummaryListItem /> component', () => {
    const useProposalVotingContextSpy = jest.spyOn(useProposalVotingContext, 'useProposalVotingContext');

    beforeEach(() => {
        useProposalVotingContextSpy.mockReturnValue({});
    });

    afterEach(() => {
        useProposalVotingContextSpy.mockReset();
    });

    const createTestComponent = (props?: Partial<IProposalVotingBodySummaryListItemProps>) => {
        const completeProps: IProposalVotingBodySummaryListItemProps = {
            id: 'body1',
            ...props,
        };

        return <ProposalVotingBodySummaryListItem {...completeProps} />;
    };

    it('calls setActiveBody with id when clicked', async () => {
        const id = 'body-id';
        const setActiveBody = jest.fn();
        useProposalVotingContextSpy.mockReturnValue({ setActiveBody });
        render(createTestComponent({ id }));
        await userEvent.click(screen.getByRole('button'));
        expect(setActiveBody).toHaveBeenCalledWith(id);
    });

    it('renders the children property and an arrow icon', () => {
        const children = 'body-name';
        render(createTestComponent({ children }));
        expect(screen.getByText(children)).toBeInTheDocument();
        expect(screen.getByTestId(IconType.CHEVRON_RIGHT)).toBeInTheDocument();
    });

    it('renders the avatar component when bodyBrand is provided', async () => {
        const bodyBrand = { label: 'Branded Label', logo: 'https://logo.com' };
        render(createTestComponent({ bodyBrand }));
        expect(await screen.findByTestId(bodyBrand.logo)).toBeInTheDocument();
    });
});
