import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as ReactHookForm from 'react-hook-form';
import { modulesCopy } from '../../../../../assets';
import {
    type IProposalActionsDecoderBooleanFieldProps,
    ProposalActionsDecoderBooleanField,
} from './proposalActionsDecoderBooleanField';

jest.mock('react-hook-form', () => ({
    ...jest.requireActual<typeof ReactHookForm>('react-hook-form'),
    __esModule: true,
}));

describe('<ProposalActionsDecoderBooleanField /> component', () => {
    const useControllerSpy = jest.spyOn(ReactHookForm, 'useController');

    beforeEach(() => {
        useControllerSpy.mockReturnValue({
            fieldState: { error: undefined },
            field: { value: undefined, onBlur: jest.fn(), onChange: jest.fn(), ref: jest.fn() },
        } as unknown as ReactHookForm.UseControllerReturn);
    });

    afterEach(() => {
        useControllerSpy.mockReset();
    });

    const createTestComponent = (props?: Partial<IProposalActionsDecoderBooleanFieldProps>) => {
        const completeProps: IProposalActionsDecoderBooleanFieldProps = {
            parameter: { name: 'boolParam', type: 'bool', value: undefined },
            fieldName: 'testName',
            ...props,
        };

        return <ProposalActionsDecoderBooleanField {...completeProps} />;
    };

    it('registers the field on the form context and renders a radio group with no default selection', () => {
        const fieldName = 'parameter.0.value';
        render(createTestComponent({ fieldName }));

        expect(useControllerSpy).toHaveBeenCalledWith({
            name: fieldName,
            rules: { validate: expect.any(Function) as unknown },
        });

        const radios = screen.getAllByRole('radio');
        expect(radios).toHaveLength(2);
        radios.forEach((radio) => expect(radio).not.toBeChecked());
        expect(screen.getByRole('radio', { name: modulesCopy.proposalActionsDecoder.booleanTrue })).toBeInTheDocument();
        expect(
            screen.getByRole('radio', { name: modulesCopy.proposalActionsDecoder.booleanFalse }),
        ).toBeInTheDocument();
    });

    it('prefixes the field name with the formPrefix property when set', () => {
        const fieldName = 'value';
        const formPrefix = 'actions.0';
        render(createTestComponent({ fieldName, formPrefix }));
        expect(useControllerSpy).toHaveBeenCalledWith(expect.objectContaining({ name: `${formPrefix}.${fieldName}` }));
    });

    it('renders the parameter name, type and notice as field labels', () => {
        const parameter = { name: 'tryExecute', notice: 'description', type: 'bool', value: undefined };
        render(createTestComponent({ parameter }));
        expect(screen.getByText(`(${parameter.type})`)).toBeInTheDocument();
        expect(screen.getByText(parameter.notice)).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByText(`(${parameter.type})`).parentElement).toHaveTextContent(
            `${parameter.name} (${parameter.type})`,
        );
    });

    it('does not render the field labels when hideLabels property is set to true', () => {
        const parameter = { name: 'tryExecute', notice: 'description', type: 'bool', value: undefined };
        render(createTestComponent({ parameter, hideLabels: true }));
        expect(screen.queryByText(`(${parameter.type})`)).not.toBeInTheDocument();
        expect(screen.queryByText(parameter.notice)).not.toBeInTheDocument();
    });

    it('checks the radio item matching the current field value', () => {
        useControllerSpy.mockReturnValue({
            fieldState: { error: undefined },
            field: { value: false, onChange: jest.fn() },
        } as unknown as ReactHookForm.UseControllerReturn);
        render(createTestComponent());
        expect(screen.getByRole('radio', { name: modulesCopy.proposalActionsDecoder.booleanFalse })).toBeChecked();
        expect(screen.getByRole('radio', { name: modulesCopy.proposalActionsDecoder.booleanTrue })).not.toBeChecked();
    });

    it('triggers the onChange callback with a boolean value on radio selection', async () => {
        const onChange = jest.fn();
        useControllerSpy.mockReturnValue({
            fieldState: { error: undefined },
            field: { value: undefined, onBlur: jest.fn(), onChange, ref: jest.fn() },
        } as unknown as ReactHookForm.UseControllerReturn);
        render(createTestComponent());
        await userEvent.click(screen.getByRole('radio', { name: modulesCopy.proposalActionsDecoder.booleanTrue }));
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('passes form blur and ref handlers to the radio group', () => {
        const onBlur = jest.fn();
        const ref = jest.fn();
        useControllerSpy.mockReturnValue({
            fieldState: { error: undefined },
            field: { value: undefined, onBlur, onChange: jest.fn(), ref },
        } as unknown as ReactHookForm.UseControllerReturn);
        render(createTestComponent());
        const radioGroup = screen.getByRole('radiogroup');
        expect(ref).toHaveBeenCalledWith(radioGroup);

        radioGroup.focus();
        radioGroup.blur();
        expect(onBlur).toHaveBeenCalled();
    });

    it('renders an alert when the form field has an error', () => {
        const error = { message: 'invalid field' };
        useControllerSpy.mockReturnValue({
            fieldState: { error },
            field: { value: undefined, onBlur: jest.fn(), onChange: jest.fn(), ref: jest.fn() },
        } as unknown as ReactHookForm.UseControllerReturn);
        render(createTestComponent());
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText(error.message)).toBeInTheDocument();
    });
});
