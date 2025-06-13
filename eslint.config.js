// eslint.config.js
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginTs from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    ignores: ['node_modules', 'dist', 'coverage'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: '@typescript-eslint/parser', // Parser cho TypeScript
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginPrettier.rules,
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off',
      'no-useless-catch': 'off', // Tắt quy tắc no-useless-catch
    },
  },
  pluginJs.configs.recommended,
  ...pluginTs.configs.recommended,
  ...pluginVue.configs['flat/recommended'], // Quy tắc Vue chặt chẽ hơn
  configPrettier, // Tắt các quy tắc ESLint xung đột với Prettier
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser', // Parser TypeScript cho file Vue
      },
    },
  },
];