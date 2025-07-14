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
});
