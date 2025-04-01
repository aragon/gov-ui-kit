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
        '^.+\\.m?[tj]sx?$': ['ts-jest', { tsconfig: { isolatedModules: true } }],
    },
    transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|react-merge-refs|wagmi|@wagmi))'],
};

module.exports = config;
