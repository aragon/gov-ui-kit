import { render, screen } from '@testing-library/react';
import { Accordion } from '../../../../../core';
import { ProposalActionsItemSkeleton } from './proposalActionsItemSkeleton';

describe('<ProposalActionsItemSkeleton /> component', () => {
    const createTestComponent = () => {
        return (
            <Accordion.Container isMulti={false}>
                <ProposalActionsItemSkeleton />
            </Accordion.Container>
        );
    };

    it('has correct accessibility attributes', () => {
        render(createTestComponent());
        const skeleton = screen.getByLabelText('loading');
        expect(skeleton).toHaveAttribute('aria-busy', 'true');
        expect(skeleton).toHaveAttribute('tabIndex', '0');
    });
});
