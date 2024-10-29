const globals = require('globals');

const eslint = require('@eslint/js');
const tsEslint = require('typescript-eslint');

const pluginTestingLibrary = require('eslint-plugin-testing-library');

const config = tsEslint.config(
    // Default rules
    eslint.configs.recommended,
    ...tsEslint.configs.recommendedTypeChecked,
    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
            '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
            '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
            '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
            '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },
    // Rules for JavaScript files
    {
        files: ['**/*.js'],
        ...tsEslint.configs.disableTypeChecked,
        rules: {
            ...tsEslint.configs.disableTypeChecked.rules,
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    // Rules for test files
    {
        files: ['**/*.test.ts', '**/*.test.tsx'],
        ...pluginTestingLibrary.configs['flat/react'],
        rules: {
            ...pluginTestingLibrary.configs['flat/react'].rules,
            '@typescript-eslint/unbound-method': 'off',
        },
    },
);

module.exports = config;
