import fg from 'fast-glob'
import { defineConfig } from 'tsup'
import { fileName } from './shared.mjs'

const isDevelopment = process.env.NODE_ENV !== 'production'

const files = fg.sync([
   'src/**/*.ts',
   '!src/global.d.ts',
   '!src/test.utils.ts',
   '!src/**/*.spec.ts',
   '!src/**/*.temp.*',
   '!src/**/*-temp/*',
])

const common = {
   entry: files.reduce((acc, file) => {
      const name = fileName(file)
      acc[name] = file
      return acc
   }, {} as Record<string, string>),
   tsconfig: './tsconfig.build.json',
   target: 'es2020',
   sourcemap: isDevelopment,
   bundle: false,
   clean: false,
   dts: true,
   minify: !isDevelopment,
   /**
    * Dependencies that should be bundled inline.
    * This should rarely be used.
    */
   noExternal: [] as string[],
} as const

export default defineConfig([
   {
      ...common,
      format: 'cjs',
      outDir: 'dist/cjs',
   },
   {
      ...common,
      format: 'esm',
      outDir: 'dist/esm',
   },
])
