import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as ReactHookForm from 'react-hook-form';
import * as useFormContext from '../../../../../hooks';
import {
    ProposalActionsDecoderTextFieldEdit,
    type IProposalActionsDecoderTextFieldEditProps,
} from './proposalActionsDecoderTextFieldEdit';

jest.mock('react-hook-form', () => ({
    ...jest.requireActual<typeof ReactHookForm>('react-hook-form'),
    __esModule: true,
}));

describe('<ProposalActionsDecoderTextFieldEdit /> component', () => {
    const useControllerSpy = jest.spyOn(ReactHookForm, 'useController');
    const useFormContextSpy = jest.spyOn(useFormContext, 'useFormContext');

    beforeEach(() => {
        useControllerSpy.mockReturnValue({
            fieldState: { error: undefined },
            field: { onChange: jest.fn() },
        } as unknown as ReactHookForm.UseControllerReturn);
        useFormContextSpy.mockReturnValue({ watch: jest.fn() } as unknown as useFormContext.UseFormContextReturn);
    });

    afterEach(() => {
        useControllerSpy.mockReset();
        useFormContextSpy.mockReset();
    });

    const createTestComponent = (props?: Partial<IProposalActionsDecoderTextFieldEditProps>) => {
        const completeProps: IProposalActionsDecoderTextFieldEditProps = {
            parameter: { name: 'test', type: 'int', value: undefined },
            fieldName: 'testName',
            ...props,
        };

        return <ProposalActionsDecoderTextFieldEdit {...completeProps} />;
    };

    it('registers the field on the form context and renders a text field', () => {
        const controllerReturn = {
            fieldState: { error: undefined },
            field: { value: 'initial-data', onChange: jest.fn() },
        } as unknown as ReactHookForm.UseControllerReturn;
        const fieldName = 'parameter.0.value';
        useControllerSpy.mockReturnValue(controllerReturn);
        useFormContextSpy.mockReturnValue({
            watch: () => controllerReturn.field.value as unknown,
        } as useFormContext.UseFormContextReturn);
        render(createTestComponent({ fieldName }));

        expect(useControllerSpy).toHaveBeenCalledWith({
            name: fieldName,
            rules: { validate: expect.any(Function) as unknown },
        });

        const textField = screen.getByRole('textbox');
        expect(textField).toBeInTheDocument();
        expect(textField.tagName).toEqual('INPUT');
        expect(textField).toHaveDisplayValue(controllerReturn.field.value as string);
    });

    it('renders a textarea component when the component prop is set to textarea', () => {
        const component = 'textarea';
        render(createTestComponent({ component }));
        const textArea = screen.getByRole('textbox');
        expect(textArea.tagName).toEqual('TEXTAREA');
    });

    it('renders an alert when the form field has an error', () => {
        const controllerReturn = {
            fieldState: { error: { message: 'invalid field' } },
            field: { value: undefined, onChange: jest.fn() },
        } as unknown as ReactHookForm.UseControllerReturn;
        useControllerSpy.mockReturnValue(controllerReturn);
        render(createTestComponent());
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText(controllerReturn.fieldState.error!.message!)).toBeInTheDocument();
    });

    it('sets correct validation rules for non array types', () => {
        const parameter = { name: 'boolParam', type: 'bool', value: undefined };
        const fieldName = 'test';
        render(createTestComponent({ fieldName, parameter }));
        expect(useControllerSpy).toHaveBeenCalledWith({
            name: fieldName,
            rules: { validate: expect.any(Function) as unknown },
        });
    });

    it('does not set validation rules for array types', () => {
        const parameter = { name: 'tupleArray', type: 'tuple[]', value: undefined };
        const fieldName = 'test';
        render(createTestComponent({ fieldName, parameter }));
        expect(useControllerSpy).toHaveBeenCalledWith({ name: fieldName, rules: { validate: undefined } });
    });

    it('triggers the onChange callback with a boolean value when type is boolean and the value is valid', async () => {
        const onChange = jest.fn();
        const parameter = { name: 'boolParam', type: 'bool', value: undefined };
        const controllerReturn = {
            fieldState: { error: undefined },
            field: { value: 'tru', onChange },
        } as unknown as ReactHookForm.UseControllerReturn;
        useControllerSpy.mockReturnValue(controllerReturn);
        useFormContextSpy.mockReturnValue({
            watch: () => controllerReturn.field.value as unknown,
        } as useFormContext.UseFormContextReturn);
        render(createTestComponent({ parameter }));
        await userEvent.type(screen.getByRole('textbox'), 'e');
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('triggers the onChange callback with a with the lowercased input when value is boolean but not valid', async () => {
        const onChange = jest.fn();
        const parameter = { name: 'boolParam', type: 'bool', value: undefined };
        const controllerReturn = {
            fieldState: { error: undefined },
            field: { value: 'TR', onChange },
        } as unknown as ReactHookForm.UseControllerReturn;
        useControllerSpy.mockReturnValue(controllerReturn);
        useFormContextSpy.mockReturnValue({
            watch: () => controllerReturn.field.value as unknown,
        } as useFormContext.UseFormContextReturn);
        render(createTestComponent({ parameter }));
        await userEvent.type(screen.getByRole('textbox'), 'U');
        expect(onChange).toHaveBeenCalledWith('tru');
    });

    it('triggers the onChange callback removing the non-numberic values when type is a number', async () => {
        const onChange = jest.fn();
        const parameter = { name: 'uintParam', type: 'uint32', value: undefined };
        const controllerReturn = {
            fieldState: { error: undefined },
            field: { value: 'ab--32.', onChange },
        } as unknown as ReactHookForm.UseControllerReturn;
        useControllerSpy.mockReturnValue(controllerReturn);
        useFormContextSpy.mockReturnValue({
            watch: () => controllerReturn.field.value as unknown,
        } as useFormContext.UseFormContextReturn);
        render(createTestComponent({ parameter }));
        await userEvent.type(screen.getByRole('textbox'), '1');
        expect(onChange).toHaveBeenCalledWith('-321');
    });

    it('triggers the onChange callback with native event when parameter type is a simple type', async () => {
        const onChange = jest.fn();
        const parameter = { name: 'addressType', type: 'address', value: undefined };
        const controllerReturn = {
            fieldState: { error: undefined },
            field: { value: '0x00', onChange },
        } as unknown as ReactHookForm.UseControllerReturn;
        useControllerSpy.mockReturnValue(controllerReturn);
        useFormContextSpy.mockReturnValue({
            watch: () => controllerReturn.field.value as unknown,
        } as useFormContext.UseFormContextReturn);
        render(createTestComponent({ parameter }));
        await userEvent.type(screen.getByRole('textbox'), '-');
        expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({ target: expect.objectContaining({ value: '0x00' }) as unknown }),
        );
    });

    it('initialises arrays to empty-arrays when value is null', () => {
        const onChange = jest.fn();
        const parameter = { name: 'uintArray', type: 'uint[]', value: undefined };
        const controllerReturn = {
            fieldState: { error: undefined },
            field: { value: parameter.value, onChange },
        } as unknown as ReactHookForm.UseControllerReturn;
        useControllerSpy.mockReturnValue(controllerReturn);
        useFormContextSpy.mockReturnValue({
            watch: () => controllerReturn.field.value as unknown,
        } as useFormContext.UseFormContextReturn);
        render(createTestComponent({ parameter }));
        expect(onChange).toHaveBeenCalledWith([]);
    });

    it('does not change array values when parameter value is defined', () => {
        const onChange = jest.fn();
        const parameter = { name: 'uintArray', type: 'uint[]', value: ['111'] };
        const controllerReturn = {
            fieldState: { error: undefined },
            field: { value: parameter.value, onChange },
        } as unknown as ReactHookForm.UseControllerReturn;
        useControllerSpy.mockReturnValue(controllerReturn);
        useFormContextSpy.mockReturnValue({
            watch: () => controllerReturn.field.value as unknown,
        } as useFormContext.UseFormContextReturn);
        render(createTestComponent({ parameter }));
        expect(onChange).not.toHaveBeenCalled();
    });
});
