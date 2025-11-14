import {
    AccordionHeader as RadixAccordionHeader,
    AccordionTrigger as RadixAccordionTrigger,
} from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, useEffect, useRef, useState, type ComponentPropsWithRef } from 'react';
import { AvatarIcon } from '../../avatars';
import { IconType } from '../../icon';

export interface IAccordionItemHeaderProps extends ComponentPropsWithRef<'button'> {
    /**
     * Index number to display instead of the chevron icon. Typically used in edit mode to show the action's position.
     */
    indexIndicator?: number;
    /**
     * Trigger value to highlight this item with a pulse animation. Increment this value to retrigger the animation.
     * Used when an item is moved/reordered. The animation will automatically clear after 2 seconds.
     * @example
     * const [highlightTrigger, setHighlightTrigger] = useState(0);
     * // Trigger animation: setHighlightTrigger(prev => prev + 1);
     */
    highlight?: number;
    /**
     * Controls how the header aligns inside the viewport when highlight scrolling runs.
     * Defaults to `'start'`. Pass `'end'` when following items that moved downwards.
     */
    highlightScrollBlock?: ScrollLogicalPosition;
}

export const AccordionItemHeader = forwardRef<HTMLButtonElement, IAccordionItemHeaderProps>((props, ref) => {
    const { children, className, disabled, indexIndicator, highlight, highlightScrollBlock, ...otherProps } = props;

    const headerRef = useRef<HTMLDivElement>(null);
    const previousHighlightRef = useRef<number | undefined>(highlight);
    const [isHighlighted, setIsHighlighted] = useState(false);

    // Handle highlight trigger changes and auto-clear after animation
    useEffect(() => {
        if (highlight == null || previousHighlightRef.current === highlight) {
            previousHighlightRef.current = highlight;
            return undefined;
        }

        previousHighlightRef.current = highlight;
        setIsHighlighted(true);

        // Small delay to ensure DOM has updated
        const scrollTimeout = window.setTimeout(() => {
            headerRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: highlightScrollBlock ?? 'start',
                inline: 'nearest',
            });
        }, 50);

        // Auto-clear highlight after animation completes
        const clearHighlightTimeout = window.setTimeout(() => {
            setIsHighlighted(false);
        }, 2000);

        return () => {
            window.clearTimeout(scrollTimeout);
            window.clearTimeout(clearHighlightTimeout);
        };
    }, [highlight, highlightScrollBlock]);

    return (
        <RadixAccordionHeader
            ref={headerRef}
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
                            'flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300',
                            {
                                'border border-neutral-600 text-neutral-600': !isHighlighted,
                            },
                        )}
                        style={
                            isHighlighted
                                ? {
                                      color: '#1588B9',
                                      borderColor: '#A4F9FB',
                                      borderWidth: '1px',
                                      animation: 'glow-pulse 1.8s ease-in-out 1',
                                  }
                                : undefined
                        }
                    >
                        <style>{`
                            @keyframes glow-pulse {
                                0%, 100% {
                                    box-shadow: 0 0 0 0 rgba(164, 249, 251, 0);
                                    transform: scale(1);
                                }
                                50% {
                                    box-shadow: 0 0 0 6px rgba(164, 249, 251, 0.6);
                                    transform: scale(1.1);
                                }
                            }
                        `}</style>
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
