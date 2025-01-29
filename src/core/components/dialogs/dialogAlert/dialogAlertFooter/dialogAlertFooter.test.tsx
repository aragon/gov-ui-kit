import { render, screen } from '@testing-library/react';
import { DialogAlertRoot } from '../dialogAlertRoot';
import { DialogAlertFooter, type IDialogAlertFooterProps } from './dialogAlertFooter';

describe('<DialogAlert.Footer/> component', () => {
    const createTestComponent = (props?: Partial<IDialogAlertFooterProps>) => {
        const completeProps: IDialogAlertFooterProps = {
            actionButton: { label: 'action' },
            cancelButton: { label: 'cancel' },
            ...props,
        };

        return (
            <DialogAlertRoot hiddenTitle="title" hiddenDescription="description" open={true}>
                <DialogAlertFooter {...completeProps} />;
            </DialogAlertRoot>
        );
    };

    it('renders the action and cancel buttons', () => {
        const actionButton = { label: 'test action' };
        const cancelButton = { label: 'test cancel' };

        render(createTestComponent({ actionButton, cancelButton }));

        expect(screen.getByRole('button', { name: actionButton.label })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: cancelButton.label })).toBeInTheDocument();
    });
});
