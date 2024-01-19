import { useEffect, type ComponentProps } from 'react';
import { useIMask } from 'react-imask';

export interface IUseNumberMaskProps extends Pick<ComponentProps<'input'>, 'min' | 'max' | 'value'> {
    /**
     * Callback called on value change. Override the default onChange callback to only emit the updated value because
     * the library in use formats the user input and emit the valid number when valid.
     */
    onChange?: (value: string) => void;
}

export interface IUseNumberMaskResult extends ReturnType<typeof useIMask<HTMLInputElement>> {}

export const useNumberMask = (props: IUseNumberMaskProps): IUseNumberMaskResult => {
    const { min, max, onChange, value } = props;

    const result = useIMask<HTMLInputElement>(
        {
            mask: Number,
            radix: '.',
            thousandsSeparator: ' ',
            scale: 100,
            max: max ? Number(max) : undefined,
            min: min ? Number(min) : undefined,
        },
        { onAccept: (_value, mask) => onChange?.(mask.unmaskedValue) },
    );

    const { setValue } = result;

    // Update the masked value on value property change
    useEffect(() => {
        const parsedValue = value?.toString() ?? '';
        setValue(parsedValue);
    }, [setValue, value]);

    return result;
};
