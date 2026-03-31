import { render, screen } from '@testing-library/react';
import { type IVoteDataListItemSkeletonProps, VoteDataListItem } from '../..';

describe('<VoteDataListItem.Skeleton /> component', () => {
    const createTestComponent = (props?: Partial<IVoteDataListItemSkeletonProps>) => {
        const completeProps: IVoteDataListItemSkeletonProps = { ...props };

        return <VoteDataListItem.Skeleton {...completeProps} />;
    };
    it('has correct accessibility attributes', () => {
        render(createTestComponent());
        const listItem = screen.getByLabelText('loading');
        expect(listItem).toHaveAttribute('aria-busy', 'true');
        expect(listItem).toHaveAttribute('tabIndex', '0');
    });
});
