import { render, screen } from '@testing-library/react';
import { type IProposalDataListItemSkeletonProps, ProposalDataListItemSkeleton } from './proposalDataListItemSkeleton';

describe('<ProposalDataListItem.Skeleton /> component', () => {
    const createTestComponent = (props?: Partial<IProposalDataListItemSkeletonProps>) => {
        const completeProps: IProposalDataListItemSkeletonProps = { ...props };

        return <ProposalDataListItemSkeleton {...completeProps} />;
    };
    it('has correct accessibility attributes', () => {
        render(createTestComponent());
        const listItem = screen.getByLabelText('loading');
        expect(listItem).toHaveAttribute('aria-busy', 'true');
        expect(listItem).toHaveAttribute('tabIndex', '0');
    });
});
