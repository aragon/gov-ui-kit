import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import type { RollupOptions } from 'rollup';
import { mergeConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';
import svgoConfig from '../svgo.config.js';

const config: StorybookConfig = {
    stories: ['../docs/**/*.@(md|mdx)', '../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.@(md|mdx)'],

    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },

    typescript: {
        // Use react-docgen-typescript to generate args descriptions from component props comments
        reactDocgen: 'react-docgen-typescript',
    },

    addons: [getAbsolutePath('@storybook/addon-docs')],

    viteFinal: (viteConfig) => {
        // Add source-map-js alias and plugins for importing svg files and copying fonts
        const plugins = [
            // Run the same SVGO pass (including id namespacing, see svgo.config.js) as the
            // published library build, so Storybook previews match production markup.
            svgr({
                include: '**/*.svg',
                svgrOptions: { plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'], svgoConfig },
            }),
            viteStaticCopy({ targets: [{ src: './src/theme/fonts/*.ttf', dest: './fonts' }] }),
        ];
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

function getAbsolutePath(value: string) {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
