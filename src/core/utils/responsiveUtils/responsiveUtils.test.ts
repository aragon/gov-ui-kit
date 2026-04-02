import type { ResponsiveAttributeClassMap } from '../../types';
import { responsiveUtils } from './responsiveUtils';

describe('responsive utils', () => {
    describe('generateClassNames', () => {
        const classes: ResponsiveAttributeClassMap<'sm' | 'md' | 'lg'> = {
            sm: {
                default: 'w-3 h-3',
                sm: 'sm:w-3 sm:h-3',
                md: 'md:w-3 md:h-3',
                lg: 'lg:w-3 lg:h-3',
                xl: 'xl:w-3 xl:h-3',
                '2xl': '2xl:w-3 2xl:h-3',
            },
            md: {
                default: 'w-4 h-4',
                sm: 'sm:w-4 sm:h-4',
                md: 'md:w-4 md:h-4',
                lg: 'lg:w-4 lg:h-4',
                xl: 'xl:w-4 xl:h-4',
                '2xl': '2xl:w-4 2xl:h-4',
            },
            lg: {
                default: 'w-5 h-5',
                sm: 'sm:w-5 sm:h-5',
                md: 'md:w-5 md:h-5',
                lg: 'lg:w-5 lg:h-5',
                xl: 'xl:w-5 xl:h-5',
                '2xl': '2xl:w-5 2xl:h-5',
            },
        };

        test.each([
            { size: 'sm', responsiveSize: {}, expected: 'w-3 h-3' },
            { size: 'sm', responsiveSize: { md: 'md' }, expected: 'w-3 h-3 md:w-4 md:h-4' },
            { size: 'sm', responsiveSize: { lg: 'lg' }, expected: 'w-3 h-3 lg:w-5 lg:h-5' },
            { size: 'sm', responsiveSize: { md: 'md', lg: 'lg' }, expected: 'w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5' },
            { size: 'sm', responsiveSize: { xl: 'lg' }, expected: 'w-3 h-3 xl:w-5 xl:h-5' },
            {
                size: 'sm',
                responsiveSize: { xl: 'md', '2xl': 'lg' },
                expected: 'w-3 h-3 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5',
            },
            { size: 'md', responsiveSize: {}, expected: 'w-4 h-4' },
            { size: 'md', responsiveSize: { sm: 'sm' }, expected: 'w-4 h-4 sm:w-3 sm:h-3' },
            { size: 'md', responsiveSize: { lg: 'lg' }, expected: 'w-4 h-4 lg:w-5 lg:h-5' },
            { size: 'md', responsiveSize: { sm: 'sm', lg: 'lg' }, expected: 'w-4 h-4 sm:w-3 sm:h-3 lg:w-5 lg:h-5' },
            { size: 'lg', responsiveSize: {}, expected: 'w-5 h-5' },
            { size: 'lg', responsiveSize: { sm: 'sm' }, expected: 'w-5 h-5 sm:w-3 sm:h-3' },
            { size: 'lg', responsiveSize: { md: 'md' }, expected: 'w-5 h-5 md:w-4 md:h-4' },
            { size: 'lg', responsiveSize: { sm: 'sm', md: 'md' }, expected: 'w-5 h-5 sm:w-3 sm:h-3 md:w-4 md:h-4' },
        ] as const)('correctly builds the reponsive classnames for $size and $responsiveSize', ({
            size,
            responsiveSize,
            expected,
        }) => {
            const result = responsiveUtils.generateClassNames(size, responsiveSize, classes);
            expect(result).toBe(expected);
        });
    });
});
