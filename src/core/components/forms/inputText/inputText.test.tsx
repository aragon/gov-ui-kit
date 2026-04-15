import { render, screen } from '@testing-library/react';
import { IconType } from '../../icon';
import type { IInputTextProps } from '.';
import { InputText } from './inputText';

describe('<InputText /> component', () => {
    const createTestComponent = (props?: Partial<IInputTextProps>) => {
        const completeProps = { ...props };

        return <InputText {...completeProps} />;
    };

    it('renders a text input element', () => {
        render(createTestComponent());
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('disables the text input when disabled is set to true', () => {
        const disabled = true;
        render(createTestComponent({ disabled }));
        expect(screen.getByRole<HTMLInputElement>('textbox').disabled).toBeTruthy();
    });

    it('applies the input class names when defined', () => {
        const inputClassName = 'class-test';
        render(createTestComponent({ inputClassName }));
        expect(screen.getByRole('textbox').className).toContain(inputClassName);
    });

    it('renders an addon (+ on the right) with all addon props specified', () => {
        const addon = 'Right Addon';
        render(createTestComponent({ addon, addonPosition: 'right' }));
        expect(screen.getByText(addon)).toBeInTheDocument();
    });

    it('does not render an addon when the addon string is empty', () => {
        render(createTestComponent({ addon: '', addonPosition: 'left' }));
        const addonElement = screen.queryByTestId('input-addon');
        expect(addonElement).not.toBeInTheDocument();
    });

    it('renders the left icon when iconLeft is set', () => {
        render(createTestComponent({ iconLeft: IconType.SEARCH }));
        expect(screen.getByTestId(IconType.SEARCH)).toBeInTheDocument();
    });

    it('renders the right icon when iconRight is set', () => {
        render(createTestComponent({ iconRight: IconType.CALENDAR }));
        expect(screen.getByTestId(IconType.CALENDAR)).toBeInTheDocument();
    });

    it('does not render the left icon when iconLeft is not set', () => {
        render(createTestComponent());
        expect(screen.queryByTestId(IconType.SEARCH)).not.toBeInTheDocument();
    });

    it('does not render the right icon when iconRight is not set', () => {
        render(createTestComponent());
        expect(screen.queryByTestId(IconType.CALENDAR)).not.toBeInTheDocument();
    });
});
