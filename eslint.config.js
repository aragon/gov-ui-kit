const globals = require('globals');

const eslint = require('@eslint/js');
const tsEslint = require('typescript-eslint');

const importPlugin = require('eslint-plugin-import');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const storybookPlugin = require('eslint-plugin-storybook');
const tailwindPlugin = require('eslint-plugin-tailwindcss');
const testingLibraryPlugin = require('eslint-plugin-testing-library');

const tsConfig = require('./tsconfig.json');

const config = tsEslint.config(
    // Default rules
    eslint.configs.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    jsxA11yPlugin.flatConfigs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    ...storybookPlugin.configs['flat/recommended'],
    ...tailwindPlugin.configs['flat/recommended'],
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
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: true,
                node: true,
            },
            tailwindcss: {
                callees: ['classnames', 'classNames'],
            },
        },
        plugins: {
            'react-hooks': reactHooksPlugin,
        },
    },
    {
        ignores: tsConfig.exclude,
    },
    {
        rules: {
            'no-console': 'warn',
            curly: 'warn',
            'prefer-template': 'warn',
            'no-useless-concat': 'warn',
            '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
            '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
            '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
            '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
            '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
            '@typescript-eslint/consistent-type-exports': ['warn', { fixMixedExportsWithInlineTypeSpecifier: true }],
            'import/no-cycle': 'warn',
            'react/prop-types': 'off',
            'react/jsx-boolean-value': ['warn', 'always'],
            'react/self-closing-comp': 'warn',
            'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
            ...reactHooksPlugin.configs.recommended.rules,
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
        ...testingLibraryPlugin.configs['flat/react'],
        rules: {
            ...testingLibraryPlugin.configs['flat/react'].rules,
            '@typescript-eslint/unbound-method': 'off',
        },
    },
    // Rules for Storybook files
    {
        files: ['**/*.stories.tsx'],
        rules: {
            'react-hooks/rules-of-hooks': 'off',
        },
    },
);

module.exports = config;
