import { render, screen } from '@testing-library/react';
import { type IStateSkeletonBarProps, StateSkeletonBar } from './stateSkeletonBar';

describe('<StateSkeletonBar /> component', () => {
    const createTestComponent = (props?: Partial<IStateSkeletonBarProps>) => {
        const completeProps = { ...props };
        return <StateSkeletonBar {...completeProps} />;
    };

    it('renders the skeleton element without crashing', () => {
        render(createTestComponent());
        expect(screen.getByTestId('stateSkeletonBar')).toBeInTheDocument();
    });
});
