module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'frontend/dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      // Server-side code: Node globals, and none of the React rules apply.
      files: ['backend/**/*.ts', 'api/**/*.ts'],
      env: { browser: false, node: true, es2022: true },
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
}
