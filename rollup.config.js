const commonjs = require('@rollup/plugin-commonjs');
const images = require('@rollup/plugin-image');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');
const cleanup = require('rollup-plugin-delete');
const postcss = require('rollup-plugin-postcss');

const tsConfig = require('./tsconfig.json');
const { outDir } = tsConfig.compilerOptions;

const package = require('./package.json');

module.exports = [
    {
        input: {
            index: 'src/index.ts',
        },
        output: [
            { format: 'es', dir: outDir, entryFileNames: '[name].[format].js', sourcemap: true, interop: 'auto' },
            { format: 'cjs', dir: outDir, entryFileNames: '[name].[format].js', sourcemap: true, interop: 'auto' },
        ],
        external: Object.keys(package.dependencies),
        plugins: [
            cleanup({ targets: `${outDir}/*` }),
            nodeResolve(),
            commonjs(),
            typescript({
                compilerOptions: {
                    noEmit: false,
                    declaration: true,
                    emitDeclarationOnly: true,
                    declarationDir: `${outDir}/types`,
                    outDir,
                },
                exclude: ['**/*.spec.tsx', '**/*.spec.ts', '**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx'],
            }),

            postcss({
                config: {
                    path: './postcss.config.js',
                },
                extensions: ['.css'],
                minimize: true,
                inject: {
                    insertAt: 'top',
                },
            }),
            images({ include: ['**/*.png', '**/*.jpg', '**/*.svg'] }),
            terser(),
        ],
    },
];
