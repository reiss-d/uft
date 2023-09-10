// @ts-check
import * as path from 'path'

/** @type {Record<string,string|undefined> } */
export const extensionMap = {
   // DECLARATIONS MUST COME FIRST
   '.d.ts': '.js',
   '.d.mts': '.mjs',
   '.js': '.js',
   '.mjs': '.mjs',
}

/**
 * @param {string} p path
 */
export function extname(p) {
   for (const ext of Object.keys(extensionMap)) {
      if (p.endsWith(ext)) { return ext }
   }
   return path.extname(p)
}

/**
 * Return the last portion of a path without its extension.
 * @param {string} filePath
 */
export function basename(filePath) {
   const ext = extname(filePath)
   let base = path.basename(filePath)

   if (ext) {
      base = base.slice(0, base.length - ext.length)
   }
   return base
}

/**
 * Gets the file name for `dist/cjs` and `dist/esm` files.
 *
 * @param {string} filePath
 *
 * @example
 * index.js -> index
 * internal/builtin.js -> builtin
 * array/unique/index.js -> unique
 */
export function fileName(filePath) {
   const dirname = basename(path.dirname(filePath))

   // already top level
   if (['src', 'cjs', 'esm', 'out'].includes(dirname)) {
      return basename(filePath)
   }

   // Internal files are not placed at top level,
   // but in a folder named internal.
   if (dirname === 'internal') {
      return path.join('internal', basename(filePath))
   }

   let base = basename(filePath)
   if (base === 'index') {
      base = dirname
   }
   return base
}
