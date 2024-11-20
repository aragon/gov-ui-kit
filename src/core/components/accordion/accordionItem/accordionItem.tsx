import { AccordionItem as RadixAccordionItem } from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, useEffect, useRef, useState, type ComponentPropsWithRef } from 'react';

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

    const interactionMethod = useRef<'keyboard' | 'mouse' | null>(null);

    const [hasFocus, setHasFocus] = useState(false);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (['Tab', 'Shift', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            interactionMethod.current = 'keyboard';
        }
    };

    const handleMouseDown = () => {
        interactionMethod.current = 'mouse';
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleMouseDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    const handleFocus = () => {
        if (interactionMethod.current === 'keyboard') {
            setHasFocus(true);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setHasFocus(false);
        }
    };

    const accordionItemClasses = classNames(
        'w-full overflow-hidden rounded-xl border border-neutral-100 bg-neutral-0', // base
        'data-[disabled]:border-neutral-200', // disabled
        'data-[state=open]:border-neutral-200 data-[state=open]:shadow-neutral-sm', // open
        'hover:border-neutral-200 hover:shadow-neutral-sm', // hover
        'active:border-neutral-400', // active
        {
            'ring ring-primary ring-offset outline-none': hasFocus,
        },
        className,
    );

    return (
        <RadixAccordionItem
            disabled={disabled}
            value={value}
            className={accordionItemClasses}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...otherProps}
        >
            {children}
        </RadixAccordionItem>
    );
});

AccordionItem.displayName = 'Accordion.Item';
