import {
    AccordionHeader as RadixAccordionHeader,
    AccordionTrigger as RadixAccordionTrigger,
} from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithRef } from 'react';
import { AvatarIcon } from '../../avatars';
import { IconType } from '../../icon';

export interface IAccordionItemHeaderProps extends ComponentPropsWithRef<'button'> {
    /**
     * Index number to display instead of the chevron icon. Typically used in edit mode to show the action's position.
     */
    indexIndicator?: number | string;
    /**
     * Whether to highlight this item with a pulse animation. Used when an item is moved/reordered.
     */
    highlight?: boolean;
}

export const AccordionItemHeader = forwardRef<HTMLButtonElement, IAccordionItemHeaderProps>((props, ref) => {
    const { children, className, disabled, indexIndicator, highlight = false, ...otherProps } = props;

    return (
        <RadixAccordionHeader
            className={classNames(
                'group data-[state=open]:gradient-neutral-50-transparent-to-b relative flex overflow-hidden',
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
                    'relative flex flex-1 items-baseline justify-between gap-x-4 px-4 py-3 outline-hidden md:gap-x-6 md:px-6 md:py-5',
                    'focus-ring-primary group-data-disabled:cursor-default group-data-disabled:bg-neutral-100',
                    {
                        'cursor-pointer': indexIndicator == null,
                        'cursor-default': indexIndicator != null,
                    },
                    className,
                )}
                ref={ref}
                {...otherProps}
            >
                {children}
                {indexIndicator != null ? (
                    <span
                        className={classNames(
                            'flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all',
                            {
                                'bg-info-500 text-neutral-0 shadow-info animate-pulse': highlight,
                                'border border-neutral-600 text-neutral-600': !highlight,
                            },
                        )}
                    >
                        {indexIndicator}
                    </span>
                ) : (
                    <AvatarIcon
                        icon={IconType.CHEVRON_DOWN}
                        className="transition-transform group-data-disabled:bg-neutral-100 group-data-disabled:text-neutral-100 group-data-[state=open]:rotate-180"
                    />
                )}
            </RadixAccordionTrigger>
        </RadixAccordionHeader>
    );
});

AccordionItemHeader.displayName = 'Accordion.ItemHeader';
