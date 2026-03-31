import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Radio } from '../radio';
import { type IRadioGroupProps, RadioGroup } from './radioGroup';

describe('<RadioGroup /> component', () => {
    const createTestComponent = (props?: Partial<IRadioGroupProps>) => {
        return <RadioGroup {...props} />;
    };

    it('renders the radio group correctly', () => {
        const children = [<Radio key={1} label="1" value="1" />, <Radio key={2} label="2" value="2" />];

        render(createTestComponent({ children }));

        const inputRadioElements = screen.getAllByRole('radio');

        expect(screen.getByRole('radiogroup')).toBeInTheDocument();
        expect(inputRadioElements.length).toEqual(children.length);
        inputRadioElements.forEach((radio) => {
            expect(radio).toBeEnabled();
        });
    });

    it('disables all radio buttons when disabled prop is true', () => {
        const children = [<Radio key={1} label="1" value="1" />, <Radio key={2} label="2" value="2" />];

        render(createTestComponent({ children, disabled: true }));

        screen.getAllByRole('radio').forEach((radio) => {
            expect(radio).toBeDisabled();
        });
    });

    it('sets the radio group value correctly', () => {
        const value = '1';
        const children = [<Radio key={1} label="1" value={value} />, <Radio key={2} label="2" value="2" />];

        render(createTestComponent({ children, value }));
        const inputRadioElement = screen.getByRole('radio', { checked: true });

        expect(inputRadioElement).toHaveValue(value);
    });

    it('calls `onValueChange` when a radio button is clicked', async () => {
        const user = userEvent.setup();
        const handleValueChange = jest.fn();
        const value = '1';
        const children = [<Radio key={1} label="1" value={value} />];

        render(createTestComponent({ children, onValueChange: handleValueChange }));

        await user.click(screen.getByRole('radio'));
        expect(handleValueChange).toHaveBeenCalledWith(value);
    });
});
