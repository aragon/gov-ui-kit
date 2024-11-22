import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { modulesCopy } from '../../../../../assets';
import { ProposalActionUpdateMetadata } from './proposalActionUpdateMetadata';
import type { IProposalActionUpdateMetadataProps } from './proposalActionUpdateMetadata.api';
import { generateProposalActionUpdateMetadata } from './proposalActionUpdateMetadata.testUtils';

describe('<ProposalActionUpdateMetadata /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionUpdateMetadataProps>) => {
        const defaultProps: IProposalActionUpdateMetadataProps = {
            action: generateProposalActionUpdateMetadata(),
            index: 0,
            ...props,
        };

        return <ProposalActionUpdateMetadata {...defaultProps} />;
    };

    it('renders the ToggleGroup component', () => {
        render(createTestComponent());
        expect(screen.getByText('Existing')).toBeInTheDocument();
        expect(screen.getByText('Proposed')).toBeInTheDocument();
    });

    it('renders the correct terms', () => {
        render(createTestComponent());
        expect(screen.getByText(modulesCopy.proposalActionsUpdateMetadata.logoTerm)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsUpdateMetadata.linkTerm)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsUpdateMetadata.nameTerm)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsUpdateMetadata.descriptionTerm)).toBeInTheDocument();
    });

    it('renders the correct existing metadata', async () => {
        const proposedMetadata = {
            logo: 'proposed-logo.png',
            name: 'Proposed Name',
            description: 'Proposed DAO description',
            links: [
                { label: 'Proposed Link 1', href: 'https://proposed-link1.com' },
                { label: 'Proposed Link 2', href: 'https://proposed-link2.com' },
            ],
        };

        const existingMetadata = {
            logo: 'existing-logo.png',
            name: 'Existing Name',
            description: 'Existing DAO description',
            links: [
                { label: 'Existing Link 1', href: 'https://existing-link1.com' },
                { label: 'Existing Link 2', href: 'https://existing-link2.com' },
            ],
        };

        const action = generateProposalActionUpdateMetadata({ proposedMetadata, existingMetadata });

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
});
