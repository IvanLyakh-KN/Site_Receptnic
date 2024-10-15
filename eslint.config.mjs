import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginCypress from 'eslint-plugin-cypress';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import babelEslintParser from '@babel/eslint-parser'; // Import the parser

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
