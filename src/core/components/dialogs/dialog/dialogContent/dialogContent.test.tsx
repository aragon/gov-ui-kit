import { render, screen } from '@testing-library/react';
import { DialogRoot } from '../dialogRoot';
import { DialogContent, type IDialogContentProps } from './dialogContent';

describe('<Dialog.Content/> component', () => {
    const createTestComponent = (props?: Partial<IDialogContentProps>) => {
        const completeProps: IDialogContentProps = { ...props };

        return (
            <DialogRoot hiddenTitle="title" open={true}>
                <DialogContent {...completeProps} />
            </DialogRoot>
        );
    };

    it('renders the given content', () => {
        const content = 'Test content';
        render(createTestComponent({ children: content }));
        expect(screen.getByText(content)).toBeInTheDocument();
    });

    it('renders the description when provided', () => {
        const description = 'test description';
        render(createTestComponent({ description }));
        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
        const children = 'content';
        render(createTestComponent({ children }));
        const dialog = screen.getByRole('dialog');
        expect(dialog).not.toHaveAccessibleDescription();
    });
});
