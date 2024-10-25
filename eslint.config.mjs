import babelEslintParser from '@babel/eslint-parser'; // Import the parser
import pluginJs from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

const config = [
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
      parser: babelEslintParser, // Use the imported parser
      parserOptions: {
        requireConfigFile: false, // Optional: can be set to true if you have a config file for Babel
        ecmaVersion: 2021,
        sourceType: 'module', // Allow ES modules
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      import: pluginImport,
      unicorn: pluginUnicorn,
      cypress: pluginCypress,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Environment settings
      'react/react-in-jsx-scope': 'off', // Optional: if you're using React 17+

      // Rules from ESLint recommended
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
      'unicorn/no-empty-file': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'import/namespace': [2, { allowComputed: true }],
      'import/first': 'error',
      'import/newline-after-import': 'error',

      // Add additional rules here if necessary
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
        webpack: {
          config: './config/webpack.development.config.js', // Adjust as necessary
        },
      },
    },
  },
  {
    "parser": "@babel/eslint-parser",
    "parserOptions": {
      "requireConfigFile": false,
      "ecmaVersion": 2021,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    }
  },
  // Overrides for specific files
  {
    files: ['*rc.js', '*.config.js'],
    rules: {
      'unicorn/prefer-module': 'off',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
          },
        },
      ],
      'no-unused-vars': 'off',
    },
  },
];

export default config;
