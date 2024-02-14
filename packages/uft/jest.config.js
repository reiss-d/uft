// @ts-check

/** @type {import('jest').Config} */
const config = {
   displayName: 'uft',
   testEnvironment: 'node',
   testMatch: ['**/src/**/*.spec.ts'],
   transform: {
      '^.+\\.tsx?$': ['@swc/jest', {
         swcrc: false,
         sourceMaps: 'inline',
         module: {
            type: 'commonjs',
         },
         jsc: {
            parser: { 'syntax': 'typescript' },
            target: 'es2020',
            externalHelpers: true,
            keepClassNames: true,
            transform: {
               optimizer: {
                  globals: {
                     vars: {
                        __DEV__: 'true',
                     },
                  },
               },
            },
            // should be consistent with production build
            minify: {
               compress: {
                  inline: false,
               },
               mangle: {
                  keepClassNames: true,
               },
            },
         },
      }],
   },
   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
   // since the actual package.json is in dist (publishConfig.directory)
   // we need to ignore the root package.json so jest doesn't complain
   modulePathIgnorePatterns: ['<rootDir>/package.json'],
   verbose: false,
   silent: false,
   extensionsToTreatAsEsm: ['.ts', '.tsx'],
}

module.exports = config
