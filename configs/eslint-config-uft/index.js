module.exports = {
   env: { es6: true, node: true, browser: true },
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/strict-type-checked',
      'plugin:@typescript-eslint/stylistic-type-checked',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'turbo',
   ],
   plugins: ['@typescript-eslint', 'import'],
   parser: '@typescript-eslint/parser',
   settings: {
      'import/parsers': {
         '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
         typescript: { alwaysTryTypes: true },
      },
   },
   rules: {
      'prefer-const': [
         'error',
         { destructuring: 'all', ignoreReadBeforeAssign: false },
      ],
      'no-unused-expressions': [
         'error',
         { allowShortCircuit: true, allowTernary: true },
      ],
      'no-inner-declarations': 'off',
      'no-void': 'off',

      '@typescript-eslint/ban-ts-comment': [
         1,
         { 'ts-ignore': false, 'ts-nocheck': false },
      ],
      '@typescript-eslint/no-unused-vars': [
         'warn',
         {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
         },
      ],
      '@typescript-eslint/no-namespace': ['error', {
         'allowDeclarations': true,
      }],
      '@typescript-eslint/restrict-template-expressions': [
         'error',
         { allowNumber: true },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extra-semi': 'off',
      '@typescript-eslint/no-meaningless-void-operator': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/prefer-for-of': 'off',
   },
}
