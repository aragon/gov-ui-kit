import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconType } from '../../icon';
import { DataListActionItem, type IDataListActionItemProps } from './dataListActionItem';

describe('<DataList.ActionItem /> component', () => {
    const createTestComponent = (props?: Partial<IDataListActionItemProps>) => {
        const completeProps: IDataListActionItemProps = {
            icon: IconType.PLUS,
            variant: 'primary',
            children: 'Action label',
            ...props,
        };

        return <DataListActionItem {...completeProps} />;
    };

    it('renders a button with the given label and icon', () => {
        render(createTestComponent({ children: 'Add custom address', icon: IconType.PLUS }));
        const button = screen.getByRole('button', { name: /add custom address/i });
        expect(button).toBeInTheDocument();
        expect(screen.getByTestId(IconType.PLUS)).toBeInTheDocument();
    });

    it('applies primary variant classes when variant is primary', () => {
        render(createTestComponent({ variant: 'primary' }));
        const button = screen.getByRole('button');
        expect(button.className).toContain('text-primary-400');
    });

    it('applies neutral variant classes when variant is neutral', () => {
        render(createTestComponent({ variant: 'neutral' }));
        const button = screen.getByRole('button');
        expect(button.className).toContain('text-neutral-500');
    });

    it('calls onClick when clicked', async () => {
        const onClick = jest.fn();
        render(createTestComponent({ onClick }));
        await userEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('defaults type to button', () => {
        render(createTestComponent());
        expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('respects an overriding type prop', () => {
        render(createTestComponent({ type: 'submit' }));
        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('merges a custom className', () => {
        render(createTestComponent({ className: 'custom-class' }));
        expect(screen.getByRole('button').className).toContain('custom-class');
    });
});
