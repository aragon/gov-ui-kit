import { type ReactNode, useEffect, useState } from 'react';

export interface IRerenderProps {
    /**
     * The duration in milliseconds between each rerender.
     * @default 1000
     */
    intervalDuration?: number;
    /**
     * Time-sensitive content to render.
     */
    children: (currentTime: number) => ReactNode;
}

/**
 * Rerender component
 *
 * This component triggers a rerender at a specified interval, providing the current time
 * (in milliseconds) to its child function. Useful for dynamically updating content based
 * on time-sensitive data.
 */
export const Rerender: React.FC<IRerenderProps> = (props) => {
    const { intervalDuration = 1000, children } = props;

    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), intervalDuration);
        return () => clearInterval(interval);
    }, [intervalDuration]);

    return children(time);
};
