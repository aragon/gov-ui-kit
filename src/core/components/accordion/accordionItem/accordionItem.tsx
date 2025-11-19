import { AccordionItem as RadixAccordionItem } from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, useEffect, useRef, useState, type ComponentPropsWithRef } from 'react';

export interface IAccordionItemProps extends ComponentPropsWithRef<'div'> {
    /**
     * A unique value of the accordion item which can matched for default open selection from the root container.
     */
    value: string;

    /**
     * Determines whether the accordion item is highlighted.
     */
    highlight?: number;
    /**
     * Determines whether the accordion item is disabled.
     */
    disabled?: boolean;
}

export const AccordionItem = forwardRef<HTMLDivElement, IAccordionItemProps>((props, ref) => {
    const { children, className, disabled, value, highlight, ...otherProps } = props;
    const itemRef = useRef<HTMLDivElement>(null);
    const [isHighlighted, setIsHighlighted] = useState(false);

    // Handle highlight trigger changes and auto-clear after animation
    useEffect(() => {
        if (highlight != null && highlight > 0) {
            setIsHighlighted(true);
            itemRef.current?.scrollIntoView({ behavior: 'instant', block: 'center' });
            const clearHighlightTimeout = window.setTimeout(() => {
                setIsHighlighted(false);
            }, 1500);

            return () => {
                window.clearTimeout(clearHighlightTimeout);
            };
        }

        return undefined;
    }, [highlight]);

    const accordionItemClasses = classNames(
        'w-full overflow-hidden rounded-xl border border-neutral-100 bg-neutral-0', // base
        'data-disabled:border-neutral-200', // disabled
        'transition-all duration-1500', // transitions
        'data-[state=open]:border-neutral-200 data-[state=open]:shadow-neutral-sm', // open
        'hover:border-neutral-200 hover:shadow-neutral-sm', // hover
        'active:border-neutral-400 focus-ring-primary', // active / focus
        { 'shadow-neutral-xl': isHighlighted },
        className,
    );

    return (
        <RadixAccordionItem
            disabled={disabled}
            value={value}
            className={accordionItemClasses}
            ref={ref}
            {...otherProps}
        >
            {children}
        </RadixAccordionItem>
    );
});

AccordionItem.displayName = 'Accordion.Item';
