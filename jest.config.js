'use strict';

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    testEnvironment: 'jsdom',
    collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
    coveragePathIgnorePatterns: ['.d.ts', '.api.ts', 'index.ts', '.stories.tsx', './src/core/test/*'],
    setupFilesAfterEnv: ['<rootDir>/src/core/test/setup.ts'],
    globalSetup: '<rootDir>/src/core/test/globalSetup.ts',
    transform: {
        '^.+\\.svg$': '<rootDir>/src/core/test/svgTransform.js',
        '^.+\\.m?[tj]sx?$': [
            'ts-jest',
            {
                tsconfig: {
                    isolatedModules: true,
                    module: 'CommonJS',
                    target: 'ES2020',
                    allowJs: true,
                },
            },
        ],
    },
    // Allow transforming specific ESM deps even under pnpm's nested layout
    // e.g. node_modules/.pnpm/<pkg>@<ver>/node_modules/<pkg>/...
    transformIgnorePatterns: [
        // Transform only wagmi-related ESM; leave viem/abitype in CJS to avoid downlevel issues
        'node_modules/(?!(?:\\.pnpm/[^/]+/node_modules/)?(wagmi|@wagmi|use-sync-external-store|react-merge-refs)(/|$))',
    ],
};

module.exports = config;
