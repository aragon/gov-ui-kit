import type { StorybookConfig } from '@storybook/react-vite';
import type { RollupOptions } from 'rollup';
import { mergeConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
    stories: ['../docs/**/*.@(md|mdx)', '../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.@(md|mdx)'],

    framework: {
        name: '@storybook/react-vite',
        options: {},
    },

    typescript: {
        // Use react-docgen-typescript to generate args descriptions from component props comments
        reactDocgen: 'react-docgen-typescript',
    },

    staticDirs: ['../src/theme/fonts'],

    addons: ['@storybook/addon-docs'],

    viteFinal: (viteConfig) => {
        // Add polyfills for path, url and source-map-js node modules and plugin for importing svg files
        const plugins = [nodePolyfills({ include: ['path', 'url'] }), svgr({ include: '**/*.svg' })];
        const resolve = { alias: { 'source-map-js': 'source-map' } };

        const rollupOptions: RollupOptions = {
            // Externalize font assets (see https://github.com/storybookjs/storybook/pull/27110)
            external: [/.*\.ttf/],
            // Silence "use client" directive and "/* PURE */" comment warnings during Storybook build
            onwarn: (warning, warn) => {
                if (['MODULE_LEVEL_DIRECTIVE', 'INVALID_ANNOTATION'].includes(warning.code ?? '')) {
                    return;
                }
                warn(warning);
            },
        };

        const finalConfigs = mergeConfig(viteConfig, { plugins, resolve, build: { rollupOptions } });

        return finalConfigs;
    },
};

export default config;
