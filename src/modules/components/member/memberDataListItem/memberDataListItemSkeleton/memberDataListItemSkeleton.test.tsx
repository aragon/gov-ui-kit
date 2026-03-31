import { render, screen } from '@testing-library/react';
import { type IMemberDataListItemSkeletonProps, MemberDataListItemSkeleton } from './memberDataListItemSkeleton';

describe('<MemberDataListItem.Skeleton /> component', () => {
    const createTestComponent = (props?: Partial<IMemberDataListItemSkeletonProps>) => {
        const completeProps: IMemberDataListItemSkeletonProps = { ...props };

        return <MemberDataListItemSkeleton {...completeProps} />;
    };

    it('has correct accessibility attributes', () => {
        render(createTestComponent());
        const listItem = screen.getByLabelText('loading');
        expect(listItem).toHaveAttribute('aria-busy', 'true');
        expect(listItem).toHaveAttribute('tabIndex', '0');
    });
});
