import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { type ResponsiveAttribute, type ResponsiveAttributeClassMap } from '../../../types';
import { responsiveUtils } from '../../../utils';

export type StateSkeletonBarSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IStateSkeletonBarProps extends ComponentPropsWithoutRef<'span'> {
    /**
     *  Responsive size attribute for the skeleton.
     */
    responsiveSize?: ResponsiveAttribute<StateSkeletonBarSize>;
    /**
     * The size of the skeleton.
     * @default 'md'
     */
    size?: StateSkeletonBarSize;
    /**
     * Specifies the width of the skeleton element.
     * Can be provided as a number (interpreted as pixels)
     * or a string with explicit units (e.g., px, %, em).
     * @default 160
     *
     * @example
     * width={200}    // Sets width to 200 pixels.
     * width="100px"  // Sets width to 100 pixels.
     * width="10%"    // Sets width to 10% of its parent container.
     */
    width?: string | number;
}

const responsiveSizeClasses: ResponsiveAttributeClassMap<StateSkeletonBarSize> = {
    sm: { sm: 'h-3', md: 'md:h-3', lg: 'lg:h-3', xl: 'xl:h-3', '2xl': '2xl:h-3' },
    md: { sm: 'h-4', md: 'md:h-4', lg: 'lg:h-4', xl: 'xl:h-4', '2xl': '2xl:h-4' },
    lg: { sm: 'h-5', md: 'md:h-5', lg: 'lg:h-5', xl: 'xl:h-5', '2xl': '2xl:h-5' },
    xl: { sm: 'h-6', md: 'md:h-6', lg: 'lg:h-6', xl: 'xl:h-6', '2xl': '2xl:h-6' },
    '2xl': { sm: 'h-8', md: 'md:h-8', lg: 'lg:h-8', xl: 'xl:h-8', '2xl': '2xl:h-8' },
};

export const StateSkeletonBar = forwardRef<HTMLDivElement, IStateSkeletonBarProps>((props, ref) => {
    const { className, responsiveSize = {}, size = 'md', width, ...otherProps } = props;

    const classes = classNames(
        'w-40 animate-pulse rounded-full bg-neutral-50',
        responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClasses),
        className,
    );

    return (
        <span
            data-testid="stateSkeletonBar"
            ref={ref}
            className={classes}
            tabIndex={-1}
            aria-hidden={true}
            style={{ width }}
            {...otherProps}
        />
    );
});

StateSkeletonBar.displayName = 'StateSkeletonBar';
