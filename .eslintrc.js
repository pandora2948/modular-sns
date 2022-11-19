module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['unused-imports', 'import'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    log: 'readonly',
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-else-return': 2,
    'react/prop-types': 2,
    'react/jsx-no-target-blank': 0,
    'react/react-in-jsx-scope': 0,
    'no-unused-vars': 0,
    'unused-imports/no-unused-imports': 2,
    'unused-imports/no-unused-vars': [
      2,
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'react-hooks/exhaustive-deps': 2,
    'react/display-name': 0,
    'no-restricted-syntax': [
      2,
      {
        selector: "LogicalExpression[right.type='AssignmentExpression']",
        message: 'right-hand assign is not allowed',
      },
    ],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: 'prop-types',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-dom/client',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-router-dom',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-router-dom', 'react-dom/client', 'prop-types'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        'newlines-between': 'never',
      },
    ],
  },
  settings: {
    react: {
      pragma: 'React',
      version: '18',
    },
  },
};
