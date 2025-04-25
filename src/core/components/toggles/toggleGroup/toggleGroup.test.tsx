import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Toggle } from '../toggle';
import { ToggleGroup, type IToggleGroupBaseProps, type IToggleGroupProps } from './toggleGroup';

describe('<ToggleGroup /> component', () => {
    const createTestComponent = (props: Partial<IToggleGroupProps> = {}) => {
        if (props.isMultiSelect) {
            return <ToggleGroup isMultiSelect={true} {...props} />;
        }

        const { isMultiSelect, ...otherProps } = props as IToggleGroupBaseProps<false>;

        return <ToggleGroup isMultiSelect={false} {...otherProps} />;
    };

    it('renders the children components', () => {
        const children = [
            <Toggle key="first" value="first" label="First" />,
            <Toggle key="second" value="second" label="Second" />,
        ];
        render(createTestComponent({ children }));
        expect(screen.getAllByRole('radio')).toHaveLength(children.length);
    });

    it('correctly updates the active value on toggle click', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        const value = 'test';
        const children = [<Toggle key={value} value={value} label={value} />];
        const { rerender } = render(createTestComponent({ onChange, children, value: '' }));

        await user.click(screen.getByRole('radio'));
        expect(onChange).toHaveBeenCalledWith(value);

        rerender(createTestComponent({ value, onChange, children }));

        await user.click(screen.getByRole('radio'));
        expect(onChange).toHaveBeenCalledWith('');
    });

    it('correctly updates the active values on toggle click on multi-select variant', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        const isMultiSelect = true;
        const firstValue = 'first';
        const secondValue = 'second';
        const children = [
            <Toggle key={firstValue} value={firstValue} label={firstValue} />,
            <Toggle key={secondValue} value={secondValue} label={secondValue} />,
        ];
        const { rerender } = render(createTestComponent({ onChange, children, isMultiSelect, value: [] }));

        await user.click(screen.getByRole('button', { name: firstValue }));
        const newValue = [firstValue];
        expect(onChange).toHaveBeenCalledWith(newValue);

        rerender(createTestComponent({ value: newValue, onChange, children, isMultiSelect }));

        await user.click(screen.getByRole('button', { name: secondValue }));
        expect(onChange).toHaveBeenCalledWith([...newValue, secondValue]);
    });
});
