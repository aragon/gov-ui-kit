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
    const { children, className, disabled, ...otherProps } = props;

    return (
        <RadixAccordionHeader
            className={classNames(
                'group relative flex overflow-hidden',
                'data-[state=open]:to-neutral-0 data-[state=open]:bg-linear-to-b data-[state=open]:from-neutral-50',
                'data-[disabled=true]:bg-neutral-100', // disabled
            )}
        >
            <div
                className={classNames(
                    'bg-neutral-0 absolute inset-0 transition-opacity duration-300',
                    'group-data-[state=closed]:opacity-100 group-data-[state=open]:opacity-0',
                )}
                aria-hidden="true"
            />

            <RadixAccordionTrigger
                className={classNames(
                    'relative flex flex-1 items-baseline justify-between gap-x-4 px-4 py-3 outline-hidden group-data-disabled:bg-neutral-100 md:gap-x-6 md:px-6 md:py-5',
                    'focus-visible:ring-primary focus-visible:ring-offset focus:outline-hidden focus-visible:ring',
                    className,
                )}
                ref={ref}
                {...otherProps}
            >
                {children}
                <AvatarIcon
                    icon={IconType.CHEVRON_DOWN}
                    className="transition-transform group-data-disabled:bg-neutral-100 group-data-disabled:text-neutral-100 group-data-[state=open]:rotate-180"
                />
            </RadixAccordionTrigger>
        </RadixAccordionHeader>
    );
});

AccordionItemHeader.displayName = 'Accordion.ItemHeader';
