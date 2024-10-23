import type { FactoryOpts, InputMask } from 'imask';
import { useEffect, type ComponentProps } from 'react';
import { useIMask } from 'react-imask';
import { NumberFormat, formatterUtils } from '../../../utils';

export interface IUseNumberMaskProps extends Pick<ComponentProps<'input'>, 'min' | 'max' | 'value'> {
    /**
     * Prefix for the number mask.
     */
    prefix?: string;
    /**
     * Suffix for the number mask.
     */
    suffix?: string;
    /**
     * Callback called on value change. Override the default onChange callback to only emit the updated value because
     * the library in use formats the user input and emit the valid number when valid.
     */
    onChange?: (value: string) => void;
}

export interface IUseNumberMaskResult extends ReturnType<typeof useIMask<HTMLInputElement>> {}

const getNumberSeparators = () => {
    const match = formatterUtils
        .formatNumber(100_000.1, { format: NumberFormat.TOKEN_AMOUNT_LONG })
        ?.match(/([^0-9])/g);

    const thousandsSeparator = match?.shift();
    const radix = match?.pop();

    return { thousandsSeparator, radix };
};

// The imask.js library requires us to set a "scale" property as max decimal places otherwise it defaults to 0.
const defaultScale = 30;

export const useNumberMask = (props: IUseNumberMaskProps): IUseNumberMaskResult => {
    const { suffix, prefix, min, max, onChange, value } = props;

    const { thousandsSeparator, radix } = getNumberSeparators();

    const numberMask = `${prefix ?? ''} num ${suffix ?? ''}`.trim();
    const maskMax = max != null ? Number(max) : undefined;
    const maskMin = min != null ? Number(min) : undefined;

    const handleMaskAccept = (_value: string, mask: InputMask<FactoryOpts>) => {
        // Update the lazy option to display the suffix when the user is deleting the last digits of the input
        const hideMask = mask.unmaskedValue === '';
        mask.updateOptions({ lazy: hideMask });
        onChange?.(mask.unmaskedValue);
    };

    const result = useIMask<HTMLInputElement>(
        {
            mask: numberMask,
            eager: true, // Displays eventual suffix on user input
            blocks: {
                num: { mask: Number, radix, thousandsSeparator, scale: defaultScale, max: maskMax, min: maskMin },
            },
        },
        { onAccept: handleMaskAccept },
    );

    const { setUnmaskedValue } = result;

    // Update the masked value on value property change
    useEffect(() => {
        const parsedValue = value?.toString() ?? '';
        setUnmaskedValue(parsedValue);
    }, [setUnmaskedValue, value]);

    return result;
};
