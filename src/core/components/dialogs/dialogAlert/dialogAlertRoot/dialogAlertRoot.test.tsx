import { render, screen } from '@testing-library/react';
import { testLogger } from '../../../../test';
import { DialogAlertRoot } from './dialogAlertRoot';
import type { IDialogAlertRootProps } from './dialogAlertRoot.api';

describe('<DialogAlert.Root/> component', () => {
    const createTestComponent = (rootProps?: Partial<IDialogAlertRootProps>) => {
        const completeRootProps: IDialogAlertRootProps = {
            ...rootProps,
        };

        return <DialogAlertRoot {...completeRootProps} />;
    };

    it('does not render the alert dialog by default', () => {
        render(createTestComponent());
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });

    it('renders the alertdialog with the given content', () => {
        // Suppress missing dialog title/description warnings from radix-ui
        testLogger.suppressErrors();
        const children = 'test-children';
        render(createTestComponent({ open: true, children }));
        expect(screen.getByRole('alertdialog')).toBeInTheDocument();
        expect(screen.getByText(children)).toBeInTheDocument();
    });
});
