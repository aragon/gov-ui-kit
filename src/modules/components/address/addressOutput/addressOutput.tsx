import classNames from 'classnames';
import { type PointerEvent as ReactPointerEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Clipboard, Link, Tooltip, useInteractiveAncestor } from '../../../../core';
import { addressUtils } from '../../../utils';

export interface IAddressOutputProps {
    /**
     * Address to display, always the source of truth of the component. The copied and revealed value is this address
     * in its EIP-55 checksummed format, regardless of the label rendered.
     */
    address: string;
    /**
     * Display label for the address, e.g. an ENS name, a profile name or the literal `You`. Defaults to the
     * truncated address when not set.
     */
    label?: string;
    /**
     * Renders the full checksummed address instead of the truncated one. Ignored when `label` is set.
     * @default false
     */
    showCompleteAddress?: boolean;
    /**
     * URL the label links to, typically a block explorer. A truthy value also marks the address as link-like: a tap
     * navigates instead of opening the reveal and the copy control turns primary.
     */
    href?: string;
    /**
     * Whether the `href` link is external (opens in a new tab with an arrow icon). Set to false for in-app navigation.
     * @default true
     */
    isExternal?: boolean;
    /**
     * Renders an inline copy control that copies the full checksummed address. Defaults to `true`, or to `false`
     * inside an interactive container such as a link or a data list row, where a nested control would be invalid
     * markup and compete for the click. Set explicitly to override.
     */
    copy?: boolean;
    /**
     * Reveals the full checksummed address on hover, keyboard focus and tap. Defaults to `true`, or to `false` inside
     * an interactive container, for the same reason as `copy`. Set explicitly to override.
     */
    reveal?: boolean;
    /**
     * Additional class names for the label.
     */
    className?: string;
}

export const AddressOutput: React.FC<IAddressOutputProps> = (props) => {
    const { address, label, showCompleteAddress = false, href, isExternal = true, copy, reveal, className } = props;

    const hasInteractiveAncestor = useInteractiveAncestor();

    // The container knows whether a nested control is legal here; the props stay as an explicit override.
    const showCopy = copy ?? !hasInteractiveAncestor;
    const showReveal = reveal ?? !hasInteractiveAncestor;

    const isLink = href != null && href.length > 0;

    const [isOpen, setIsOpen] = useState(false);

    const isPinnedRef = useRef(false);

    const suppressOpenRef = useRef(false);
    const triggerRef = useRef<HTMLElement | null>(null);

    const setTriggerRef = useCallback((element: HTMLElement | null) => {
        triggerRef.current = element;
    }, []);

    const close = useCallback(() => {
        isPinnedRef.current = false;
        setIsOpen(false);
    }, []);

    const handleOpenChange = useCallback((open: boolean) => {
        if (open && suppressOpenRef.current) {
            suppressOpenRef.current = false;
            return;
        }

        if (!open && isPinnedRef.current) {
            return;
        }

        setIsOpen(open);
    }, []);

    // Radix ignores touch pointers on its tooltip trigger, so tap-to-open is driven through the controlled open state.
    const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
        if (event.pointerType !== 'touch') {
            return;
        }

        // A tap on a link label must navigate instead of toggling the reveal.
        if (isLink) {
            suppressOpenRef.current = true;
            return;
        }

        if (isPinnedRef.current) {
            close();
            return;
        }

        isPinnedRef.current = true;
        setIsOpen(true);
    };

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleOutsidePress = (event: PointerEvent) => {
            if (!triggerRef.current?.contains(event.target as Node)) {
                close();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
            }
        };

        document.addEventListener('pointerdown', handleOutsidePress);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handleOutsidePress);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, close]);

    const checksumAddress = addressUtils.isAddress(address) ? addressUtils.getChecksum(address) : address;
    const displayLabel = label ?? (showCompleteAddress ? checksumAddress : addressUtils.truncateAddress(address));

    const text = <span className={classNames('min-w-0', className)}>{displayLabel}</span>;

    const labelElement =
        href == null ? (
            text
        ) : (
            <Link className="min-w-0" href={href} isExternal={isExternal}>
                {text}
            </Link>
        );

    let output = labelElement;

    if (showReveal) {
        output = (
            <Tooltip content={checksumAddress} onOpenChange={handleOpenChange} open={isOpen} triggerAsChild={true}>
                {isLink ? (
                    <span className="min-w-0 cursor-pointer" onPointerDown={handlePointerDown} ref={setTriggerRef}>
                        {labelElement}
                    </span>
                ) : (
                    <button
                        className="min-w-0 cursor-help text-left"
                        onPointerDown={handlePointerDown}
                        ref={setTriggerRef}
                        type="button"
                    >
                        {labelElement}
                    </button>
                )}
            </Tooltip>
        );
    }

    // The copy control matches the label: primary circle on a link, neutral circle on plain text.
    if (showCopy) {
        return (
            <Clipboard copyValue={checksumAddress} size="sm" variant={isLink ? 'avatar' : 'avatar-neutral'}>
                {output}
            </Clipboard>
        );
    }

    return output;
};
