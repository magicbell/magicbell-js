// eslint-disable-next-line no-undef
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'cypress'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: { '@typescript-eslint/explicit-module-boundary-types': 0 },
  env: {
    'cypress/globals': true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
