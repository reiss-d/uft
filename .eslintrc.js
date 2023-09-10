const project = ['./packages/*/tsconfig.json']

module.exports = {
   extends: ['uft'],
   parserOptions: {
      tsconfigRootDir: __dirname,
      project,
   },
   settings: {
      'import/resolver': {
         typescript: {
            alwaysTryTypes: true,
            project,
         },
      },
   },
   root: true,
}
