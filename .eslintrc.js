'use strict';

const tsConfig = require('./tsconfig.json');

// Import tailwind configs instead of simply specifying the config path because editors do not correctly load these
// configurations otherwise (see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/51)
const tailwindConfig = require('./tailwind.config');

const extendsBase = [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
];

const extendsTypescript = [...extendsBase, 'plugin:@typescript-eslint/recommended'];

const rulesBase = {
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
    'react/self-closing-comp': 'warn',
    'react/prop-types': 'off',
    'react/jsx-boolean-value': ['warn', 'always'],
    'no-console': 'warn',
    curly: 'warn',
    'brace-style': 'warn',
    'prefer-template': 'warn',
    'no-useless-concat': 'warn',
    'import/no-cycle': 'warn',
};

const typescriptRules = {
    ...rulesBase,
    '@typescript-eslint/no-empty-object-type': ['warn', { allowInterfaces: 'always' }],
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
    '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
};

module.exports = {
    env: {
        commonjs: true,
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
        tailwindcss: {
            callees: ['classnames', 'classNames', 'clsx', 'ctl'],
            config: tailwindConfig,
        },
    },
    extends: extendsBase,
    plugins: ['@typescript-eslint', 'tailwindcss'],
    rules: rulesBase,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    ignorePatterns: tsConfig.exclude,
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            extends: extendsTypescript,
            rules: typescriptRules,
        },
    ],
};
