module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['eslint-plugin-simple-import-sort', 'cypress'],
  rules: {
    // we use jsx-runtime automatic
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": ['error', { ignore: ['css'] }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    "@typescript-eslint/no-explicit-any": "off",
    'prefer-const': ['error', { destructuring: 'all' }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    curly: ['error', 'multi-line', 'consistent'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true, varsIgnorePattern: 'jsx|^_', argsIgnorePattern: '^_' },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
  settings: {
    react: {
      version: 'detect',
    }
  },
  overrides: [
    {
      files: '**/*.{stories,spec,test}.{ts,tsx}',
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react/prop-types': 'off',
      },
      env: {
        'cypress/globals': true,
      }
    },
  ],
};
