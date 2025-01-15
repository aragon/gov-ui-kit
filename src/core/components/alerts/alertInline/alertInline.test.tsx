import { render, screen } from '@testing-library/react';
import { AlertInline, type IAlertInlineProps } from './alertInline';

describe('<AlertInline />', () => {
    const createTestComponent = (props?: Partial<IAlertInlineProps>) => {
        const completeProps: IAlertInlineProps = {
            message: 'Message',
            ...props,
        };

        return <AlertInline {...completeProps} />;
    };

    it('renders an alert', () => {
        render(createTestComponent());
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('renders message and description', () => {
        const message = 'Alert Message';
        render(createTestComponent({ message }));
        expect(screen.getByText(message)).toBeVisible();
    });
});
