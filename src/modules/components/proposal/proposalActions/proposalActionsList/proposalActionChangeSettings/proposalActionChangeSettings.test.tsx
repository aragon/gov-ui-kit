import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ProposalActionChangeSettings } from './proposalActionChangeSettings';
import type { IProposalActionChangeSettingsProps } from './proposalActionChangeSettings.api';
import { generateProposalActionChangeSettings } from './proposalActionChangeSettings.testUtils';

describe('<ProposalActionChangeSettings /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionChangeSettingsProps>) => {
        const completeProps: IProposalActionChangeSettingsProps = {
            action: generateProposalActionChangeSettings(),
            index: 0,
            ...props,
        };

        return <ProposalActionChangeSettings {...completeProps} />;
    };

    it('renders existing settings by default', () => {
        const existingSettings = [{ term: 'Support threshold', definition: '50%' }];
        const proposedSettings = [{ term: 'Support threshold', definition: '60%' }];
        const action = generateProposalActionChangeSettings({ existingSettings, proposedSettings });
        render(createTestComponent({ action }));
        expect(screen.getByText(existingSettings[0].term)).toBeInTheDocument();
        expect(screen.getByText(existingSettings[0].definition)).toBeInTheDocument();
    });

    it('toggles to proposed settings', async () => {
        const existingSettings = [{ term: 'Threshold', definition: '2' }];
        const proposedSettings = [{ term: 'Threshold', definition: '3' }];
        const action = generateProposalActionChangeSettings({ existingSettings, proposedSettings });
        render(createTestComponent({ action }));

        await userEvent.click(screen.getByText('Proposed'));

        expect(screen.getByText(proposedSettings[0].term)).toBeInTheDocument();
        expect(screen.getByText(proposedSettings[0].definition)).toBeInTheDocument();
    });

    it('renders both existing and proposed settings', async () => {
        const existingSettings = [
            { term: 'Existing Term 1', definition: 'Existing Definition 1' },
            { term: 'Existing Term 2', definition: 'Existing Definition 2' },
        ];
        const proposedSettings = [
            { term: 'Proposed Term 1', definition: 'Proposed Definition 1' },
            { term: 'Proposed Term 2', definition: 'Proposed Definition 2' },
        ];
        const action = generateProposalActionChangeSettings({ existingSettings, proposedSettings });
        render(createTestComponent({ action }));
        expect(screen.getByText(existingSettings[0].term)).toBeInTheDocument();
        expect(screen.getByText(existingSettings[0].definition)).toBeInTheDocument();
        expect(screen.getByText(existingSettings[1].term)).toBeInTheDocument();
        expect(screen.getByText(existingSettings[1].definition)).toBeInTheDocument();

        await userEvent.click(screen.getByText('Proposed'));

        expect(screen.getByText(proposedSettings[0].term)).toBeInTheDocument();
        expect(screen.getByText(proposedSettings[0].definition)).toBeInTheDocument();
        expect(screen.getByText(proposedSettings[1].term)).toBeInTheDocument();
        expect(screen.getByText(proposedSettings[1].definition)).toBeInTheDocument();
    });
});
