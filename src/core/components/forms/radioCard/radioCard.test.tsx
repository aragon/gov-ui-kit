import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { RadioGroup } from '..';
import { IconType } from '../../icon';
import { RadioCard, type IRadioCardProps } from './radioCard';

jest.mock('../../avatars', () => ({
    Avatar: () => <div data-testid="avatar" />,
}));

describe('<RadioCard/> component', () => {
    const createTestComponent = (props?: Partial<IRadioCardProps>) => {
        const completeProps = { label: 'test label', value: 'test value', description: 'test description', ...props };

        return (
            <RadioGroup name="Test Group">
                <RadioCard {...completeProps} />;
            </RadioGroup>
        );
    };

    it('renders with avatar, label, description, tag, and unchecked radio button', () => {
        const avatar = 'avatar';
        const description = 'Test Description';
        const label = 'Test Label';
        const tag = { label: 'Tag Label' };

        render(createTestComponent({ avatar, description, label, tag }));

        const radioButton = screen.getByRole('radio');

        expect(radioButton).toBeInTheDocument();
        expect(radioButton).not.toBeChecked();
        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
        expect(screen.getByText(tag.label)).toBeInTheDocument();
        expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });

    it('renders the RADIO icon when unchecked', () => {
        render(createTestComponent());

        const uncheckedIcon = screen.getByTestId(IconType.RADIO);

        expect(uncheckedIcon).toBeVisible();
        expect(screen.getByRole('radio')).not.toBeChecked();
    });

    it('renders the RADIO_SELECTED icon when checked', async () => {
        const user = userEvent.setup();
        render(createTestComponent());

        const radioButton = screen.getByRole('radio');

        await user.click(radioButton);
        const checkedIcon = screen.getByTestId(IconType.RADIO_SELECTED);

        expect(checkedIcon).toBeVisible();
        expect(screen.getByRole('radio')).toBeChecked();
    });

    it('disables the radio button when disabled prop is true', () => {
        render(createTestComponent({ disabled: true }));

        expect(screen.getByRole('radio')).toBeDisabled();
    });

    it('sets the radio button value correctly', () => {
        const value = 'Test value';

        render(createTestComponent({ value }));

        expect(screen.getByRole('radio')).toHaveValue(value);
    });

    it('renders children when radio button is checked', async () => {
        const user = userEvent.setup();

        const children = 'test-children';
        render(createTestComponent({ children }));

        const radioButton = screen.getByRole('radio');

        await user.click(radioButton);
        expect(screen.getByText(children)).toBeVisible();
        expect(screen.getByRole('radio')).toBeChecked();
    });
});
