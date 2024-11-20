import { render, screen } from '@testing-library/react';
import { InputContainer } from './inputContainer';
import type { IInputContainerProps } from './inputContainer.api';

describe('<InputContainer /> component', () => {
    const createTestComponent = (props?: Partial<IInputContainerProps>) => {
        const completeProps = {
            id: 'test',
            ...props,
        };

        return <InputContainer {...completeProps} />;
    };

    it('renders the input label when specified', () => {
        const label = 'input-label';

        // The getByLabelText requires a form control to be associated to the label
        const id = 'input-id';
        const children = <input id={id} />;

        render(createTestComponent({ label, children, id }));
        expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    it('renders the optional tag when the label is set and isOptional prop is set to true', () => {
        const label = 'label-test';
        const isOptional = true;
        render(createTestComponent({ label, isOptional }));
        expect(screen.getByText('Optional')).toBeInTheDocument();
    });

    it('renders the help text when defined', () => {
        const helpText = 'help-text-test';
        render(createTestComponent({ helpText }));
        expect(screen.getByText(helpText)).toBeInTheDocument();
    });

    it('renders the input value counter when maxLength is defined', () => {
        const maxLength = 100;
        const inputLength = 47;
        render(createTestComponent({ maxLength, inputLength }));
        expect(screen.getByText(`${inputLength.toString()}/${maxLength.toString()}`)).toBeInTheDocument();
    });

    it('adds a shake animation when the input length is equal to the max length property', () => {
        const maxLength = 10;
        const inputLength = 10;
        render(createTestComponent({ maxLength, inputLength }));
        expect(screen.getByText(`${inputLength.toString()}/${maxLength.toString()}`).className).toContain('shake');
    });

    it('renders the input alert when defined', () => {
        const alert = {
            message: 'input-alert-message',
            variant: 'critical' as const,
        };
        render(createTestComponent({ alert }));
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText(alert.message)).toBeInTheDocument();
    });

    it('renders the input alert when both alert and maxLength properties are set, and only displays the Alert', () => {
        const alert = {
            message: 'input-alert-message',
            variant: 'critical' as const,
        };
        const maxLength = 100;
        const inputLength = 47;

        render(createTestComponent({ alert, maxLength, inputLength }));

        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText(alert.message)).toBeInTheDocument();

        expect(screen.queryByText(`${inputLength.toString()}/${maxLength.toString()}`)).not.toBeInTheDocument();
    });
});
