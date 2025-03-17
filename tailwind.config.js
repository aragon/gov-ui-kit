/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{jsx,ts,tsx,mdx}', './docs/**/*.{jsx,tsx,mdx}', '.storybook/*.{jsx,tsx}'],
    theme: {
        colors: {
            primary: {
                50: 'var(--guk-color-primary-50)',
                100: 'var(--guk-color-primary-100)',
                200: 'var(--guk-color-primary-200)',
                300: 'var(--guk-color-primary-300)',
                400: 'var(--guk-color-primary-400)',
                500: 'var(--guk-color-primary-500)',
                600: 'var(--guk-color-primary-600)',
                700: 'var(--guk-color-primary-700)',
                800: 'var(--guk-color-primary-800)',
                900: 'var(--guk-color-primary-900)',
            },
            neutral: {
                0: 'var(--guk-color-neutral-0)',
                50: 'var(--guk-color-neutral-50)',
                100: 'var(--guk-color-neutral-100)',
                200: 'var(--guk-color-neutral-200)',
                300: 'var(--guk-color-neutral-300)',
                400: 'var(--guk-color-neutral-400)',
                500: 'var(--guk-color-neutral-500)',
                600: 'var(--guk-color-neutral-600)',
                700: 'var(--guk-color-neutral-700)',
                800: 'var(--guk-color-neutral-800)',
                900: 'var(--guk-color-neutral-900)',
            },
            info: {
                100: 'var(--guk-color-info-100)',
                200: 'var(--guk-color-info-200)',
                300: 'var(--guk-color-info-300)',
                400: 'var(--guk-color-info-400)',
                500: 'var(--guk-color-info-500)',
                600: 'var(--guk-color-info-600)',
                700: 'var(--guk-color-info-700)',
                800: 'var(--guk-color-info-800)',
                900: 'var(--guk-color-info-900)',
            },
            success: {
                100: 'var(--guk-color-success-100)',
                200: 'var(--guk-color-success-200)',
                300: 'var(--guk-color-success-300)',
                400: 'var(--guk-color-success-400)',
                500: 'var(--guk-color-success-500)',
                600: 'var(--guk-color-success-600)',
                700: 'var(--guk-color-success-700)',
                800: 'var(--guk-color-success-800)',
                900: 'var(--guk-color-success-900)',
            },
            warning: {
                100: 'var(--guk-color-warning-100)',
                200: 'var(--guk-color-warning-200)',
                300: 'var(--guk-color-warning-300)',
                400: 'var(--guk-color-warning-400)',
                500: 'var(--guk-color-warning-500)',
                600: 'var(--guk-color-warning-600)',
                700: 'var(--guk-color-warning-700)',
                800: 'var(--guk-color-warning-800)',
                900: 'var(--guk-color-warning-900)',
            },
            critical: {
                100: 'var(--guk-color-critical-100)',
                200: 'var(--guk-color-critical-200)',
                300: 'var(--guk-color-critical-300)',
                400: 'var(--guk-color-critical-400)',
                500: 'var(--guk-color-critical-500)',
                600: 'var(--guk-color-critical-600)',
                700: 'var(--guk-color-critical-700)',
                800: 'var(--guk-color-critical-800)',
                900: 'var(--guk-color-critical-900)',
            },
            transparent: 'var(--guk-color-transparent)',
        },
        spacing: {
            0: 'var(--guk-space-0)', // 0px
            0.25: 'var(--guk-space-0-25)', // 1px
            0.5: 'var(--guk-space-0-5)', // 2px
            1: 'var(--guk-space-base)', // 4px
            1.5: 'var(--guk-space-1-5)', // 6px
            2: 'var(--guk-space-2)', // 8px
            2.5: 'var(--guk-space-2-5)', // 10px
            3: 'var(--guk-space-3)', // 12px
            3.5: 'var(--guk-space-3-5)', // 14px
            4: 'var(--guk-space-4)', // 16px
            5: 'var(--guk-space-5)', // 20px
            6: 'var(--guk-space-6)', // 24px
            7: 'var(--guk-space-7)', // 28px
            8: 'var(--guk-space-8)', // 32px
            9: 'var(--guk-space-9)', // 36px
            10: 'var(--guk-space-10)', // 40px
            11: 'var(--guk-space-11)', // 44px
            12: 'var(--guk-space-12)', // 48px
            14: 'var(--guk-space-14)', // 56px
            16: 'var(--guk-space-16)', // 64px
            20: 'var(--guk-space-20)', // 80px
            24: 'var(--guk-space-24)', // 96px
            28: 'var(--guk-space-28)', // 112px
            32: 'var(--guk-space-32)', // 128px
            36: 'var(--guk-space-36)', // 144px
            40: 'var(--guk-space-40)', // 160px
            44: 'var(--guk-space-44)', // 176px
            48: 'var(--guk-space-48)', // 192px
            52: 'var(--guk-space-52)', // 208px
            56: 'var(--guk-space-56)', // 224px
            60: 'var(--guk-space-60)', // 240px
            64: 'var(--guk-space-64)', // 256px
            72: 'var(--guk-space-72)', // 288px
            80: 'var(--guk-space-80)', // 320px
            96: 'var(--guk-space-96)', // 384px
        },
        ringWidth: {
            DEFAULT: '3px',
        },
        ringColor: {
            primary: 'var(--guk-color-primary-200)',
            success: 'var(--guk-color-success-200)',
            warning: 'var(--guk-color-warning-200)',
            critical: 'var(--guk-color-critical-200)',
        },
        ringOffsetWidth: {
            DEFAULT: '2px',
        },
        borderRadius: {
            DEFAULT: 'var(--guk-border-rounded)',
            lg: 'var(--guk-border-rounded-lg)',
            xl: 'var(--guk-border-rounded-xl)',
            '2xl': 'var(--guk-border-rounded-2xl)',
            '3xl': 'var(--guk-border-rounded-3xl)',
            full: 'var(--guk-border-rounded-full)',
            none: 'var(--guk-border-rounded-none)',
        },
        boxShadow: {
            'neutral-sm': 'var(--guk-shadow-neutral-sm)',
            neutral: 'var(--guk-shadow-neutral)',
            'neutral-md': 'var(--guk-shadow-neutral-md)',
            'neutral-ld': 'var(--guk-shadow-neutral-lg)',
            'neutral-xl': 'var(--guk-shadow-neutral-xl)',
            'neutral-2xl': 'var(--guk-shadow-neutral-2xl)',

            'primary-sm': 'var(--guk-shadow-primary-sm)',
            primary: 'var(--guk-shadow-primary)',
            'primary-md': 'var(--guk-shadow-primary-md)',
            'primary-lg': 'var(--guk-shadow-primary-lg)',
            'primary-xl': 'var(--guk-shadow-primary-xl)',
            'primary-2xl': 'var(--guk-shadow-primary-2xl)',

            'success-sm': 'var(--guk-shadow-success-sm)',
            success: 'var(--guk-shadow-success)',
            'success-md': 'var(--guk-shadow-success-md)',
            'success-lg': 'var(--guk-shadow-success-lg)',
            'success-xl': 'var(--guk-shadow-success-xl)',
            'success-2xl': 'var(--guk-shadow-success-2xl)',

            'warning-sm': 'var(--guk-shadow-warning-sm)',
            warning: 'var(--guk-shadow-warning)',
            'warning-md': 'var(--guk-shadow-warning-md)',
            'warning-lg': 'var(--guk-shadow-warning-lg)',
            'warning-xl': 'var(--guk-shadow-warning-xl)',
            'warning-2xl': 'var(--guk-shadow-warning-2xl)',

            'critical-sm': 'var(--guk-shadow-critical-sm)',
            critical: 'var(--guk-shadow-critical)',
            'critical-md': 'var(--guk-shadow-critical-md)',
            'critical-lg': 'var(--guk-shadow-critical-lg)',
            'critical-xl': 'var(--guk-shadow-critical-xl)',
            'critical-2xl': 'var(--guk-shadow-critical-2xl)',

            'info-sm': 'var(--guk-shadow-info-sm)',
            info: 'var(--guk-shadow-info)',
            'info-md': 'var(--guk-shadow-info-md)',
            'info-lg': 'var(--guk-shadow-info-lg)',
            'info-xl': 'var(--guk-shadow-info-xl)',
            'info-2xl': 'var(--guk-shadow-info-2xl)',

            none: 'var(--guk-shadow-none)',
        },
        screens: {
            sm: '640px',
            md: '786px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        fontFamily: {
            sans: [`var(--guk-font-family)`],
        },
        fontSize: {
            xs: 'var(--guk-font-size-xs)',
            sm: 'var(--guk-font-size-sm)',
            base: 'var(--guk-font-size-base)',
            lg: 'var(--guk-font-size-lg)',
            xl: 'var(--guk-font-size-xl)',
            '2xl': 'var(--guk-font-size-2xl)',
            '3xl': 'var(--guk-font-size-3xl)',
            '4xl': 'var(--guk-font-size-4xl)',
            '5xl': 'var(--guk-font-size-5xl)',
        },
        fontWeight: {
            normal: 'var(--guk-font-weight-normal)',
            semibold: 'var(--guk-font-weight-semibold)',
        },
        lineHeight: {
            normal: 'var(--guk-line-height-normal)',
            tight: 'var(--guk-line-height-tight)',
            relaxed: 'var(--guk-line-height-relaxed)',
        },
        extend: {
            animation: {
                shake: 'shake 0.82s cubic-bezier(0.36,0.07,0.19,0.97) both',
            },
            keyframes: {
                shake: {
                    '10%, 90%': {
                        transform: 'translate3d(-1px, 0, 0)',
                    },
                    '20%, 80%': {
                        transform: 'translate3d(2px, 0, 0)',
                    },
                    '30%, 50%, 70%': {
                        transform: 'translate3d(-4px, 0, 0)',
                    },
                    '40%, 60%': {
                        transform: 'translate3d(4px, 0, 0)',
                    },
                },
            },
            backgroundImage: {
                'modal-overlay': 'linear-gradient(180deg, rgba(245, 247, 250, 0) 0%, #F5F7FA 100%)',
                'modal-header': 'linear-gradient(180deg, #F5F7FA 0%, rgba(245, 247, 250, 0) 100%)',
                'modal-footer': 'linear-gradient(180deg, rgba(245, 247, 250, 0) 0%, #F5F7FA 100%)',
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-body': theme('colors.neutral.500'),
                        '--tw-prose-headings': theme('colors.neutral.800'),
                        '--tw-prose-lead': theme('colors.neutral.600'),
                        '--tw-prose-links': theme('colors.primary.400'),

                        color: theme('colors.neutral.500'),
                        maxWidth: 'none',

                        h1: {
                            marginTop: theme('spacing.2'),
                            marginBottom: theme('spacing.10'),
                            fontSize: theme('fontSize.2xl'),
                            '@screen md': {
                                fontSize: theme('fontSize.3xl'),
                            },
                        },
                        h2: {
                            marginTop: theme('spacing.2'),
                            marginBottom: theme('spacing.8'),
                            fontSize: theme('fontSize.xl'),
                            '@screen md': {
                                fontSize: theme('fontSize.2xl'),
                            },
                        },
                        h3: {
                            marginTop: theme('spacing.2'),
                            marginBottom: theme('spacing.6'),
                            fontSize: theme('fontSize.lg'),
                            '@screen md': {
                                fontSize: theme('fontSize.xl'),
                            },
                        },
                        h4: {
                            marginBottom: theme('spacing.4'),
                            fontSize: theme('fontSize.base'),
                            '@screen md': {
                                fontSize: theme('fontSize.lg'),
                            },
                        },
                        h5: {
                            marginBottom: theme('spacing.2'),
                            fontSize: theme('fontSize.sm'),
                            '@screen md': {
                                fontSize: theme('fontSize.base'),
                            },
                        },
                        h6: {
                            marginBottom: theme('spacing.1'),
                            fontSize: theme('fontSize.xs'),
                            '@screen md': {
                                fontSize: theme('fontSize.sm'),
                            },
                        },
                        p: {
                            fontSize: theme('fontSize.base'),
                            '@screen md': {
                                fontSize: theme('fontSize.lg'),
                            },
                        },
                        a: {
                            color: theme('colors.primary.400'),
                            textDecoration: 'none',
                            '&:hover': {
                                color: theme('colors.primary.600'),
                            },
                            '&:active': {
                                color: theme('colors.primary.800'),
                            },
                        },
                        strong: {
                            fontSize: theme('fontSize.base'),
                            '@screen md': {
                                fontSize: theme('fontSize.lg'),
                            },
                            color: theme('colors.neutral.500'),
                        },
                        em: {
                            fontSize: theme('fontSize.base'),
                            '@screen md': {
                                fontSize: theme('fontSize.lg'),
                            },
                            color: theme('colors.neutral.500'),
                        },
                        blockquote: {
                            borderRadius: theme('borderRadius.lg'),
                            border: `1px solid ${theme('colors.neutral.200')}`,
                            backgroundColor: theme('colors.neutral.50'),
                            padding: theme('spacing.10'),
                            boxShadow: theme('boxShadow.md'),
                        },
                        pre: {
                            borderRadius: theme('borderRadius.lg'),
                            backgroundColor: theme('colors.neutral.900'),
                            color: theme('colors.neutral.50'),
                        },
                        code: {
                            backgroundColor: theme('colors.neutral.900'),
                            color: theme('colors.neutral.50'),
                            padding: theme('spacing.1'),
                            'border-radius': '0.25rem',
                        },
                        'code::before': {
                            content: '""',
                            'padding-left': '0.25rem',
                        },
                        'code::after': {
                            content: '""',
                            'padding-right': '0.25rem',
                        },
                        img: {
                            overflow: 'hidden',
                            borderRadius: theme('borderRadius.xl'),
                            boxShadow: theme('boxShadow.md'),
                        },
                        video: {
                            overflow: 'hidden',
                            borderRadius: theme('borderRadius.xl'),
                            boxShadow: theme('boxShadow.md'),
                        },
                        hr: {
                            marginTop: theme('spacing.10'),
                            borderColor: theme('colors.neutral.200'),
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwindcss/plugin')(({ addVariant }) => {
            addVariant('search-cancel', '&::-webkit-search-cancel-button');
            addVariant('calendar-icon', ['&::-webkit-calendar-picker-indicator', '&::-webkit-inner-spin-button']);
            addVariant('spin-buttons', ['&::-webkit-inner-spin-button', '&::-webkit-outer-spin-button']);
        }),
    ],
};
