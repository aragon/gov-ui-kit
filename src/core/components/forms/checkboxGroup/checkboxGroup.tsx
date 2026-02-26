import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useRandomId } from '../../../hooks';
import { InputContainer, type IInputContainerBaseProps } from '../inputContainer';

export interface ICheckboxGroupProps
    extends Pick<IInputContainerBaseProps, 'alert' | 'label' | 'helpText' | 'isOptional'> {
    /**
     * Additional classes for the component.
     */
    className?: string;
    /**
     * Children of the component.
     */
    children?: ReactNode;
}

export const CheckboxGroup: React.FC<ICheckboxGroupProps> = (props) => {
    const { className, children, ...otherProps } = props;

    const id = useRandomId();

    return (
        <InputContainer id={id} useCustomWrapper={true} {...otherProps}>
            <div className={classNames('flex min-w-0 flex-col gap-2 md:gap-3', className)}>{children}</div>
        </InputContainer>
    );
};
