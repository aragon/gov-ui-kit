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
     * Optional description text.
     */
    description?: string;
    /**
     * Classnames to be applied directly to the link text.
     */
    textClassName?: string;
}
