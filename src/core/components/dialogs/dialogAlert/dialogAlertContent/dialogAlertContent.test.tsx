import { render, screen } from '@testing-library/react';
import { DialogAlertContent, type IDialogAlertContentProps } from './dialogAlertContent';

describe('<DialogAlert.Content/> component', () => {
    const createTestComponent = (props?: Partial<IDialogAlertContentProps>) => {
        const completeProps: IDialogAlertContentProps = { ...props };

        return <DialogAlertContent {...completeProps} />;
    };

    it('renders the specified children', () => {
        const children = 'Test content';
        render(createTestComponent({ children }));
        expect(screen.getByText(children)).toBeInTheDocument();
    });
});
