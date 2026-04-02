import classNames from 'classnames';
import type { ResponsiveAttribute, ResponsiveAttributeClassMap, ResponsiveSizeKey } from '../../types';

class ResponsiveUtils {
    generateClassNames<TSize extends ResponsiveSizeKey>(
        size: TSize,
        // biome-ignore lint/style/useDefaultParameterLast: parameter order is part of the public API
        responsiveSize: ResponsiveAttribute<TSize> = {},
        classes: ResponsiveAttributeClassMap<TSize>,
    ): string {
        const { default: defaultClass } = classes[size];

        // Override with responsive size if specified.
        const smClass = responsiveSize.sm ? classes[responsiveSize.sm].sm : '';
        const mdClass = responsiveSize.md ? classes[responsiveSize.md].md : '';
        const lgClass = responsiveSize.lg ? classes[responsiveSize.lg].lg : '';
        const xlClass = responsiveSize.xl ? classes[responsiveSize.xl].xl : '';
        const twoXlClass = responsiveSize['2xl'] ? classes[responsiveSize['2xl']]['2xl'] : '';

        return classNames(defaultClass, smClass, mdClass, lgClass, xlClass, twoXlClass);
    }
}

export const responsiveUtils = new ResponsiveUtils();
