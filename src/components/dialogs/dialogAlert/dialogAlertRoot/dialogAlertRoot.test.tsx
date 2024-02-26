import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { type ReactNode } from 'react';
import { DialogAlertRoot, type IDialogAlertRootProps } from './dialogAlertRoot';

describe('<DialogAlert.Root/> component', () => {
    const createTestComponent = (rootProps?: Partial<IDialogAlertRootProps>, children?: ReactNode) => {
        const completeRootProps: IDialogAlertRootProps = {
            ...rootProps,
        };

        return <DialogAlertRoot {...completeRootProps}>{children}</DialogAlertRoot>;
    };

    it('does not render the alertdialog by default', () => {
        render(createTestComponent());

        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });

    it('renders the alertdialog with the given content', () => {
        const content = 'test content';

        render(createTestComponent({ open: true }, content));

        const alertDialog = screen.getByRole('alertdialog');
        expect(alertDialog).toBeInTheDocument();
        expect(screen.getByText(content)).toBeInTheDocument();
    });

    it('calls the given click handler when the action button is clicked', async () => {
        const handleActionBtnClick = jest.fn();

        render(createTestComponent({ open: true }, <button onClick={handleActionBtnClick} />));

        await userEvent.click(screen.getByRole('button'));

        expect(handleActionBtnClick).toHaveBeenCalled();
    });
});
