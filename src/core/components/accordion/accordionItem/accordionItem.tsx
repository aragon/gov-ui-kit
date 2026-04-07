import { AccordionItem as RadixAccordionItem } from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { type ComponentPropsWithRef, forwardRef } from 'react';

export interface IAccordionItemProps extends ComponentPropsWithRef<'div'> {
    /**
     * A unique value of the accordion item which can matched for default open selection from the root container.
     */
    value: string;
    /**
     * Determines whether the accordion item is disabled.
     */
    disabled?: boolean;
}

export const AccordionItem = forwardRef<HTMLDivElement, IAccordionItemProps>((props, ref) => {
    const { children, className, disabled, value, ...otherProps } = props;

    const accordionItemClasses = classNames(
        'w-full overflow-hidden rounded-xl border border-neutral-100 bg-neutral-0', // base
        'data-disabled:border-neutral-200', // disabled
        'data-[state=open]:border-neutral-200 data-[state=open]:shadow-neutral-sm', // open
        'hover:border-neutral-200 hover:shadow-neutral-sm', // hover
        'focus-ring-primary active:border-neutral-400', // active / focus
        className,
    );

    return (
        <RadixAccordionItem
            className={accordionItemClasses}
            disabled={disabled}
            ref={ref}
            value={value}
            {...otherProps}
        >
            {children}
        </RadixAccordionItem>
    );
});

AccordionItem.displayName = 'Accordion.Item';
