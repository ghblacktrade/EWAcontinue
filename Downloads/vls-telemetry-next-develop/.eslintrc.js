module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'import'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/consistent-type-imports': [2],
        '@typescript-eslint/interface-name-prefix': [0],
        '@typescript-eslint/explicit-function-return-type': [0],
        '@typescript-eslint/explicit-module-boundary-types': [0],
        '@typescript-eslint/no-unused-vars': [2, { ignoreRestSiblings: true }],
        '@typescript-eslint/no-explicit-any': [2],
        '@typescript-eslint/ban-ts-comment': [2],
        '@typescript-eslint/array-type': [
            2,
            {
                default: 'generic',
            },
        ],

        'import/order': [
            2,
            {
                alphabetize: {
                    order: 'asc',
                    orderImportKind: 'asc',
                    caseInsensitive: true,
                },
                'newlines-between': 'always-and-inside-groups',
            },
        ],

        'no-console': [2],
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts'],
        },
        'import/resolver': {
            typescript: true,
            node: true,
        },
    },
};
