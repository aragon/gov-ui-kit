import { AccordionItem as RadixAccordionItem } from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithRef } from 'react';

export interface IAccordionItemProps extends ComponentPropsWithRef<'div'> {
    /**
     * A unique value of the accordion item which can matched for default open selection from the root container.
     */
    value: string;
}

export const AccordionItem = forwardRef<HTMLDivElement, IAccordionItemProps>(
    ({ children, className, value, ...otherProps }, forwardedRef) => (
        <RadixAccordionItem
            value={value}
            className={classNames(
                'border-t border-neutral-100 first:border-t-0 hover:border-neutral-200 active:border-neutral-400',
                className,
            )}
            ref={forwardedRef}
            {...otherProps}
        >
            {children}
        </RadixAccordionItem>
    ),
);

AccordionItem.displayName = 'Accordion.Item';
