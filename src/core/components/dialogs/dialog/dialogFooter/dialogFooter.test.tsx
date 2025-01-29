import { render, screen } from '@testing-library/react';
import { DialogFooter, type IDialogFooterProps } from './dialogFooter';

describe('<Dialog.Footer/> component', () => {
    const createTestComponent = (props?: Partial<IDialogFooterProps>) => {
        const completeProps: IDialogFooterProps = {
            ...props,
        };

        return <DialogFooter {...completeProps} />;
    };

    it('renders the primary action when set', () => {
        const primaryAction = { label: 'primary action' };
        render(createTestComponent({ primaryAction }));
        expect(screen.getByRole('button', { name: primaryAction.label })).toBeInTheDocument();
    });

    it('renders the secondary action when set', () => {
        const secondaryAction = { label: 'secondary action' };
        render(createTestComponent({ secondaryAction }));
        expect(screen.getByRole('button', { name: secondaryAction.label })).toBeInTheDocument();
    });
});
