import { render, screen } from '@testing-library/react';
import { Button } from './button';
import type { IButtonProps } from './button.api';

describe('<Button /> component', () => {
    const createTestComponent = (props?: Partial<IButtonProps>) => {
        const completeProps: IButtonProps = {
            variant: 'primary',
            size: 'md',
            ...props,
        };

        return <Button {...completeProps} />;
    };

    it('renders a button', () => {
        render(createTestComponent());
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders the specified button label', () => {
        const children = 'Button label';
        render(createTestComponent({ children }));
        expect(screen.getByRole('button', { name: children })).toBeInTheDocument();
    });
});
