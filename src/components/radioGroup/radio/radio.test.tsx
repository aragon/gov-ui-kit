import { fireEvent, render, screen } from '@testing-library/react';
import { RadioGroup } from '..';
import { IconType } from '../../icon';
import { Radio, type IRadioProps } from './radio';

describe('<Radio/> component', () => {
    const createTestComponent = (props?: Partial<IRadioProps>) => {
        const completeProps = { label: 'test label', value: 'test value', ...props };

        return (
            <RadioGroup name="Test Group">
                <Radio {...completeProps} />;
            </RadioGroup>
        );
    };

    it('renders a label and an unchecked radio button', () => {
        const label = 'Test label';

        render(createTestComponent({ label }));

        const radioButton = screen.getByRole('radio');

        expect(radioButton).toBeInTheDocument();
        expect(radioButton).not.toBeChecked();
        expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    it('renders the RADIO_DEFAULT icon when unchecked', () => {
        render(createTestComponent());

        const uncheckedIcon = screen.getByTestId(IconType.RADIO_DEFAULT);

        expect(uncheckedIcon).toBeVisible();
        expect(screen.getByRole('radio')).not.toBeChecked();
    });

    it('renders the RADIO_SELECTED icon when checked', () => {
        render(createTestComponent());

        const radioButton = screen.getByRole('radio');

        fireEvent.click(radioButton);
        const checkedIcon = screen.getByTestId(IconType.RADIO_SELECTED);

        expect(checkedIcon).toBeVisible();
        expect(screen.getByRole('radio')).toBeChecked();
    });

    it('disables the radio button when disabled prop is true', () => {
        render(createTestComponent({ disabled: true }));

        expect(screen.getByRole('radio')).toBeDisabled();
    });

    it('sets the radio button value correctly', () => {
        const label = 'Test label';
        const value = 'Test value';

        render(createTestComponent({ label, value }));

        expect(screen.getByRole('radio')).toHaveValue(value);
    });

    it('sets the label position correctly when variant is left', () => {
        const label = 'Test label';
        const value = 'Test value';
        const variant = 'left';

        render(createTestComponent({ label, value, labelPosition: variant }));

        expect(screen.getByRole('radio')).toHaveClass('order-2');
    });

    it('sets the label position to right by default', () => {
        const label = 'Test label';
        const value = 'Test value';

        render(createTestComponent({ label, value }));

        expect(screen.getByRole('radio')).not.toHaveClass('order-2');
    });
});
