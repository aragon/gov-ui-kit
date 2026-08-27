import classNames from 'classnames';
import { type PointerEvent as ReactPointerEvent, useCallback, useEffect, useRef, useState } from 'react';
import { addressUtils } from '../../utils';
import { Clipboard } from '../clipboard';
import { Link } from '../link';
import { Tooltip } from '../tooltip';

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
     * Renders an inline copy control that copies the full checksummed address. Defaults to `false` when
     * `hasInteractiveAncestor` is set, since a copy button cannot nest inside another interactive element.
     * @default true
     */
    copy?: boolean;
    /**
     * Reveals the full checksummed address on hover, keyboard focus and tap. Keyboard focus and tap fall away when
     * `hasInteractiveAncestor` is set, leaving the hover reveal.
     * @default true
     */
    reveal?: boolean;
    /**
     * Set by containers that are themselves interactive, such as a link, a button or a clickable row. The reveal then
     * hangs off a non-focusable trigger and the copy control defaults away, so the component never nests an
     * interactive control inside another one, adds a tab stop, or competes for the container's click.
     * @default false
     */
    hasInteractiveAncestor?: boolean;
    /**
     * Additional class names for the label.
     */
    className?: string;
}

export const AddressOutput: React.FC<IAddressOutputProps> = (props) => {
    const {
        address,
        label,
        showCompleteAddress = false,
        href,
        isExternal = true,
        hasInteractiveAncestor = false,
        copy = !hasInteractiveAncestor,
        reveal = true,
        className,
    } = props;

    const isLink = href != null && href.length > 0;

    // A link label and an interactive container both rule out a focusable trigger of our own.
    const usePassiveTrigger = isLink || hasInteractiveAncestor;

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

        // A tap belongs to the link label or to the surrounding container, never to the reveal.
        if (usePassiveTrigger) {
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
    const truncatedValue = addressUtils.truncateHash(addressUtils.truncateAddress(address));
    const displayLabel = label ?? (showCompleteAddress ? checksumAddress : truncatedValue);

    const text = <span className={classNames('inline-block min-w-0 max-w-full', className)}>{displayLabel}</span>;

    const labelElement =
        href == null ? (
            text
        ) : (
            <Link className="min-w-0" href={href} isExternal={isExternal}>
                {text}
            </Link>
        );

    let output = labelElement;

    if (reveal) {
        output = (
            <Tooltip content={checksumAddress} onOpenChange={handleOpenChange} open={isOpen} triggerAsChild={true}>
                {usePassiveTrigger ? (
                    <span
                        className={classNames('min-w-0', { 'cursor-pointer': isLink, 'cursor-help': !isLink })}
                        onPointerDown={handlePointerDown}
                        ref={setTriggerRef}
                    >
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
    if (copy) {
        return (
            <Clipboard copyValue={checksumAddress} size="sm" variant={isLink ? 'avatar' : 'avatar-neutral'}>
                {output}
            </Clipboard>
        );
    }

    return output;
};
