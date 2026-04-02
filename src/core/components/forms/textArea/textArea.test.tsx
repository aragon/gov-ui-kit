import { render, screen } from '@testing-library/react';
import { type ITextAreaProps, TextArea } from './textArea';

describe('<TextArea /> component', () => {
    const createTestComponent = (props?: Partial<ITextAreaProps>) => {
        const completeProps: ITextAreaProps = {
            ...props,
        };

        return <TextArea {...completeProps} />;
    };

    it('renders a textarea element', () => {
        render(createTestComponent());
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('disables the textarea when the disabled property is set to true', () => {
        const disabled = true;
        render(createTestComponent({ disabled }));
        expect(screen.getByRole<HTMLTextAreaElement>('textbox').disabled).toBeTruthy();
    });
});
