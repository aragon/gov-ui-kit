import { render, screen } from '@testing-library/react';
import * as ReactHookForm from 'react-hook-form';
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

    beforeEach(() => {
        useControllerSpy.mockReturnValue({
            fieldState: { error: undefined },
            field: {},
        } as unknown as ReactHookForm.UseControllerReturn);
    });

    afterEach(() => {
        useControllerSpy.mockReset();
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
            field: { value: 'initial-data', onChange: jest.fn() },
        } as unknown as ReactHookForm.UseControllerReturn;
        useControllerSpy.mockReturnValue(controllerReturn);
        render(createTestComponent());
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText(controllerReturn.fieldState.error!.message!)).toBeInTheDocument();
    });
});
