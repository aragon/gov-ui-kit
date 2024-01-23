import classNames from 'classnames';
import { Button } from '../../button';
import { useInputProps, useNumberMask, type IUseNumberMaskProps } from '../hooks';
import { InputContainer, type IInputComponentProps } from '../inputContainer';

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

    const { ref, setValue } = useNumberMask({ min, max, value, onChange });

    const handleMaxClick = () => setValue(max.toString());

    return (
        <InputContainer variant={variant} {...otherContainerProps}>
            <input
                className={classNames('spin-buttons:appearance-none', inputClassName)}
                ref={ref}
                max={max}
                min={min}
                inputMode="decimal"
                disabled={disabled}
                {...otherInputProps}
            />
            {!disabled && (
                <Button size="sm" variant="tertiary" className="mr-2" onClick={handleMaxClick}>
                    {/* TODO: apply internationalisation to Max label [APP-2627] */}
                    Max
                </Button>
            )}
        </InputContainer>
    );
};
