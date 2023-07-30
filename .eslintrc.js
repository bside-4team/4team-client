module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: { jsx: true },
    },
    settings: {
        'import/resolver': {
            node: {},
        },
        'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'next',
        'next/core-web-vitals',
        'prettier',
    ],
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    rules: {
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/naming-convention': [
            'error',
            { format: ['camelCase', 'PascalCase'], selector: 'function' },
            {
                format: ['PascalCase'],
                selector: 'interface',
            },
            {
                format: ['PascalCase'],
                selector: 'typeAlias',
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                ignoreRestSiblings: true,
            },
        ],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                'newlines-between': 'never',
            },
        ],
    },
};
