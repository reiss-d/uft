import path from 'path'
import { fileURLToPath } from 'url'

import { fixupConfigRules, includeIgnoreFile } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import eslintPluginImportX from 'eslint-plugin-import-x'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

const jsExts = 'js,cjs,mjs,jsx,mjsx'
const tsExts = 'ts,cts,mts,tsx,mtsx'
const allExts = `${jsExts},${tsExts}`

const packageDirs = [
   'configs/*',
   'packages/*',
]

const compat = new FlatCompat({
   baseDirectory: __dirname,
})

export default tseslint.config(
   /* Files to ignore */
   {
      ignores: [
         '.vscode/**',
         'eslint.config.mjs',
         '**/dist/',
         '**/temp/',
         '**/*-temp/',
         '**/*.temp.*',
         `**/jest.config.{${jsExts}}`,
         `**/jest.setup.{${jsExts}}`,
      ],
   },
   includeIgnoreFile(gitignorePath),
   /* Files to check */
   {
      files: [`**/*.{${allExts}}`],
   },
   /* eslint */
   eslint.configs.recommended,
   /* typescript-eslint */
   {
      languageOptions: {
         ecmaVersion: 'latest',
         sourceType: 'module',
         parser: tseslint.parser,
         parserOptions: {
            projectService: true,
            tsconfigRootDir: __dirname,
         },
         globals: { ...globals.node },
      },
   },
   ...tseslint.configs.recommendedTypeChecked,
   /* import-x */
   eslintPluginImportX.flatConfigs.recommended,
   eslintPluginImportX.flatConfigs.typescript,
   {
      settings: {
         'import-x/resolver': {
            typescript: {
               alwaysTryTypes: true,
               project: packageDirs.map((dir) =>
                  path.join(dir, 'tsconfig.json')
               ),
            },
         },
      },
      rules: {
         'import-x/no-dynamic-require': 'warn',
         'import/no-anonymous-default-export': 'off',
      },
   },
   /* turbo */
   ...fixupConfigRules(compat.extends('turbo')),
   /* All files */
   {
      rules: {
         'prefer-const': ['error', {
            destructuring: 'all',
            ignoreReadBeforeAssign: false,
         }],
         'dot-notation': 0, // overridden by @typescript-eslint/dot-notation
         'no-inner-declarations': 0,
         'no-void': 0,

         '@typescript-eslint/no-inferrable-types': ['warn', {
            ignoreParameters: true,
            ignoreProperties: true,
         }],
         '@typescript-eslint/no-unused-expressions': ['error', {
            allowShortCircuit: true,
            allowTernary: true,
         }],
         '@typescript-eslint/no-unused-vars': ['warn', {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
         }],
         '@typescript-eslint/restrict-template-expressions': ['error', {
            allowNumber: true,
         }],
         '@typescript-eslint/consistent-generic-constructors': 'error',
         '@typescript-eslint/consistent-type-imports': 'error',
         '@typescript-eslint/dot-notation': 'error',
         '@typescript-eslint/no-confusing-non-null-assertion': 'error',
         '@typescript-eslint/no-shadow': 'error',
         '@typescript-eslint/prefer-find': 'error',
         '@typescript-eslint/prefer-function-type': 'error',
         '@typescript-eslint/prefer-includes': 'error',
         '@typescript-eslint/prefer-nullish-coalescing': 'error',
         '@typescript-eslint/prefer-optional-chain': 'error',
         '@typescript-eslint/prefer-regexp-exec': 'error',
         '@typescript-eslint/prefer-string-starts-ends-with': 'error',
         '@typescript-eslint/restrict-plus-operands': 'error',
         '@typescript-eslint/ban-ts-comment': 0,
         '@typescript-eslint/ban-types': 0,
         '@typescript-eslint/no-empty-function': 0,
         '@typescript-eslint/no-empty-interface': 0,
         '@typescript-eslint/no-empty-object-type': 0,
         '@typescript-eslint/no-explicit-any': 0,
         '@typescript-eslint/no-extra-semi': 0,
         '@typescript-eslint/no-non-null-assertion': 0,
         '@typescript-eslint/no-unsafe-function-type': 0,
      },
   },
   /* Only JS files */
   {
      files: [`**/*.{${jsExts}}`],
      // Disable type checking
      ...tseslint.configs.disableTypeChecked,
   },
   /* Only test files */
   {
      files: [
         // Any file within a `tests` dir
         `**/tests/**/*.{${allExts}}`,
         // Any file ending with `.spec.{?}`
         `**/*.spec.{${allExts}}`,
      ],
      languageOptions: {
         globals: {
            ...globals.node,
            // Include jest globals
            ...globals.jest,
         },
      },
   }
)
