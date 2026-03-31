import { AccordionContent as RadixAccordionContent } from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { type ComponentPropsWithRef, forwardRef } from 'react';

export interface IAccordionItemContentProps extends ComponentPropsWithRef<'div'> {
    /**
     * Forces the content to be mounted when set to true.
     */
    forceMount?: true;
}

export const AccordionItemContent = forwardRef<HTMLDivElement, IAccordionItemContentProps>((props, ref) => {
    const { children, className, forceMount, ...otherProps } = props;

    const contentClassNames = classNames(
        'overflow-hidden px-4 pt-1 pb-4 md:px-6 md:pb-6', // Default
        { 'data-[state=closed]:hidden': forceMount }, // Force mount variant
        className,
    );

    return (
        <RadixAccordionContent className={contentClassNames} forceMount={forceMount} ref={ref} {...otherProps}>
            {children}
        </RadixAccordionContent>
    );
});

AccordionItemContent.displayName = 'Accordion.Content';
