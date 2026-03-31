import {
    AccordionHeader as RadixAccordionHeader,
    AccordionTrigger as RadixAccordionTrigger,
} from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef } from 'react';
import { AvatarIcon } from '../../avatars';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { Tooltip } from '../../tooltip';
import type { IAccordionItemHeaderProps } from './accordionItemHeader.api';

export const AccordionItemHeader = forwardRef<HTMLButtonElement, IAccordionItemHeaderProps>((props, ref) => {
    const { children, className, disabled, removeControl, index, ...otherProps } = props;

    return (
        <RadixAccordionHeader
            className={classNames(
                'group data-[state=open]:gradient-neutral-50-transparent-to-b relative flex overflow-hidden',
                'data-[disabled=true]:bg-neutral-100', // disabled
            )}
        >
            <div
                aria-hidden="true"
                className={classNames(
                    'absolute inset-0 bg-neutral-0 transition-opacity duration-300',
                    'group-data-[state=closed]:opacity-100 group-data-[state=open]:opacity-0',
                )}
            />
            <RadixAccordionTrigger
                asChild={removeControl != null && index != null}
                className={classNames(
                    'relative flex flex-1 items-baseline justify-between gap-x-4 px-4 py-3 outline-hidden md:gap-x-6 md:px-6 md:py-5',
                    'focus-ring-primary group-data-disabled:cursor-default group-data-disabled:bg-neutral-100',
                    {
                        'cursor-default': removeControl != null,
                        'cursor-pointer': removeControl == null,
                    },
                    className,
                )}
                ref={ref}
                {...otherProps}
            >
                {removeControl != null && index != null ? (
                    <div className="flex flex-1 items-baseline justify-between gap-x-4">
                        {children}
                        <Tooltip content={removeControl.label} triggerAsChild={true}>
                            <Button
                                disabled={removeControl.disabled}
                                iconLeft={IconType.CLOSE}
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.stopPropagation();
                                    removeControl.onClick(index);
                                }}
                                size="sm"
                                variant="tertiary"
                            />
                        </Tooltip>
                    </div>
                ) : (
                    <>
                        {children}
                        <AvatarIcon
                            className="transition-transform group-data-[state=open]:rotate-180 group-data-disabled:bg-neutral-100 group-data-disabled:text-neutral-100"
                            icon={IconType.CHEVRON_DOWN}
                        />
                    </>
                )}
            </RadixAccordionTrigger>
        </RadixAccordionHeader>
    );
});

AccordionItemHeader.displayName = 'Accordion.ItemHeader';
