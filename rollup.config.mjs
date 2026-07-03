import { createRequire } from 'node:module';
import commonjs from '@rollup/plugin-commonjs';
import images from '@rollup/plugin-image';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';

const require = createRequire(import.meta.url);
const tsConfig = require('./tsconfig.json');
const { outDir } = tsConfig.compilerOptions;

const analyze = process.env.ANALYZE === 'true';

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
            svgr({
                // Keep the viewBox so icons scale instead of getting clipped when
                // rendered at a size other than their intrinsic 16px (e.g. size-3 in
                // small buttons). SVGO's preset-default removes it by default.
                svgoConfig: {
                    plugins: [
                        {
                            name: 'preset-default',
                            params: { overrides: { removeViewBox: false } },
                        },
                    ],
                },
            }),
            terser(),
        ],
    },
    {
        input: 'index.css',
        output: { file: 'build.css' },
        plugins: [postcss({ plugins: [], extract: true, minimize: true })],
    },
];
