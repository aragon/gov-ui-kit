import { render, screen } from '@testing-library/react';
import { DialogRoot } from '../dialogRoot';
import { DialogContent, type IDialogContentProps } from './dialogContent';

describe('<Dialog.Content/> component', () => {
    const createTestComponent = (props?: Partial<IDialogContentProps>) => {
        const completeProps: IDialogContentProps = { ...props };

        const hiddenDescription = props?.description ? undefined : 'description';

        return (
            <DialogRoot hiddenTitle="title" hiddenDescription={hiddenDescription} open={true}>
                <DialogContent {...completeProps} />
            </DialogRoot>
        );
    };

    it('renders the given content', () => {
        const content = 'Test content';
        render(createTestComponent({ children: content }));
        expect(screen.getByText(content)).toBeInTheDocument();
    });

    it('renders the dialog description when specified', () => {
        const description = 'test-description';
        render(createTestComponent({ description }));
        expect(screen.getByText(description)).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toHaveAccessibleDescription(description);
    });
});
