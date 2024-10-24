import classNames from 'classnames';
import type React from 'react';
import { Avatar, type AvatarSize, type IAvatarProps } from '../../../../core';

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

const sizeToTextClass: Record<AvatarSize, string> = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

export const DaoAvatar: React.FC<IDaoAvatarProps> = (props) => {
    const { name, size = 'lg', className, ...otherProps } = props;
    const daoInitials = getDaoInitials(name).toUpperCase();

    return (
        <Avatar
            size={size}
            fallback={
                <span
                    className={classNames(
                        'flex size-full items-center justify-center rounded-full bg-primary-400 leading-tight text-neutral-0',
                        sizeToTextClass[size],
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
