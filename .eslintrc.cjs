module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['eslint-plugin-simple-import-sort', 'cypress'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prefer-const': ['error', { destructuring: 'all' }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    curly: ['error', 'multi-line', 'consistent'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true, varsIgnorePattern: 'jsx|^_', argsIgnorePattern: '^_' },
    ],
    'no-console': ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    }
  },
  overrides: [
    {
      files: '**/*.spec.{ts,tsx}',
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
      env: {
        'cypress/globals': true,
      }
    },
  ],
};
