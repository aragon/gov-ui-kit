/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{jsx,ts,tsx,mdx}', './docs/**/*.{jsx,tsx,mdx}', '.storybook/*.{jsx,tsx}'],
    theme: {
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
            typography: {
                DEFAULT: {
                    css: {
                        '--tw-prose-body': 'var(--guk-color-neutral-500)',
                        '--tw-prose-headings': 'var(--guk-color-neutral-800)',
                        '--tw-prose-lead': 'var(--guk-color-neutral-600)',
                        '--tw-prose-links': 'var(--guk-color-primary-400)',

                        color: 'var(--guk-color-neutral-500)',
                        maxWidth: 'none',

                        h1: {
                            marginTop: 'var(--guk-space-2)',
                            marginBottom: 'var(--guk-space-10)',
                            fontSize: 'var(--guk-font-size-2xl)',
                            '@media (min-width: 786px)': {
                                fontSize: 'var(--guk-font-size-3xl)',
                            },
                        },
                        h2: {
                            marginTop: 'var(--guk-space-2)',
                            marginBottom: 'var(--guk-space-8)',
                            fontSize: 'var(--guk-font-size-xl)',
                            '@media (min-width: 786px)': {
                                fontSize: 'var(--guk-font-size-2xl)',
                            },
                        },
                        h3: {
                            marginTop: 'var(--guk-space-2)',
                            marginBottom: 'var(--guk-space-6)',
                            fontSize: 'var(--guk-font-size-lg)',
                            '@media (min-width: 786px)': {
                                fontSize: 'var(--guk-font-size-xl)',
                            },
                        },
                        h4: {
                            marginBottom: 'var(--guk-space-4)',
                            fontSize: 'var(--guk-font-size-base)',
                            '@media (min-width: 786px)': {
                                fontSize: 'var(--guk-font-size-lg)',
                            },
                        },
                        h5: {
                            marginBottom: 'var(--guk-space-2)',
                            fontSize: 'var(--guk-font-size-sm)',
                            '@media (min-width: 786px)': {
                                fontSize: 'var(--guk-font-size-base)',
                            },
                        },
                        h6: {
                            marginBottom: 'var(--guk-space-base)',
                            fontSize: 'var(--guk-font-size-xs)',
                            '@media (min-width: 786px)': {
                                fontSize: 'var(--guk-font-size-sm)',
                            },
                        },
                        p: {
                            marginTop: '0',
                            marginBottom: '0',
                            fontSize: 'var(--guk-font-size-base)',
                            '@media (min-width: 786px)': {
                                fontSize: 'var(--guk-font-size-lg)',
                            },
                        },
                        a: {
                            color: 'var(--guk-color-primary-400)',
                            textDecoration: 'none',
                            '&:hover': { color: 'var(--guk-color-primary-600)' },
                            '&:active': { color: 'var(--guk-color-primary-800)' },
                        },
                        strong: {
                            fontSize: 'var(--guk-font-size-base)',
                            color: 'var(--guk-color-neutral-500)',
                            '@media (min-width: 786px)': {
                                fontSize: 'var(--guk-font-size-lg)',
                            },
                        },
                        em: {
                            fontSize: 'var(--guk-font-size-base)',
                            color: 'var(--guk-color-neutral-500)',
                            '@media (min-width: 786px)': {
                                fontSize: 'var(--guk-font-size-lg)',
                            },
                        },
                        blockquote: {
                            borderRadius: 'var(--guk-border-rounded-lg)',
                            border: `1px solid var(--guk-color-neutral-200)`,
                            backgroundColor: 'var(--guk-color-neutral-50)',
                            padding: 'var(--guk-space-10)',
                            boxShadow: 'var(--guk-shadow-neutral-md)',
                        },
                        pre: {
                            borderRadius: 'var(--guk-border-rounded-lg)',
                            backgroundColor: 'var(--guk-color-neutral-900)',
                            color: 'var(--guk-color-neutral-50)',
                        },
                        code: {
                            backgroundColor: 'var(--guk-color-neutral-900)',
                            color: 'var(--guk-color-neutral-50)',
                            padding: 'var(--guk-space-base)',
                            borderRadius: '0.25rem',
                        },
                        'code::before': { content: '""', 'padding-left': '0.25rem' },
                        'code::after': { content: '""', 'padding-right': '0.25rem' },
                        img: {
                            overflow: 'hidden',
                            borderRadius: 'var(--guk-border-rounded-xl)',
                            boxShadow: 'var(--guk-shadow-neutral-md)',
                        },
                        video: {
                            overflow: 'hidden',
                            borderRadius: 'var(--guk-border-rounded-xl)',
                            boxShadow: 'var(--guk-shadow-neutral-md)',
                        },
                        hr: {
                            marginTop: 'var(--guk-space-10)',
                            borderColor: 'var(--guk-color-neutral-200)',
                        },
                    },
                },
            },
        },
    },
};
