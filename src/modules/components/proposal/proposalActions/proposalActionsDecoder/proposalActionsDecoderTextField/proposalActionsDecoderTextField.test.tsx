import { render, screen } from '@testing-library/react';
import { ProposalActionsDecoderMode } from '../proposalActionsDecoder.api';
import { ProposalActionsDecoderTextField } from './proposalActionsDecoderTextField';
import type { IProposalActionsDecoderTextFieldProps } from './proposalActionsDecoderTextField.api';

jest.mock('./proposalActionsDecoderTextFieldWatch', () => ({
    ProposalActionsDecoderTextFieldWatch: () => <div data-testid="watch-mock" />,
}));

jest.mock('./proposalActionsDecoderTextFieldEdit', () => ({
    ProposalActionsDecoderTextFieldEdit: () => <div data-testid="edit-mock" />,
}));

describe('<ProposalActionsDecoderTextField /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionsDecoderTextFieldProps>) => {
        const completeProps: IProposalActionsDecoderTextFieldProps = {
            parameter: { name: 'test', type: 'uint', value: undefined },
            fieldName: 'field',
            ...props,
        };

        return <ProposalActionsDecoderTextField {...completeProps} />;
    };

    it('renders the watch field when mode is set to WATCH', () => {
        const mode = ProposalActionsDecoderMode.WATCH;
        render(createTestComponent({ mode }));
        expect(screen.getByTestId('watch-mock')).toBeInTheDocument();
    });

    it('renders the edit field when mode is set to EDIT', () => {
        const mode = ProposalActionsDecoderMode.EDIT;
        render(createTestComponent({ mode }));
        expect(screen.getByTestId('edit-mock')).toBeInTheDocument();
    });

    it('renders an input component with the parameter value, name and notice as disabled', () => {
        const parameter = { name: 'tryExecute', notice: 'description', type: 'bool', value: false };
        render(createTestComponent({ parameter }));
        const textInput = screen.getByRole('textbox', { name: `${parameter.name} ${parameter.notice}` });
        expect(textInput).toBeInTheDocument();
        expect(textInput).toBeDisabled();
        expect(textInput.tagName).toEqual('INPUT');
        expect(textInput).toHaveDisplayValue(parameter.value.toString());
    });

    it('renders a textarea component when component property is set to textarea', () => {
        const component = 'textarea';
        render(createTestComponent({ component }));
        const textArea = screen.getByRole('textbox');
        expect(textArea).toBeInTheDocument();
        expect(textArea.tagName).toEqual('TEXTAREA');
        expect(textArea).toBeDisabled();
    });

    it('does not render the field name and label when hideLabels property is set to true', () => {
        const parameter = { name: 'field-name', notice: 'field-notice', type: 'address', value: undefined };
        const hideLabels = true;
        render(createTestComponent({ parameter, hideLabels }));
        expect(screen.queryByText(parameter.name)).not.toBeInTheDocument();
        expect(screen.queryByText(parameter.notice)).not.toBeInTheDocument();
    });
});
