import classNames from 'classnames';
import type React from 'react';

import type { HTMLAttributes } from 'react';
import type { ResponsiveAttribute, ResponsiveAttributeClassMap } from '../../../types';
import { responsiveUtils } from '../../../utils';
import { Icon, type IconType } from '../../icon';

export type AvatarIconSize = 'sm' | 'md' | 'lg';
export type AvatarIconVariant = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'critical';

export interface IAvatarIconProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The icon type.
     */
    icon: IconType;
    /**
     * Responsive size attribute for the avatar.
     */
    responsiveSize?: ResponsiveAttribute<AvatarIconSize>;
    /**
     * The size of the avatar icon.
     * @default sm
     */
    size?: AvatarIconSize;
    /**
     * The variant of the avatar.
     * @default neutral
     */
    variant?: AvatarIconVariant;
    /**
     * Renders the icon on a white background. This property overrides the variant default background.
     */
    backgroundWhite?: boolean;
}

const avatarVariantToIconClassNames: Record<AvatarIconVariant, string> = {
    neutral: 'text-neutral-400',
    primary: 'text-primary-400',
    critical: 'text-critical-600',
    info: 'text-info-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
};

const avatarVariantToContainerClassNames: Record<AvatarIconVariant | 'white', string> = {
    neutral: 'bg-neutral-50',
    primary: 'bg-primary-50',
    critical: 'bg-critical-100',
    info: 'bg-info-100',
    success: 'bg-success-100',
    warning: 'bg-warning-100',
    white: 'bg-neutral-0',
};

const responsiveSizeClasses: ResponsiveAttributeClassMap<AvatarIconSize> = {
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
};

export const AvatarIcon: React.FC<IAvatarIconProps> = (props) => {
    const { className, icon, variant = 'neutral', size = 'sm', responsiveSize, backgroundWhite, ...rest } = props;

    const containerClasses = classNames(
        'flex shrink-0 items-center justify-center rounded-full',
        avatarVariantToContainerClassNames[backgroundWhite ? 'white' : variant],
        responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClasses),
        className,
    );

    const iconClasses = classNames(avatarVariantToIconClassNames[variant]);

    return (
        <div className={containerClasses} {...rest}>
            <Icon className={iconClasses} icon={icon} responsiveSize={responsiveSize} size={size} />
        </div>
    );
};
