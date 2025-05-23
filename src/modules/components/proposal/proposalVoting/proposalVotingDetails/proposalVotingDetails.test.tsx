import { render, screen } from '@testing-library/react';
import { Settings } from 'luxon';
import { Tabs } from '../../../../../core';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { type IProposalVotingStageContext, ProposalVotingStageContextProvider } from '../proposalVotingStageContext';
import { type IProposalVotingDetailsProps, ProposalVotingDetails } from './proposalVotingDetails';

describe('<ProposalVotingDetails /> component', () => {
    const originalNow = Settings.now;

    afterEach(() => {
        Settings.now = originalNow;
        Settings.defaultZone = 'utc';
    });

    const createTestComponent = (
        props?: Partial<IProposalVotingDetailsProps>,
        context: Partial<IProposalVotingStageContext> = {},
    ) => {
        const completeProps: IProposalVotingDetailsProps = {
            ...props,
        };

        return (
            <Tabs.Root defaultValue={ProposalVotingTab.DETAILS}>
                <ProposalVotingStageContextProvider value={context}>
                    <ProposalVotingDetails {...completeProps} />
                </ProposalVotingStageContextProvider>
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
