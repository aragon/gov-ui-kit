import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ToggleGroup } from '../toggleGroup';
import { type IToggleProps, Toggle } from './toggle';

describe('<Toggle /> component', () => {
    const createTestComponent = (props?: Partial<IToggleProps>) => {
        const completeProps: IToggleProps = {
            label: 'label',
            value: 'value',
            ...props,
        };

        return (
            <ToggleGroup isMultiSelect={false}>
                <Toggle {...completeProps} />
            </ToggleGroup>
        );
    };

    it('renders a toggle with the specified label', () => {
        const label = 'Toggle Label';
        render(createTestComponent({ label }));
        expect(screen.getByRole('radio', { name: label })).toBeInTheDocument();
    });

    it('renders the toggle as disabled when the disabled prop is set to true', () => {
        const disabled = true;
        render(createTestComponent({ disabled }));
        expect(screen.getByRole('radio')).toBeDisabled();
    });

    it('renders the toggle as active when clicked', async () => {
        const user = userEvent.setup();
        render(createTestComponent());
        await user.click(screen.getByRole('radio'));
        expect(screen.getByRole('radio')).toBeChecked();
    });
});
