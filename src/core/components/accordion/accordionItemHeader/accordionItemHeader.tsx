import {
    AccordionHeader as RadixAccordionHeader,
    AccordionTrigger as RadixAccordionTrigger,
} from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithRef } from 'react';
import { AvatarIcon } from '../../avatars';
import { IconType } from '../../icon';

export interface IAccordionItemHeaderProps extends ComponentPropsWithRef<'button'> {}

export const AccordionItemHeader = forwardRef<HTMLButtonElement, IAccordionItemHeaderProps>((props, ref) => {
    const { children, className, ...otherProps } = props;

    return (
        <RadixAccordionHeader className="flex data-[state=open]:bg-gradient-to-b data-[state=open]:from-neutral-50 data-[state=open]:to-neutral-0">
            <RadixAccordionTrigger
                className={classNames(
                    'group flex flex-1 items-center justify-between gap-x-4 px-4 py-3 outline-none md:gap-x-6 md:px-6 md:py-5',
                    className,
                )}
                ref={ref}
                {...otherProps}
            >
                {children}
                <AvatarIcon
                    icon={IconType.CHEVRON_DOWN}
                    className="transition-transform group-data-[state=open]:rotate-180 *:group-data-[disabled]:text-neutral-100"
                />
            </RadixAccordionTrigger>
        </RadixAccordionHeader>
    );
});

AccordionItemHeader.displayName = 'Accordion.ItemHeader';
