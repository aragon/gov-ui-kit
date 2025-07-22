import { render, screen } from '@testing-library/react';
import {
    SmartContractFunctionDataListItem,
    type ISmartContractFunctionDataListItemSkeletonProps,
} from '../../smartContractFunctionDataListItem';

describe('<SmartContractFunctionDataListItem.Skeleton /> component', () => {
    const createTestComponent = (props?: Partial<ISmartContractFunctionDataListItemSkeletonProps>) => {
        const completeProps: ISmartContractFunctionDataListItemSkeletonProps = { ...props };

        return <SmartContractFunctionDataListItem.Skeleton {...completeProps} />;
    };

    it('has correct accessibility attributes', () => {
        render(createTestComponent());
        const listItem = screen.getByLabelText('loading');
        expect(listItem).toHaveAttribute('aria-busy', 'true');
        expect(listItem).toHaveAttribute('tabIndex', '0');
    });

    it('does not have accessibility attributes when asChild is true', () => {
        render(createTestComponent({ asChild: true }));
        const listItems = screen.queryAllByLabelText('loading');
        expect(listItems.length).toBe(0);
    });
});
