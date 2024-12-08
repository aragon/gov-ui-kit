import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { WatchObserver } from 'react-hook-form';
import * as Viem from 'viem';
import { clipboardUtils } from '../../../../../core';
import { modulesCopy } from '../../../../assets';
import * as ModuleHooks from '../../../../hooks';
import { generateFormContext } from '../../../../testUtils';
import { generateProposalAction } from '../proposalActionsTestUtils';
import { ProposalActionsDecoder } from './proposalActionsDecoder';
import {
    type IProposalActionsDecoderProps,
    ProposalActionsDecoderMode,
    ProposalActionsDecoderView,
} from './proposalActionsDecoder.api';
import { type NestedProposalActionFormValues, proposalActionsDecoderUtils } from './proposalActionsDecoderUtils';

jest.mock('./proposalActionsDecoderTextField', () => ({
    ProposalActionsDecoderTextField: (props: { fieldName: string; className?: string }) => (
        <input data-testid={`${props.fieldName}-text-field-mock`} className={props.className} />
    ),
}));

jest.mock('./proposalActionsDecoderField', () => ({
    ProposalActionsDecoderField: () => <div data-testid="field-mock" />,
}));

describe('<ProposalActionsDecoder /> component', () => {
    const copySpy = jest.spyOn(clipboardUtils, 'copy');
    const useFormContextSpy = jest.spyOn(ModuleHooks, 'useFormContext');
    const formValuesToFunctionParametersSpy = jest.spyOn(proposalActionsDecoderUtils, 'formValuesToFunctionParameters');
    const encodeFunctionDataSpy = jest.spyOn(Viem, 'encodeFunctionData');

    beforeEach(() => {
        useFormContextSpy.mockReturnValue(generateFormContext());
    });

    afterEach(() => {
        copySpy.mockReset();
        useFormContextSpy.mockReset();
        formValuesToFunctionParametersSpy.mockReset();
        encodeFunctionDataSpy.mockReset();
    });

    const createTestComponent = (props?: Partial<IProposalActionsDecoderProps>) => {
        const completeProps: IProposalActionsDecoderProps = {
            action: generateProposalAction(),
            ...props,
        };

        return <ProposalActionsDecoder {...completeProps} />;
    };

    it('renders the value field when the decoder view is RAW', () => {
        const view = ProposalActionsDecoderView.RAW;
        render(createTestComponent({ view }));
        expect(screen.getByTestId('value-text-field-mock')).toBeInTheDocument();
    });

    it('renders the value field when action is payable', () => {
        const view = ProposalActionsDecoderView.DECODED;
        const action = generateProposalAction({
            inputData: { function: '', contract: '', stateMutability: 'payable', parameters: [] },
        });
        render(createTestComponent({ action, view }));
        expect(screen.getByTestId('value-text-field-mock')).toBeInTheDocument();
    });

    it('renders the data field as hidden when view is DECODED', () => {
        const view = ProposalActionsDecoderView.DECODED;
        render(createTestComponent({ view }));
        const dataInput = screen.getByTestId('data-text-field-mock');
        expect(dataInput).toBeInTheDocument();
        expect(dataInput.className).toContain('hidden');
    });

    it('renders a visible data field when view is RAW', () => {
        const view = ProposalActionsDecoderView.RAW;
        render(createTestComponent({ view }));
        const dataInput = screen.getByTestId('data-text-field-mock');
        expect(dataInput).toBeInTheDocument();
        expect(dataInput.className).not.toContain('hidden');
    });

    it('renders a copy button to copy data field context on RAW view and WATCH mode', async () => {
        const view = ProposalActionsDecoderView.RAW;
        const mode = ProposalActionsDecoderMode.WATCH;
        const action = generateProposalAction({ data: '0x111' });
        render(createTestComponent({ action, view, mode }));
        const copyButton = screen.getByRole('button', { name: modulesCopy.proposalActionsDecoder.copyData });
        expect(copyButton).toBeInTheDocument();
        await userEvent.click(copyButton);
        expect(copySpy).toHaveBeenCalledWith(action.data);
    });

    it('renders the copy data button on RAW view and READ mode', () => {
        const view = ProposalActionsDecoderView.RAW;
        const mode = ProposalActionsDecoderMode.READ;
        render(createTestComponent({ view, mode }));
        expect(screen.getByRole('button', { name: modulesCopy.proposalActionsDecoder.copyData })).toBeInTheDocument();
    });

    it('does not render the copy data button on RAW view and EDIT mode', () => {
        const view = ProposalActionsDecoderView.RAW;
        const mode = ProposalActionsDecoderMode.EDIT;
        render(createTestComponent({ view, mode }));
        expect(
            screen.queryByRole('button', { name: modulesCopy.proposalActionsDecoder.copyData }),
        ).not.toBeInTheDocument();
    });

    it('renders the action function parameters on DECODED view', () => {
        const view = ProposalActionsDecoderView.DECODED;
        const actionParams = [
            { name: 'boolTest', type: 'bool', value: undefined },
            { name: 'uintTest', type: 'uint', value: undefined },
        ];
        const action = generateProposalAction({ inputData: { function: '', contract: '', parameters: actionParams } });
        render(createTestComponent({ action, view }));
        expect(screen.getAllByTestId('field-mock')).toHaveLength(actionParams.length);
    });

    it('updates the data field when a parameter value changes on EDIT view and DECODED mode', () => {
        const view = ProposalActionsDecoderView.DECODED;
        const mode = ProposalActionsDecoderMode.EDIT;
        const parameters = [
            { name: 'boolType', type: 'bool', value: undefined },
            { name: 'uintType', type: 'uint8', value: undefined },
            { name: 'addressArray', type: 'address[]', value: undefined },
        ];
        const action = generateProposalAction({ inputData: { function: 'testFunc', contract: '', parameters } });
        const functionParameters = [true, '11', ['0x01', '0x02']];
        formValuesToFunctionParametersSpy.mockReturnValue(functionParameters);
        const watch = (callback: WatchObserver<NestedProposalActionFormValues>) => {
            callback({}, { name: 'parameters.0.value' });
            return { unsubscribe: jest.fn() };
        };
        useFormContextSpy.mockReturnValue(
            generateFormContext({ watch: watch as ModuleHooks.UseFormContextReturn['watch'] }),
        );
        render(createTestComponent({ action, view, mode }));
        const expectedAbi = { type: 'function', name: action.inputData?.function, inputs: parameters };
        expect(encodeFunctionDataSpy).toHaveBeenCalledWith({ abi: [expectedAbi], args: functionParameters });
    });

    it('does not update data field when the updated field is the data field', () => {
        const view = ProposalActionsDecoderView.DECODED;
        const mode = ProposalActionsDecoderMode.EDIT;
        const formPrefix = 'actions.0';
        const watch = (callback: WatchObserver<NestedProposalActionFormValues>) => {
            callback({}, { name: `${formPrefix}.data` });
            return { unsubscribe: jest.fn() };
        };
        useFormContextSpy.mockReturnValue(
            generateFormContext({ watch: watch as ModuleHooks.UseFormContextReturn['watch'] }),
        );
        render(createTestComponent({ view, mode, formPrefix }));
        expect(encodeFunctionDataSpy).not.toHaveBeenCalled();
    });

    it('does not update data field when the updated field form prefix does not match current prefix', () => {
        const view = ProposalActionsDecoderView.DECODED;
        const mode = ProposalActionsDecoderMode.EDIT;
        const formPrefix = 'actions.0';
        const watch = (callback: WatchObserver<NestedProposalActionFormValues>) => {
            callback({}, { name: 'actions.1.data' });
            return { unsubscribe: jest.fn() };
        };
        useFormContextSpy.mockReturnValue(
            generateFormContext({ watch: watch as ModuleHooks.UseFormContextReturn['watch'] }),
        );
        render(createTestComponent({ view, mode, formPrefix }));
        expect(encodeFunctionDataSpy).not.toHaveBeenCalled();
    });

    it('does not throw error when encoding data and data is not valid', () => {
        const view = ProposalActionsDecoderView.DECODED;
        const mode = ProposalActionsDecoderMode.EDIT;
        const parameters = [{ name: 'boolType', type: 'bool', value: undefined }];
        const action = generateProposalAction({ inputData: { function: 'testFunc', contract: '', parameters } });
        const functionParameters = ['fal'];
        formValuesToFunctionParametersSpy.mockReturnValue(functionParameters);
        const watch = (callback: WatchObserver<NestedProposalActionFormValues>) => {
            callback({}, { name: 'actions.1.data' });
            return { unsubscribe: jest.fn() };
        };
        useFormContextSpy.mockReturnValue(
            generateFormContext({ watch: watch as ModuleHooks.UseFormContextReturn['watch'] }),
        );
        expect(() => render(createTestComponent({ action, view, mode }))).not.toThrow();
    });
});
