import { render, screen } from '@testing-library/react';
import { Tabs } from '../../../../../core';
import { ProposalVotingContextProvider } from '../proposalVotingContext';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { type IProposalVotingDetailsProps, ProposalVotingDetails } from './proposalVotingDetails';

describe('<ProposalVotingDetails /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingDetailsProps>) => {
        const completeProps: IProposalVotingDetailsProps = {
            ...props,
        };

        return (
            <Tabs.Root defaultValue={ProposalVotingTab.DETAILS}>
                <ProposalVotingContextProvider>
                    <ProposalVotingDetails {...completeProps} />
                </ProposalVotingContextProvider>
            </Tabs.Root>
        );
    };

    it('renders the settings passed as props', () => {
        const settings = [
            { term: 'Voting options', definition: 'Approve' },
            { term: 'Minimum approval', definition: '3 of 5' },
        ];
        render(createTestComponent({ settings }));

        settings.forEach((setting) => {
            expect(screen.getByText(setting.term)).toBeInTheDocument();
            expect(screen.getByText(setting.definition)).toBeInTheDocument();
        });
    });
});
