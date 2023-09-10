// @ts-check

/** @type {import('jest').Config} */
const config = {
   displayName: 'uft',
   testEnvironment: 'node',
   testMatch: ['**/src/**/*.spec.ts'],
   transform: {
      '^.+\\.tsx?$': ['@swc/jest', {
         jsc: {
            externalHelpers: false,
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
