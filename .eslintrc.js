module.exports = {
  root: true,
  extends: '@callstack',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
        'react-native/no-raw-text': [
          2,
          {
            skip: ['Button'],
          },
        ],
      },
    },
  ],
};
