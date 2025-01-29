import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { IconType } from '../../../icon';
import { DialogRoot } from '../dialogRoot';
import { DialogHeader, type IDialogHeaderProps } from './dialogHeader';

describe('<Dialog.Header/> component', () => {
    const createTestComponent = (props?: Partial<IDialogHeaderProps>) => {
        const completeProps: IDialogHeaderProps = {
            title: 'title',
            ...props,
        };

        return (
            <DialogRoot hiddenDescription="description" open={true}>
                <DialogHeader {...completeProps} />
            </DialogRoot>
        );
    };

    it('renders the given title', () => {
        const title = 'test title';
        render(createTestComponent({ title }));
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toHaveAccessibleName(title);
    });

    it('does not render a close button when the onClose property is not set', () => {
        render(createTestComponent());
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders a close button when the onClose property is set', () => {
        const onClose = jest.fn();
        render(createTestComponent({ onClose }));
        const closeButton = screen.getByRole('button');
        expect(closeButton).toBeInTheDocument();
        expect(within(closeButton).getByTestId(IconType.CLOSE)).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', async () => {
        const onClose = jest.fn();
        render(createTestComponent({ onClose }));
        await userEvent.click(screen.getByRole('button'));
        expect(onClose).toHaveBeenCalled();
    });
});
