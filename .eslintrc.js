module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    alphaTab: 'writable',
    $: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/require-default-props': 'off',
    'max-len': ['error', { code: 120 }],
    'react/destructuring-assignment': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts'] }],
  },
};
