/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{jsx,ts,tsx,mdx}', './docs/**/*.{jsx,tsx,mdx}', '.storybook/*.{jsx,tsx}'],
    theme: {
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
