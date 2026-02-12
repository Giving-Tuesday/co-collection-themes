module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true, jest: true },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:import/recommended', 'prettier', 'plugin:storybook/recommended'],
  plugins: ['react', 'react-hooks', 'import'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: 'detect' } },
  rules: {
    'react/prop-types': 'off',
    'import/no-unresolved': 'off',
  },
  overrides: [
    {
      files: ['**/*.js'],
      excludedFiles: ['**/*.config.js', 'rollup.config.js', '.storybook/*.js'],
      rules: {
        // Disallow JSX syntax in .js files; require .jsx extension instead
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
      },
    },
  ],
};
