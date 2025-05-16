import { Arrow, Content, Portal, Provider, Root, Trigger } from '@radix-ui/react-tooltip';
import classNames from 'classnames';
import type React from 'react';
import { type ReactNode } from 'react';

export type TooltipVariant = 'neutral' | 'info' | 'warning' | 'critical' | 'success';

export interface ITooltipProps {
    /**
     * Content of the tooltip
     */
    content: ReactNode;
    /**
     * Defines the variant of the tooltip
     * @default neutral
     */
    variant?: TooltipVariant;
    /**
     * The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state.
     */
    defaultOpen?: boolean;
    /**
     * The controlled open state of the tooltip. Must be used in conjunction with `onOpenChange`.
     */
    open?: boolean;
    /**
     * Event handler called when the open state of the tooltip changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * The duration from when the mouse enters the trigger until the tooltip opens.
     * @default 300
     */
    delayDuration?: number;
    /**
     * When `true`, hovering the content will keep the tooltip open.
     */
    disableHoverableContent?: boolean;
    /**
     * Additional class names for the tooltip content.
     */
    className?: string;
    /**
     * Children elements to trigger the tooltip.
     */
    children?: ReactNode;
    /**
     * When `true`, the tooltip will use children button as a trigger, to avoid a button inside a button.
     */
    triggerAsChild?: boolean;
}

const variantToArrowFill: Record<TooltipVariant, string> = {
    critical: 'fill-critical-300',
    info: 'fill-info-300',
    neutral: 'fill-neutral-800',
    success: 'fill-success-300',
    warning: 'fill-warning-300',
};

const variantToContentClassName: Record<TooltipVariant, string> = {
    critical: 'bg-critical-300 text-critical-900 shadow-critical-md',
    info: 'bg-info-300 text-info-900 shadow-info-md',
    neutral: 'bg-neutral-800 text-neutral-50 shadow-neutral-md',
    success: 'bg-success-300 text-success-900 shadow-success-md',
    warning: 'bg-warning-300 text-warning-900 shadow-warning-md',
};

export const Tooltip: React.FC<ITooltipProps> = (props) => {
    const {
        children,
        content,
        open,
        defaultOpen,
        delayDuration = 300,
        disableHoverableContent,
        variant = 'neutral',
        onOpenChange,
        className,
        triggerAsChild,
        ...otherProps
    } = props;

    return (
        <Provider>
            <Root
                open={open}
                defaultOpen={defaultOpen}
                onOpenChange={onOpenChange}
                delayDuration={delayDuration}
                disableHoverableContent={disableHoverableContent}
            >
                <Trigger asChild={triggerAsChild}>{children}</Trigger>
                <Portal>
                    <Content
                        className={classNames(
                            variantToContentClassName[variant],
                            'flex min-h-6 items-center rounded px-1.5 text-sm font-semibold leading-tight',
                            className,
                        )}
                        sideOffset={1}
                        {...otherProps}
                    >
                        {content}
                        <Arrow className={classNames(variantToArrowFill[variant], 'h-1 w-3')} />
                    </Content>
                </Portal>
            </Root>
        </Provider>
    );
};
