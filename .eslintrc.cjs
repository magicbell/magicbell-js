module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['eslint-plugin-simple-import-sort', 'import', 'cypress'],
  rules: {
    // we use jsx-runtime automatic
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": ['error', { ignore: ['css'] }],
    "react/no-deprecated": "off",
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    "@typescript-eslint/no-explicit-any": "off",
    'prefer-const': ['error', { destructuring: 'all' }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/newline-after-import': 'error',
    'import/first': 'error',
    'import/no-duplicates': 'error',
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
      files: './packages/playground/**/*',
      rules: {
        'react/prop-types': 'off',
      }
    },
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
    {
      files: './packages/{project,user}-client/**/*.{ts,tsx}',
      rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
      }
    },
    {
      files: './packages/in-app/**/*.{js,ts,tsx}',
      settings: {
        react: {
          version: '18.2.0',
        }
      },
      rules: {
        '@typescript-eslint/no-namespace': 'off'
      }
    },
    {
      files: ['**/*.vue'],
      extends: ['plugin:vue/vue3-recommended'],
      rules: {
        'vue/singleline-html-element-content-newline': 'off',
      }
    },
    {
      files: ['scripts/**/*'],
      rules: {
        'no-console': 'off',
      }
    }
  ],
};
