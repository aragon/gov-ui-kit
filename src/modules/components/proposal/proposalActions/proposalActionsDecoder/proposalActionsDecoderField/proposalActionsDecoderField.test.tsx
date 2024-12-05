import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as ReactHookForm from 'react-hook-form';
import { IconType } from '../../../../../../core';
import { modulesCopy } from '../../../../../assets';
import * as ModuleHooks from '../../../../../hooks';
import { generateFormContext } from '../../../../../testUtils';
import { ProposalActionsDecoderMode } from '../proposalActionsDecoder.api';
import { type IProposalActionsDecoderFieldProps, ProposalActionsDecoderField } from './proposalActionsDecoderField';

jest.mock('react-hook-form', () => ({
    ...jest.requireActual<typeof ReactHookForm>('react-hook-form'),
    __esModule: true,
}));

describe('<ProposalActionsDecoderField /> component', () => {
    const useFormContextSpy = jest.spyOn(ModuleHooks, 'useFormContext');
    const useControllerSpy = jest.spyOn(ReactHookForm, 'useController');
    const useWatchSpy = jest.spyOn(ReactHookForm, 'useWatch');

    beforeEach(() => {
        useFormContextSpy.mockReturnValue(generateFormContext());
        useControllerSpy.mockReturnValue({
            fieldState: { error: undefined },
            field: {},
        } as unknown as ReactHookForm.UseControllerReturn);
        useWatchSpy.mockReturnValue({});
    });

    afterEach(() => {
        useFormContextSpy.mockReset();
        useControllerSpy.mockReset();
        useWatchSpy.mockReset();
    });

    const createTestComponent = (props?: Partial<IProposalActionsDecoderFieldProps>) => {
        const completeProps: IProposalActionsDecoderFieldProps = {
            parameter: { name: 'test', type: 'bool', value: null },
            fieldName: 'test-name',
            ...props,
        };

        return <ProposalActionsDecoderField {...completeProps} />;
    };

    it('returns a simple text field when parameter type is not a nested type', () => {
        const parameter = { name: 'boolParam', type: 'bool', value: undefined };
        render(createTestComponent({ parameter }));
        expect(screen.getByRole('textbox', { name: parameter.name })).toBeInTheDocument();
    });

    it('renders a hidden text-field for nested types', () => {
        const parameter = { name: 'uintTest', type: 'uint[]', value: undefined };
        render(createTestComponent({ parameter }));
        const arrayField = screen.getByRole('textbox');
        // eslint-disable-next-line testing-library/no-node-access
        expect(arrayField.parentElement!.parentElement!.classList).toContain('hidden');
    });

    it('renders all nested parameters for a parameter with tuple type', () => {
        const components = [
            { name: 'addressType', type: 'address' },
            { name: 'boolType', type: 'bool' },
            { name: 'uintType', type: 'uint' },
        ];
        const parameter = { name: 'tupleType', type: 'tuple', value: ['0x00', true, '2231'], components };
        render(createTestComponent({ parameter }));
        components.forEach((component, index) => {
            const textField = screen.getByRole('textbox', { name: component.name });
            expect(textField).toBeInTheDocument();
            expect(textField).toHaveDisplayValue(parameter.value[index].toString());
        });
    });

    it('renders all nested parameters for a parameter with array type and hides the labels for array items', () => {
        const parameter = { name: 'arrayType', type: 'uint[]', value: ['12', '777', '465413', '0'] };
        render(createTestComponent({ parameter }));
        expect(screen.getAllByText(parameter.name)).toHaveLength(2); // 2 because of the hidden array input
        const [, ...textInputs] = screen.getAllByRole('textbox');
        expect(textInputs).toHaveLength(parameter.value.length);
        textInputs.forEach((input, index) => expect(input).toHaveDisplayValue(parameter.value[index]));
    });

    it('renders a button to add array items when parameter type is array and mode is edit', async () => {
        const parameter = { name: 'array', type: 'address[]', value: undefined };
        const mode = ProposalActionsDecoderMode.EDIT;
        render(createTestComponent({ parameter, mode }));
        expect(screen.getAllByRole('textbox')).toHaveLength(1);

        const addButton = screen.getByRole('button', { name: modulesCopy.proposalActionsDecoder.add });
        expect(addButton).toBeInTheDocument();
        await userEvent.click(addButton);

        expect(screen.getAllByRole('textbox')).toHaveLength(2);
    });

    it('renders a button to delete array items when parameter type is array and mode is edit', async () => {
        const parameter = { name: 'array', type: 'uint[]', value: ['0', '1', '2'] };
        const fieldName = 'array-name';
        const mode = ProposalActionsDecoderMode.EDIT;
        const getValues = () => parameter.value;
        const unregister = jest.fn();
        const setValue = jest.fn();
        useFormContextSpy.mockReturnValue(generateFormContext({ getValues, unregister, setValue }));

        render(createTestComponent({ fieldName, parameter, mode }));
        expect(screen.getAllByRole('textbox')).toHaveLength(parameter.value.length + 1);

        const removeButtons = screen
            .getAllByRole('button')
            .filter((button) => within(button).queryByTestId(IconType.CLOSE) != null);
        expect(removeButtons).toHaveLength(parameter.value.length);
        await userEvent.click(removeButtons[0]);

        expect(screen.getAllByRole('textbox')).toHaveLength(parameter.value.length);
        expect(unregister).toHaveBeenCalledWith(`${fieldName}.2`);
        expect(setValue).toHaveBeenCalledWith(fieldName, ['1', '2']);
    });

    it('renders a button to delete nested array types when mode is edit', async () => {
        const fieldName = 'tuple-test';
        const formPrefix = 'actions.0';
        const mode = ProposalActionsDecoderMode.EDIT;
        const parameterComponents = [
            { name: 'voteOption', type: 'uint' },
            { name: 'earlyExecution', type: 'bool' },
        ];
        const parameter = {
            name: 'tupleArray',
            type: 'tuple[]',
            value: [
                ['1', false],
                ['0', false],
                ['0', true],
            ],
            components: parameterComponents,
        };
        const getValues = () => parameter.value;
        const unregister = jest.fn();
        const setValue = jest.fn();
        useFormContextSpy.mockReturnValue(generateFormContext({ getValues, unregister, setValue }));

        render(createTestComponent({ fieldName, parameter, formPrefix, mode }));
        const removeButtons = screen
            .getAllByRole('button')
            .filter((button) => within(button).queryByTestId(IconType.CLOSE) != null);
        expect(removeButtons).toHaveLength(parameter.value.length);
        await userEvent.click(removeButtons[1]);

        expect(screen.getAllByRole('textbox', { name: parameterComponents[0].name })).toHaveLength(
            parameter.value.length - 1,
        );
        expect(unregister).toHaveBeenCalledWith(`${formPrefix}.${fieldName}.2`);
        expect(setValue).toHaveBeenCalledWith(`${formPrefix}.${fieldName}`, [
            ['1', false],
            ['0', true],
        ]);
    });
});
