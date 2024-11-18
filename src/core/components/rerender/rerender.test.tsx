import { act, render, screen } from '@testing-library/react';
import { type IRerenderProps, Rerender } from './rerender';

describe('<Rerender /> component', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    const createTestComponent = (props?: Partial<IRerenderProps>) => {
        const completeProps: IRerenderProps = {
            children: jest.fn(),
            ...props,
        };

        return <Rerender {...completeProps} />;
    };

    it('renders the initial time', () => {
        const currentTime = Date.now().toString();
        const children = (time: number) => <div>Current Time: {time}</div>;
        render(createTestComponent({ children }));

        expect(screen.getByText(`Current Time: ${currentTime}`)).toBeInTheDocument();
    });

    it('updates time at the specified interval', () => {
        const intervalDuration = 1000;
        const children = (time: number) => <div>Current Time: {time}</div>;
        render(createTestComponent({ children, intervalDuration }));

        // Fast-forward time by 1 second
        act(() => jest.advanceTimersByTime(intervalDuration));

        const updatedTime = Date.now().toString();
        expect(screen.getByText(`Current Time: ${updatedTime}`)).toBeInTheDocument();

        // Fast-forward time by another second
        act(() => jest.advanceTimersByTime(intervalDuration));

        const secondUpdatedTime = Date.now().toString();
        expect(screen.getByText(`Current Time: ${secondUpdatedTime}`)).toBeInTheDocument();
    });

    it('clears the interval on unmount', () => {
        const clearIntervalSpy = jest.spyOn(window, 'clearInterval');

        const { unmount } = render(createTestComponent());

        unmount();

        expect(clearIntervalSpy).toHaveBeenCalled();
    });
});
