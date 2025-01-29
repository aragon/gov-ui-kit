import { render, screen } from '@testing-library/react';
import { testLogger } from '../../../../test';
import { DialogHeader } from '../dialogHeader';
import { DialogRoot } from '../dialogRoot';
import { DialogContent, type IDialogContentProps } from './dialogContent';

describe('<Dialog.Content/> component', () => {
    const createTestComponent = (props?: Partial<IDialogContentProps>) => {
        const completeProps: IDialogContentProps = { ...props };

        return (
            <DialogRoot open={true}>
                <DialogHeader title="title" />
                <DialogContent {...completeProps} />
            </DialogRoot>
        );
    };

    it('renders the given content', () => {
        // Suppress missing description warning from radix-ui
        testLogger.suppressErrors();
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
