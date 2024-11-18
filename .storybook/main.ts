import type { StorybookConfig } from '@storybook/react-webpack5';
import type { RuleSetRule } from 'webpack';

const config: StorybookConfig = {
    stories: ['../docs/**/*.@(md|mdx)', '../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.@(md|mdx)'],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        {
            name: '@storybook/addon-styling-webpack',
            options: {
                rules: [
                    // Replaces existing CSS rules to support PostCSS
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: { importLoaders: 1 },
                            },
                            {
                                // Gets options from `postcss.config.js`
                                loader: 'postcss-loader',
                                options: { implementation: require.resolve('postcss') },
                            },
                        ],
                    },
                ],
            },
        },
        '@storybook/addon-designs',
        '@storybook/addon-webpack5-compiler-babel',
    ],

    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },

    typescript: {
        // Use react-docgen-typescript to generate args descriptions from component props comments
        reactDocgen: 'react-docgen-typescript',
    },

    webpackFinal: (webpackConfig) => {
        // Remove any svg loader already set and use @svgr/webpack to load svgs on Storybook
        const svgWebpackRule = webpackConfig.module?.rules?.find((rule) => {
            if (rule != null && typeof rule !== 'string' && (rule as RuleSetRule).test instanceof RegExp) {
                const testRegExp = (rule as RuleSetRule).test as RegExp;
                return testRegExp.test('.svg');
            }

            return undefined;
        });

        if (typeof svgWebpackRule !== 'string') {
            (svgWebpackRule as RuleSetRule).exclude = /\.svg$/;
        }

        webpackConfig.module?.rules?.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return webpackConfig;
    },
};

export default config;
