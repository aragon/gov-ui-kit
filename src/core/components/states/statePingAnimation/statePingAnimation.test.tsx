import { render, screen } from '@testing-library/react';
import { type IStatePingAnimationProps, StatePingAnimation } from './statePingAnimation';

describe('<StatePingAnimation/> component', () => {
    const createTestComponent = (props?: Partial<IStatePingAnimationProps>) => {
        const completeProps = { ...props };

        return <StatePingAnimation {...completeProps} />;
    };

    it('renders without crashing', () => {
        render(createTestComponent());

        expect(screen.getByTestId('statePingAnimation')).toBeInTheDocument();
    });
});
