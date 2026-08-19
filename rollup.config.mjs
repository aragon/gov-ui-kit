import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import commonjs from '@rollup/plugin-commonjs';
import images from '@rollup/plugin-image';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import tailwindcss from '@tailwindcss/postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';
import svgoConfig from './svgo.config.js';

const require = createRequire(import.meta.url);
const tsConfig = require('./tsconfig.json');
const { outDir } = tsConfig.compilerOptions;

const analyze = process.env.ANALYZE === 'true';

// Tailwind v4 scans for class candidates from the working directory, so `base` is pinned to keep the compiled CSS
// identical no matter where the build runs from. `pnpm css:check` pins it the same way and compares the two.
const repoRoot = dirname(fileURLToPath(import.meta.url));

export default [
    {
        input: {
            index: 'src/index.ts',
        },
        output: [
            {
                format: 'es',
                dir: outDir,
                entryFileNames: '[name].[format].js',
                sourcemap: true,
                interop: 'auto',
                plugins: [analyze ? visualizer({ filename: 'stats.es.html', open: true }) : undefined],
            },
        ],
        plugins: [
            peerDepsExternal({ includeDependencies: true }),
            nodeResolve(),
            commonjs(),
            typescript({
                compilerOptions: {
                    noEmit: false,
                    declaration: true,
                    declarationDir: `${outDir}/types`,
                    outDir,
                },
                exclude: [
                    'node_modules/**',
                    '**/*.spec.tsx',
                    '**/*.spec.ts',
                    '**/*.test.tsx',
                    '**/*.test.ts',
                    '**/*.stories.tsx',
                    '*.config.mjs',
                ],
            }),
            images({ include: ['**/*.png', '**/*.jpg'] }),
            svgr({ svgoConfig }),
            terser(),
        ],
    },
    {
        input: 'index.css',
        output: { file: 'build.css' },
        // Minify through Tailwind's own optimizer (Lightning CSS): the postcss plugin's cssnano pass predates CSS
        // nesting and merges the selector lists of nested rules, which leaks child styles across unrelated utilities.
        plugins: [
            postcss({
                config: false,
                plugins: [tailwindcss({ base: repoRoot, optimize: { minify: true } })],
                extract: true,
            }),
        ],
    },
];
