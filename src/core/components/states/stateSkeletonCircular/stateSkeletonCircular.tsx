import classNames from 'classnames';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import type { ResponsiveAttribute, ResponsiveAttributeClassMap } from '../../../types';
import { responsiveUtils } from '../../../utils';

export type StateSkeletonCircularSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IStateSkeletonCircularProps extends ComponentPropsWithoutRef<'span'> {
    /**
     *  Responsive size attribute for the skeleton.
     */
    responsiveSize?: ResponsiveAttribute<StateSkeletonCircularSize>;
    /**
     * The size of the skeleton.
     * @default 'md'
     */
    size?: StateSkeletonCircularSize;
}

const responsiveSizeClasses: ResponsiveAttributeClassMap<StateSkeletonCircularSize> = {
    sm: {
        default: 'size-6',
        sm: 'sm:size-6',
        md: 'md:size-6',
        lg: 'lg:size-6',
        xl: 'xl:size-6',
        '2xl': '2xl:size-6',
    },
    md: {
        default: 'size-8',
        sm: 'sm:size-8',
        md: 'md:size-8',
        lg: 'lg:size-8',
        xl: 'xl:size-8',
        '2xl': '2xl:size-8',
    },
    lg: {
        default: 'size-10',
        sm: 'sm:size-10',
        md: 'md:size-10',
        lg: 'lg:size-10',
        xl: 'xl:size-10',
        '2xl': '2xl:size-10',
    },
    xl: {
        default: 'size-14',
        sm: 'sm:size-14',
        md: 'md:size-14',
        lg: 'lg:size-14',
        xl: 'xl:size-14',
        '2xl': '2xl:size-14',
    },
    '2xl': {
        default: 'size-16',
        sm: 'sm:size-16',
        md: 'md:size-16',
        lg: 'lg:size-16',
        xl: 'xl:size-16',
        '2xl': '2xl:size-16',
    },
};

export const StateSkeletonCircular = forwardRef<HTMLDivElement, IStateSkeletonCircularProps>((props, ref) => {
    const { className, responsiveSize, size = 'md', ...otherProps } = props;

    const classes = classNames(
        'shrink-0 animate-pulse rounded-full bg-neutral-50',
        responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClasses),
        className,
    );

    return (
        <span
            aria-hidden={true}
            className={classes}
            data-testid="stateSkeletonCircular"
            ref={ref}
            tabIndex={-1}
            {...otherProps}
        />
    );
});

StateSkeletonCircular.displayName = 'StateSkeletonCircular';
