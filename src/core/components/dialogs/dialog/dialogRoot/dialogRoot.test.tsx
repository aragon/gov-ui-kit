import { render, screen } from '@testing-library/react';
import { testLogger } from '../../../../test';
import { DialogRoot } from './dialogRoot';
import type { IDialogRootProps } from './dialogRoot.api';

describe('<Dialog.Root/> component', () => {
    const createTestComponent = (props?: Partial<IDialogRootProps>) => {
        const completeProps: IDialogRootProps = {
            ...props,
        };

        return <DialogRoot {...completeProps} />;
    };

    it('does not render the dialog by default', () => {
        render(createTestComponent());
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders the dialog with the given content', () => {
        // Suppress missing dialog title/description warnings from radix-ui
        testLogger.suppressErrors();
        const children = 'test-content';
        render(createTestComponent({ open: true, children }));
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(screen.getByText(children)).toBeInTheDocument();
    });
});
