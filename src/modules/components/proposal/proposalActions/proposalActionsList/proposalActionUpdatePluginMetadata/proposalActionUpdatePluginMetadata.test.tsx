import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { modulesCopy } from '../../../../../assets';
import { ProposalActionUpdatePluginMetadata } from './proposalActionUpdatePluginMetadata';
import type { IProposalActionUpdatePluginMetadataProps } from './proposalActionUpdatePluginMetadata.api';
import { generateProposalActionUpdatePluginMetadata } from './proposalActionUpdatePluginMetadata.testUtils';

describe('<ProposalActionUpdatePluginMetadata /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionUpdatePluginMetadataProps>) => {
        const defaultProps: IProposalActionUpdatePluginMetadataProps = {
            action: generateProposalActionUpdatePluginMetadata(),
            index: 0,
            ...props,
        };

        return <ProposalActionUpdatePluginMetadata {...defaultProps} />;
    };

    it('renders the ToggleGroup component', () => {
        render(createTestComponent());
        expect(screen.getByText('Existing')).toBeInTheDocument();
        expect(screen.getByText('Proposed')).toBeInTheDocument();
    });

    it('renders the correct terms for plugin updates', () => {
        render(createTestComponent());
        expect(screen.getByText(modulesCopy.proposalActionsUpdatePluginMetadata.nameTerm)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsUpdatePluginMetadata.summaryTerm)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsUpdatePluginMetadata.resourcesTerm)).toBeInTheDocument();
    });

    it('renders the additional key term for process updates', () => {
        const existingMetadata = {
            name: 'Existing Name',
            description: 'Existing DAO description',
            key: 'Existing Key',
            links: [
                { label: 'Existing Link 1', href: 'https://existing-link1.com' },
                { label: 'Existing Link 2', href: 'https://existing-link2.com' },
            ],
        };

        const action = generateProposalActionUpdatePluginMetadata({ existingMetadata });

        render(createTestComponent({ action }));
        expect(screen.getByText(modulesCopy.proposalActionsUpdatePluginMetadata.keyTerm)).toBeInTheDocument();
    });

    it('renders the correct existing metadata for plugin updates', async () => {
        const proposedMetadata = {
            name: 'Proposed Name',
            description: 'Proposed DAO description',
            links: [
                { label: 'Proposed Link 1', href: 'https://proposed-link1.com' },
                { label: 'Proposed Link 2', href: 'https://proposed-link2.com' },
            ],
        };

        const existingMetadata = {
            name: 'Existing Name',
            description: 'Existing DAO description',
            links: [
                { label: 'Existing Link 1', href: 'https://existing-link1.com' },
                { label: 'Existing Link 2', href: 'https://existing-link2.com' },
            ],
        };

        const action = generateProposalActionUpdatePluginMetadata({ proposedMetadata, existingMetadata });

        render(createTestComponent({ action }));

        expect(screen.getByText('Existing Name')).toBeInTheDocument();
        expect(screen.getByText('Existing Link 1')).toBeInTheDocument();
        expect(screen.getByText('Existing Link 2')).toBeInTheDocument();
        expect(screen.getByText('Existing DAO description')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Proposed'));

        expect(screen.getByText('Proposed Name')).toBeInTheDocument();
        expect(screen.getByText('Proposed Link 1')).toBeInTheDocument();
        expect(screen.getByText('Proposed Link 2')).toBeInTheDocument();
        expect(screen.getByText('Proposed DAO description')).toBeInTheDocument();
    });

    it('renders the additional existing metadata key for process updates', async () => {
        const proposedMetadata = {
            name: 'Proposed Name',
            description: 'Proposed DAO description',
            key: 'Proposed Key',
            links: [
                { label: 'Proposed Link 1', href: 'https://proposed-link1.com' },
                { label: 'Proposed Link 2', href: 'https://proposed-link2.com' },
            ],
        };

        const existingMetadata = {
            name: 'Existing Name',
            description: 'Existing DAO description',
            key: 'Existing Key',
            links: [
                { label: 'Existing Link 1', href: 'https://existing-link1.com' },
                { label: 'Existing Link 2', href: 'https://existing-link2.com' },
            ],
        };

        const action = generateProposalActionUpdatePluginMetadata({ proposedMetadata, existingMetadata });

        render(createTestComponent({ action }));
        expect(screen.getByText('Existing Key')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Proposed'));

        expect(screen.getByText('Proposed Key')).toBeInTheDocument();
    });
});
