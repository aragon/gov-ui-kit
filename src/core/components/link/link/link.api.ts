import type { AnchorHTMLAttributes } from 'react';
import { type IconType } from '../../icon';

export type LinkVariant = 'primary' | 'neutral';

export interface ILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Variant of the link.
     * @default 'primary'
     */
    variant?: LinkVariant;
    /**
     * Icon displayed on the right side of the link. Accepts any icon from src/components/icon/iconList.ts.
     */
    iconRight?: IconType;
    /**
     * Whether the link is disabled.
     */
    disabled?: boolean;
    /**
     * Optionally show URL as a description below the link text.
     */
    showUrl?: boolean;
    /**
     * Classnames to be applied directly to the link text.
     */
    textClassName?: string;
    /**
     * Whether the link is external. If true, the link will open in a new tab and will have external link icon.
     */
    isExternal?: boolean;
}
