import { render, screen } from '@testing-library/react';
import { DialogHeader } from '../dialogHeader';
import { DialogRoot } from './dialogRoot';
import type { IDialogRootProps } from './dialogRoot.api';

describe('<Dialog.Root/> component', () => {
    const createTestComponent = (rootProps?: Partial<IDialogRootProps>) => {
        const completeRootProps: IDialogRootProps = {
            ...rootProps,
        };

        return <DialogRoot {...completeRootProps} />;
    };

    it('does not render the dialog by default', () => {
        render(createTestComponent());

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders the dialog with the given content', () => {
        const content = (
            <>
                <DialogHeader title="test" description="description" />
                <div>test content</div>
            </>
        );

        render(createTestComponent({ open: true, children: content }));

        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(screen.getByText('test content')).toBeInTheDocument();
    });
});
