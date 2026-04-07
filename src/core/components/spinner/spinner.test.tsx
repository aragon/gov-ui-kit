import { render, screen } from '@testing-library/react';
import { type ISpinnerProps, Spinner } from './spinner';

describe('<Spinner /> component', () => {
    const createTestComponent = (props?: Partial<ISpinnerProps>) => {
        const completeProps: ISpinnerProps = {
            variant: 'primary',
            size: 'md',
            ...props,
        };

        return <Spinner {...completeProps} />;
    };

    it('renders a loading spinner by default', () => {
        render(createTestComponent());
        const spinner = screen.getByRole('progressbar');
        expect(spinner).toBeInTheDocument();
        expect(spinner.className).toMatch(/border-t/);
    });

    it('renders a static spinner when isLoading is set to false', () => {
        const isLoading = false;
        render(createTestComponent({ isLoading }));
        expect(screen.getByRole('progressbar').className).not.toMatch(/border-t/);
    });
});
