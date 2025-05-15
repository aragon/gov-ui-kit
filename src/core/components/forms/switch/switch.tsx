import * as RadixSwitch from '@radix-ui/react-switch';
import classNames from 'classnames';
import { useRandomId } from '../../../hooks';
import { InputContainer, type IInputContainerBaseProps } from '../inputContainer';

export interface ISwitchProps extends Pick<IInputContainerBaseProps, 'alert' | 'label' | 'helpText' | 'isOptional'> {
    /**
     * Indicates whether the switch is checked
     */
    checked?: boolean;
    /**
     * CSS class name
     */
    className?: string;
    /**
     * The default checked state of the switch
     * @default false
     */
    defaultChecked?: boolean;
    /**
     * Indicates whether the switch is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * The ID of the switch
     */
    id?: string;
    /**
     * The inline label of the switch
     */
    inlineLabel?: string;
    /**
     * The name of the switch
     */
    name?: string;
    /**
     * Event handler for when the checked state changes
     * @param checked - The new checked state
     */
    onCheckedChanged?: (checked: boolean) => void;
}

export const Switch: React.FC<ISwitchProps> = (props) => {
    const {
        checked,
        className,
        defaultChecked = false,
        disabled = false,
        id,
        inlineLabel,
        name,
        onCheckedChanged,
        ...otherProps
    } = props;

    const randomId = useRandomId(id);

    const switchClassNames = classNames(
        'group peer w-10 cursor-default rounded-[40px] border border-neutral-200 bg-neutral-0 p-1 shadow-neutral-sm focus-ring-primary', // Default
        'data-[state=checked]:border-primary-400 data-[state=checked]:shadow-primary', // Checked
        'disabled:bg-neutral-100 disabled:data-[state=checked]:border-neutral-200 disabled:data-[state=checked]:shadow-none', // Disabled
    );

    const thumbClassNames = classNames(
        'block size-4 rounded-full bg-neutral-300 transition-transform duration-100 will-change-transform', // Default
        'data-[state=checked]:translate-x-[14px] data-[state=checked]:bg-primary-400', // Checked
        'group-disabled:bg-neutral-200 data-[state=checked]:group-disabled:bg-neutral-300', // Disabled
    );

    const labelClassNames = classNames(
        'pl-2 text-sm font-normal leading-tight text-neutral-500 md:pl-3 md:text-base', // Default
        'peer-data-[state=checked]:text-neutral-800', // Checked
        'peer-disabled:text-neutral-300 peer-data-[state=checked]:peer-disabled:text-neutral-800', // Disabled
    );

    return (
        <InputContainer id={randomId} useCustomWrapper={true} {...otherProps}>
            <div className={classNames('inline-flex items-center', className)}>
                <RadixSwitch.Root
                    onCheckedChange={onCheckedChanged}
                    id={randomId}
                    className={switchClassNames}
                    name={name}
                    checked={checked}
                    disabled={disabled}
                    defaultChecked={defaultChecked}
                >
                    <RadixSwitch.Thumb className={thumbClassNames} />
                </RadixSwitch.Root>
                {inlineLabel && (
                    <label htmlFor={randomId} className={labelClassNames}>
                        {inlineLabel}
                    </label>
                )}
            </div>
        </InputContainer>
    );
};
