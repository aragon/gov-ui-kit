const globals = require('globals');

const eslint = require('@eslint/js');
const tsEslint = require('typescript-eslint');

const pluginImport = require('eslint-plugin-import');
const pluginJsxA11y = require('eslint-plugin-jsx-a11y');
const pluginReact = require('eslint-plugin-react');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const pluginStorybook = require('eslint-plugin-storybook');
const pluginTailwind = require('eslint-plugin-tailwindcss');
const pluginTestingLibrary = require('eslint-plugin-testing-library');

const tsConfig = require('./tsconfig.json');

const config = tsEslint.config(
    // Default rules
    eslint.configs.recommended,
    pluginImport.flatConfigs.recommended,
    pluginImport.flatConfigs.typescript,
    pluginJsxA11y.flatConfigs.recommended,
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat['jsx-runtime'],
    ...pluginStorybook.configs['flat/recommended'],
    ...pluginTailwind.configs['flat/recommended'],
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
            'react-hooks': pluginReactHooks,
        },
    },
    {
        ignores: tsConfig.exclude,
    },
    {
        rules: {
            '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
            '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
            '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
            '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
            '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
            '@typescript-eslint/no-non-null-assertion': 'off',
            'import/no-cycle': 'warn',
            'react/prop-types': 'off',
            'react/jsx-boolean-value': ['warn', 'always'],
            'react/self-closing-comp': 'warn',
            'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
            ...pluginReactHooks.configs.recommended.rules,
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
    // Rules for Storybook files
    {
        files: ['**/*.stories.tsx'],
        rules: {
            'react-hooks/rules-of-hooks': 'off',
        },
    },
);

module.exports = config;
