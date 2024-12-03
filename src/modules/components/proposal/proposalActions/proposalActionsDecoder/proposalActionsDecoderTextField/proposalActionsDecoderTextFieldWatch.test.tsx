import { render, screen } from '@testing-library/react';
import * as ReactHookForm from 'react-hook-form';
import {
    type IProposalActionsDecoderTextFieldWatchProps,
    ProposalActionsDecoderTextFieldWatch,
} from './proposalActionsDecoderTextFieldWatch';

jest.mock('react-hook-form', () => ({
    ...jest.requireActual<typeof ReactHookForm>('react-hook-form'),
    __esModule: true,
}));

describe('<ProposalActionsDecoderTextFieldWatch /> component', () => {
    const useWatchSpy = jest.spyOn(ReactHookForm, 'useWatch') as unknown as jest.SpyInstance<string>;

    afterEach(() => {
        useWatchSpy.mockReset();
    });

    const createTestComponent = (props?: Partial<IProposalActionsDecoderTextFieldWatchProps>) => {
        const completeProps: IProposalActionsDecoderTextFieldWatchProps = {
            parameter: { name: 'test', type: 'address', value: undefined },
            fieldName: 'field-name',
            ...props,
        };

        return <ProposalActionsDecoderTextFieldWatch {...completeProps} />;
    };

    it('retrieves the input value from the context form and displays it on a disabled input component', () => {
        const inputValue = '0x00001';
        const fieldName = 'test-field';
        useWatchSpy.mockReturnValue(inputValue);
        render(createTestComponent({ fieldName }));
        expect(useWatchSpy).toHaveBeenCalledWith({ name: fieldName });
        const inputField = screen.getByRole('textbox');
        expect(inputField).toBeInTheDocument();
        expect(inputField.tagName).toEqual('INPUT');
        expect(inputField).toHaveDisplayValue(inputValue);
        expect(inputField).toBeDisabled();
    });

    it('renders a textarea when component is set to textarea', () => {
        const component = 'textarea';
        render(createTestComponent({ component }));
        const textArea = screen.getByRole('textbox');
        expect(textArea).toBeInTheDocument();
        expect(textArea.tagName).toEqual('TEXTAREA');
        expect(textArea).toBeDisabled();
    });
});
