import { Accordion as RadixAccordionRoot } from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithRef } from 'react';

export type AccordionMultiValue<TMulti extends boolean> = TMulti extends true
    ? string[] | undefined
    : string | undefined;

export interface IAccordionContainerBaseProps<TMulti extends boolean> extends Omit<
    ComponentPropsWithRef<'div'>,
    'dir'
> {
    /**
     * Determines whether one or multiple items can be opened at the same time.
     */
    isMulti: TMulti;
    /**
     * The value of the item to expand when initially rendered and type is "single". Use when you do not need to control the state of the items.
     */
    defaultValue?: AccordionMultiValue<TMulti>;
    /**
     * Array of key values that determines which items are currently expanded.
     */
    value?: AccordionMultiValue<TMulti>;
    /**
     * When the current value (open section) changes, this function will be called.
     */
    onValueChange?: (value: AccordionMultiValue<TMulti>) => void;
}

export type IAccordionContainerProps = IAccordionContainerBaseProps<true> | IAccordionContainerBaseProps<false>;

export const AccordionContainer = forwardRef<HTMLDivElement, IAccordionContainerProps>((props, ref) => {
    const { children, className, isMulti, defaultValue, value, onValueChange, ...otherProps } = props;

    const accordionContainerClasses = classNames('flex w-full grow flex-col gap-y-2 md:gap-y-3', className);

    if (isMulti) {
        return (
            <RadixAccordionRoot
                className={accordionContainerClasses}
                defaultValue={defaultValue}
                value={value}
                onValueChange={onValueChange}
                type="multiple"
                ref={ref}
                {...otherProps}
            >
                {children}
            </RadixAccordionRoot>
        );
    }
    return (
        <RadixAccordionRoot
            className={accordionContainerClasses}
            defaultValue={defaultValue}
            value={value}
            onValueChange={onValueChange}
            type="single"
            collapsible={true}
            ref={ref}
            {...otherProps}
        >
            {children}
        </RadixAccordionRoot>
    );
});

AccordionContainer.displayName = 'Accordion.Container';
