import { render, screen } from '@testing-library/react';
import { DateTime, Settings } from 'luxon';
import { Tabs } from '../../../../../core';
import type { IDefinitionSetting } from '../../../../types/definitionSetting';
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
        context?: Partial<IProposalVotingStageContext>,
    ) => {
        const completeProps: IProposalVotingDetailsProps = {
            ...props,
        };

        const completeContext: IProposalVotingStageContext = {
            startDate: 0,
            endDate: 0,
            ...context,
        };

        return (
            <Tabs.Root defaultValue={ProposalVotingTab.DETAILS}>
                <ProposalVotingStageContextProvider value={completeContext}>
                    <ProposalVotingDetails {...completeProps} />
                </ProposalVotingStageContextProvider>
            </Tabs.Root>
        );
    };

    it('renders the formatted start and end dates', () => {
        const now = '2024-07-22T13:08:52.500Z';
        Settings.now = () => new Date(now).valueOf();
        const startDate = DateTime.fromISO(now).plus({ days: 3 }).toMillis();
        const endDate = DateTime.fromISO(now).plus({ days: 12 }).toMillis();
        render(createTestComponent(undefined, { startDate, endDate }));
        expect(screen.getByText('Voting')).toBeInTheDocument();
        expect(screen.getByText('July 25, 2024 at 13:08')).toBeInTheDocument();
        expect(screen.getByText('August 3, 2024 at 13:08')).toBeInTheDocument();
    });

    it('renders fallback when start and end dates are not set', () => {
        const startDate = undefined;
        const endDate = undefined;
        render(createTestComponent(undefined, { startDate, endDate }));
        expect(screen.getAllByText('-')).toHaveLength(2);
    });

    it('renders the governance settings passed as props', () => {
        const settings = [
            { term: 'Voting options', definition: 'Approve' },
            { term: 'Minimum approval', definition: '3 of 5' },
        ];
        render(createTestComponent({ settings }));
        expect(screen.getByText('Governance')).toBeInTheDocument();

        settings.forEach((setting) => {
            expect(screen.getByText(setting.term)).toBeInTheDocument();
            expect(screen.getByText(setting.definition)).toBeInTheDocument();
        });
    });

    it('does not render the governance text when settings array is empty', () => {
        const settings: IDefinitionSetting[] = [];
        render(createTestComponent({ settings }));
        expect(screen.queryByText('Governance')).not.toBeInTheDocument();
    });
});
