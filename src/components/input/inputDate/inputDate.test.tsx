import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';
import * as Utils from '../../../utils';
import { IconType } from '../../icon';
import { InputDate, type IInputDateProps } from './inputDate';

describe('<InputDate /> component', () => {
    const useRefMock = jest.spyOn(React, 'useRef');
    const mergeRefMock = jest.spyOn(Utils, 'mergeRefs');

    afterEach(() => {
        useRefMock.mockReset();
        mergeRefMock.mockReset();
    });

    const createTestComponent = (props?: Partial<IInputDateProps>) => {
        const completeProps = { ...props };

        return <InputDate {...completeProps} />;
    };

    it('renders a date input', () => {
        const label = 'Date label';
        render(createTestComponent({ label }));
        const dateInput = screen.getByLabelText<HTMLInputElement>(label);
        expect(dateInput).toBeInTheDocument();
        expect(dateInput.type).toEqual('date');
    });

    it('renders the input as disabled when the isDisabled property is set to true', () => {
        const isDisabled = true;
        const label = 'test';
        render(createTestComponent({ label, isDisabled }));
        expect(screen.getByLabelText(label)).toBeDisabled();
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('renders a button which opens the date picker on click', () => {
        const showPicker = jest.fn();
        useRefMock.mockReturnValue({ current: { showPicker } });
        mergeRefMock.mockReturnValue(() => null);
        render(createTestComponent());

        const calendarButton = screen.getByRole('button');
        expect(calendarButton).toBeInTheDocument();
        expect(within(calendarButton).getByTestId(IconType.CALENDAR)).toBeInTheDocument();

        fireEvent.click(calendarButton);
        expect(showPicker).toHaveBeenCalled();
    });
});
