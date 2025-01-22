import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DialogAlertHeader } from '../dialogAlertHeader';
import { DialogAlertRoot, type IDialogAlertRootProps } from './dialogAlertRoot';

describe('<DialogAlert.Root/> component', () => {
    const createTestComponent = (rootProps?: Partial<IDialogAlertRootProps>) => {
        const completeRootProps: IDialogAlertRootProps = {
            ...rootProps,
        };

        return <DialogAlertRoot {...completeRootProps} />;
    };

    it('does not render the alertdialog by default', () => {
        render(createTestComponent());

        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });

    it('renders the alertdialog with the given content', () => {
        const content = (
            <>
                <DialogAlertHeader title="title" description="description" />
                test content
            </>
        );

        render(createTestComponent({ open: true, children: content }));

        const alertDialog = screen.getByRole('alertdialog');
        expect(alertDialog).toBeInTheDocument();
        expect(screen.getByText('test content')).toBeInTheDocument();
    });

    it('calls the given click handler when the action button is clicked', async () => {
        const user = userEvent.setup();
        const handleActionBtnClick = jest.fn();
        const content = (
            <>
                <DialogAlertHeader title="title" description="description" />
                <button onClick={handleActionBtnClick} />
            </>
        );

        render(createTestComponent({ open: true, children: content }));

        await user.click(screen.getByRole('button'));
        expect(handleActionBtnClick).toHaveBeenCalled();
    });
});
