import classNames from 'classnames';
import type React from 'react';
import {
    Avatar,
    responsiveUtils,
    type AvatarSize,
    type IAvatarProps,
    type ResponsiveAttributeClassMap,
} from '../../../../core';

export interface IDaoAvatarProps extends Omit<IAvatarProps, 'fallback'> {
    /**
     * Name of the DAO
     */
    name?: string;
    /**
     * The size of the avatar.
     * @default lg
     */
    size?: AvatarSize;
}

const responsiveSizeClasses: ResponsiveAttributeClassMap<AvatarSize> = {
    sm: {
        default: 'text-sm',
        sm: 'sm:text-sm',
        md: 'md:text-sm',
        lg: 'lg:text-sm',
        xl: 'xl:text-sm',
        '2xl': '2xl:text-sm',
    },
    md: {
        default: 'text-md',
        sm: 'sm:text-md',
        md: 'md:text-md',
        lg: 'lg:text-md',
        xl: 'xl:text-md',
        '2xl': '2xl:text-md',
    },
    lg: {
        default: 'text-lg',
        sm: 'sm:text-lg',
        md: 'md:text-lg',
        lg: 'lg:text-lg',
        xl: 'xl:text-lg',
        '2xl': '2xl:text-lg',
    },
    xl: {
        default: 'text-xl',
        sm: 'sm:text-xl',
        md: 'md:text-xl',
        lg: 'lg:text-xl',
        xl: 'xl:text-xl',
        '2xl': '2xl:text-xl',
    },
    '2xl': {
        default: 'text-2xl',
        sm: 'sm:text-2xl',
        md: 'md:text-2xl',
        lg: 'lg:text-2xl',
        xl: 'xl:text-2xl',
        '2xl': '2xl:text-2xl',
    },
};

export const DaoAvatar: React.FC<IDaoAvatarProps> = (props) => {
    const { name, size = 'lg', responsiveSize, className, ...otherProps } = props;
    const daoInitials = getDaoInitials(name).toUpperCase();

    return (
        <Avatar
            size={size}
            responsiveSize={responsiveSize}
            fallback={
                <span
                    className={classNames(
                        'flex size-full items-center justify-center rounded-full bg-primary-400 leading-tight text-neutral-0',
                        responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClasses),
                        className,
                    )}
                >
                    {daoInitials}
                </span>
            }
            {...otherProps}
        />
    );
};

/**
 * Get the initials for a DAO
 * @param name name of the DAO
 * @returns the DAO initials
 */
function getDaoInitials(name: IDaoAvatarProps['name']): string {
    if (!name) {
        return '';
    }

    const trimmedName = name.trim();

    if (trimmedName.length <= 2) {
        return trimmedName;
    }

    const words = trimmedName.split(' ');
    if (words.length < 2) {
        return words[0][0] + words[0][1];
    } else {
        return words[0][0] + words[1][0];
    }
}
