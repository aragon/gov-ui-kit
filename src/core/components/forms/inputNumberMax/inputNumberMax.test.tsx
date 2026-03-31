import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import * as InputHooks from '../hooks';
import { type IInputNumberMaxProps, InputNumberMax } from './inputNumberMax';

describe('<InputNumberMax /> component', () => {
    const useNumberMaskMock = jest.spyOn(InputHooks, 'useNumberMask');

    beforeEach(() => {
        const numberMaskResult = {
            ref: createRef(),
            setUnmaskedValue: jest.fn(),
        } as unknown as InputHooks.IUseNumberMaskResult;
        useNumberMaskMock.mockReturnValue(numberMaskResult);
    });

    afterEach(() => {
        useNumberMaskMock.mockReset();
    });

    const createTestComponent = (props?: Partial<IInputNumberMaxProps>) => {
        const completeProps: IInputNumberMaxProps = {
            max: 100,
            ...props,
        };

        return <InputNumberMax {...completeProps} />;
    };

    it('renders an input with a max button', () => {
        render(createTestComponent());
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('updates the mask value with the max property on max button click', async () => {
        const user = userEvent.setup();
        const max = 1_000_000;
        const setUnmaskedValue = jest.fn();
        const hookResult = { setUnmaskedValue } as unknown as InputHooks.IUseNumberMaskResult;
        useNumberMaskMock.mockReturnValue(hookResult);
        render(createTestComponent({ max }));
        await user.click(screen.getByRole('button'));
        expect(setUnmaskedValue).toHaveBeenCalledWith(max.toString());
    });

    it('does not render the max button when input is disabled', () => {
        const disabled = true;
        render(createTestComponent({ disabled }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});
