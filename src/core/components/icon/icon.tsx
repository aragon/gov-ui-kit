import classNames from 'classnames';
import type { SVGProps } from 'react';
import type { ResponsiveAttribute, ResponsiveAttributeClassMap } from '../../types';
import { responsiveUtils } from '../../utils';
import { iconList } from './iconList';
import type { IconType } from './iconType';

export type IconSize = 'sm' | 'md' | 'lg';

export interface IIconProps extends SVGProps<SVGSVGElement> {
    /**
     * Icon to be displayed.
     */
    icon: IconType;
    /**
     * Size of the icon.
     * @default md
     */
    size?: IconSize;
    /**
     * Size of the icon depending on the current breakpoint.
     */
    responsiveSize?: ResponsiveAttribute<IconSize>;
}

const responsiveSizeClassNames: ResponsiveAttributeClassMap<IconSize> = {
    sm: {
        default: 'size-3',
        sm: 'sm:size-3',
        md: 'md:size-3',
        lg: 'lg:size-3',
        xl: 'xl:size-3',
        '2xl': '2xl:size-3',
    },
    md: {
        default: 'size-4',
        sm: 'sm:size-4',
        md: 'md:size-4',
        lg: 'lg:size-4',
        xl: 'xl:size-4',
        '2xl': '2xl:size-4',
    },
    lg: {
        default: 'size-5',
        sm: 'sm:size-5',
        md: 'md:size-5',
        lg: 'lg:size-5',
        xl: 'xl:size-5',
        '2xl': '2xl:size-5',
    },
};

export const Icon: React.FC<IIconProps> = (props) => {
    const { icon, size = 'md', className, responsiveSize, ...otherProps } = props;

    const IconComponent = iconList[icon];

    const sizeClassNames = responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClassNames);

    return (
        <IconComponent
            className={classNames('shrink-0', sizeClassNames, className)}
            data-testid={icon}
            {...otherProps}
        />
    );
};
