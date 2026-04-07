import classNames from 'classnames';
import { Button } from '../../button';
import { useGukCoreContext } from '../../gukCoreProvider';
import { type IUseNumberMaskProps, useInputProps, useNumberMask } from '../hooks';
import { type IInputComponentProps, InputContainer } from '../inputContainer';

export interface IInputNumberMaxProps extends Omit<IInputComponentProps, 'maxLength' | 'onChange'> {
    /**
     * Maximum number set on max button click.
     */
    max: number;
    /**
     * @see IUseNumberMaskProps['onChange']
     */
    onChange?: IUseNumberMaskProps['onChange'];
}

export const InputNumberMax: React.FC<IInputNumberMaxProps> = (props) => {
    const { max, onChange, ...otherProps } = props;
    const { containerProps, inputProps } = useInputProps(otherProps);

    const { variant, ...otherContainerProps } = containerProps;
    const { className: inputClassName, value, min, disabled, ...otherInputProps } = inputProps;

    const { ref, setUnmaskedValue } = useNumberMask({ min, max, value, onChange });

    const { copy } = useGukCoreContext();

    const handleMaxClick = () => setUnmaskedValue(max.toString());

    return (
        <InputContainer variant={variant} {...otherContainerProps}>
            <input
                className={classNames('spin-buttons-hidden', inputClassName)}
                disabled={disabled}
                inputMode="decimal"
                max={max}
                min={min}
                ref={ref}
                {...otherInputProps}
            />
            {!disabled && (
                <Button className="mr-2" onClick={handleMaxClick} size="sm" variant="tertiary">
                    {copy.inputNumberMax.max}
                </Button>
            )}
        </InputContainer>
    );
};
