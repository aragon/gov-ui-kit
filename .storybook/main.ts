import type { StorybookConfig } from '@storybook/react-vite';
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

    addons: ['@storybook/addon-docs'],

    viteFinal: (viteConfig) => {
        const plugins = [nodePolyfills({ include: ['path', 'url'] }), svgr({ include: '**/*.svg' })];
        const resolve = { alias: { 'source-map-js': 'source-map' } };

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const finalConfigs = mergeConfig(viteConfig, { plugins, resolve }) as Record<string, unknown>;

        return finalConfigs;
    },
};

export default config;
