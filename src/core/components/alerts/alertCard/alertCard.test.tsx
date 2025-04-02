import { render, screen } from '@testing-library/react';
import { AlertCard, type IAlertCardProps } from './alertCard';

describe('<AlertCard /> component', () => {
    const createTestComponent = (props?: Partial<IAlertCardProps>) => {
        const completeProps: IAlertCardProps = {
            message: 'Message',
            ...props,
        };

        return <AlertCard {...completeProps} />;
    };

    it('renders an alert', () => {
        render(createTestComponent());
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('renders the alert message and children', () => {
        const children = 'Alert Description';
        const message = 'Alert Message';
        render(createTestComponent({ children, message }));
        expect(screen.getByText(children)).toBeVisible();
        expect(screen.getByText(message)).toBeVisible();
    });
});
