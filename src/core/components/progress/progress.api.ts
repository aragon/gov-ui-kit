import type { HTMLAttributes } from 'react';
import type { ResponsiveAttribute } from '../../types';

export type ProgressSize = 'sm' | 'md';

export type ProgressVariant = 'primary' | 'neutral' | 'success' | 'critical';

export interface IProgressProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Size of progress component.
     * @default md
     */
    size?: ProgressSize;
    /**
     * Size of the progress depending on the current breakpoint.
     */
    responsiveSize?: ResponsiveAttribute<ProgressSize>;
    /**
     * Current progress to be rendered.
     */
    value: number;
    /**
     * Variant of the progress component.
     * @default primary
     */
    variant?: ProgressVariant;
    /**
     * Threshold displayed with an indicator on the progress bar.
     */
    thresholdIndicator?: number;
}
