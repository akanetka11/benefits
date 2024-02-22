module.exports = {
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  plugins: ['prettier', '@typescript-eslint', 'react-hooks', 'import'],
  rules: {
    'import/order': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'no-duplicate-imports': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'ignore',
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
  },
  ignorePatterns: ['node_modules', 'babel.config.js'],
};
