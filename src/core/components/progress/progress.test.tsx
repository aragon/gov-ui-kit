import { render, screen } from '@testing-library/react';
import { Progress, type IProgressProps } from '.';

describe('<Progress /> component', () => {
    const createTestComponent = (props?: Partial<IProgressProps>) => {
        const completeProps: IProgressProps = {
            value: 0,
            ...props,
        };

        return <Progress {...completeProps} />;
    };

    it('renders a progress indicator', () => {
        render(createTestComponent());
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('does not render the progress indicator by default', () => {
        render(createTestComponent());
        const progressIndicator = screen.queryByTestId('progress-indicator');
        expect(progressIndicator).not.toBeInTheDocument();
    });

    it('renders a threshold indicator when the thresholdIndicator prop is provided', () => {
        render(createTestComponent({ thresholdIndicator: 50 }));
        const progressIndicator = screen.getByTestId('progress-indicator');
        expect(progressIndicator).toBeInTheDocument();
    });

    it('positions the threshold indicator correctly when the thresholdIndicator prop is provided', () => {
        const indicatorValue = 50;
        render(createTestComponent({ thresholdIndicator: indicatorValue }));
        const progressIndicator = screen.getByTestId('progress-indicator');
        expect(progressIndicator).toHaveStyle(`left: ${indicatorValue.toString()}%`);
        expect(progressIndicator.dataset.value).toEqual(indicatorValue.toString());
    });
});
