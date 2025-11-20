import {
    AccordionHeader as RadixAccordionHeader,
    AccordionTrigger as RadixAccordionTrigger,
} from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithRef } from 'react';
import type { IProposalAction } from '../../../../modules';
import type { IProposalActionsArrayControl } from '../../../../modules/components/proposal/proposalActions/proposalActionsItem/proposalActionsItem.api';
import { AvatarIcon } from '../../avatars';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { Tooltip } from '../../tooltip';

export interface IAccordionItemHeaderProps extends ComponentPropsWithRef<'button'> {
    /**
     * Remove control to be displayed in edit mode.
     */
    removeControl?: IProposalActionsArrayControl;
    /**
     * The index of the accordion item.
     */
    index?: number;
}

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
                className={classNames(
                    'bg-neutral-0 absolute inset-0 transition-opacity duration-300',
                    'group-data-[state=closed]:opacity-100 group-data-[state=open]:opacity-0',
                )}
                aria-hidden="true"
            />
            <RadixAccordionTrigger
                asChild={removeControl != null && index != null}
                className={classNames(
                    'relative flex flex-1 items-baseline justify-between gap-x-4 px-4 py-3 outline-hidden md:gap-x-6 md:px-6 md:py-5',
                    'focus-ring-primary group-data-disabled:cursor-default group-data-disabled:bg-neutral-100',
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
                                variant="tertiary"
                                size="sm"
                                iconLeft={IconType.CLOSE}
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.stopPropagation();
                                    removeControl.onClick({} as IProposalAction, index);
                                }}
                                disabled={removeControl.disabled}
                            />
                        </Tooltip>
                    </div>
                ) : (
                    <>
                        {children}
                        <AvatarIcon
                            icon={IconType.CHEVRON_DOWN}
                            className="transition-transform group-data-disabled:bg-neutral-100 group-data-disabled:text-neutral-100 group-data-[state=open]:rotate-180"
                        />
                    </>
                )}
            </RadixAccordionTrigger>
        </RadixAccordionHeader>
    );
});

AccordionItemHeader.displayName = 'Accordion.ItemHeader';
