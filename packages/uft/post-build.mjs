/* eslint-disable import-x/no-named-as-default-member */
/* eslint-disable import-x/default */

import fg from 'fast-glob'
import * as fs from 'fs/promises'
import { minimatch } from 'minimatch'
import * as path from 'path'
import shelljs from 'shelljs'
import { basename, extensionMap, extname, fileName } from './shared.mjs'

/**
 * Converts relative imports/exports without an extension to the
 * correct extension.
 */
void async function fixImportExtensions() {
   const files = fg.sync([
      'dist/(cjs|esm)/out/**/*.(js|mjs)',
   ])

   await Promise.all(files.map(async (fileIn) => {
      const replaceExt = extensionMap[extname(fileIn)]
      if (!replaceExt) { return }

      try {
         let content = await fs.readFile(fileIn, 'utf8')

         content = content.replace(
            regex().require,
            (_, importPath) => {
               return `require('${
                  updateExtension(fileIn, importPath, replaceExt)
               }')`
            }
         )
         content = content.replace(
            regex().import,
            (match, importPath) => {
               return match.replace(
                  importPath,
                  updateExtension(fileIn, importPath, replaceExt)
               )
            }
         )
         const fileOut = fileDestination(fileIn)
         await fs.writeFile(fileOut, content, 'utf8')
      } catch (error) {
         console.error('Failed to transform file:', { file: fileIn, error })
      }
   }))

   shelljs.rm('-r', ['dist/cjs/out', 'dist/esm/out'])
}()

/**
 * @param {string} filePath
 */
function fileDestination(filePath) {
   const targetDir = filePath.startsWith('dist/cjs')
      ? 'dist/cjs'
      : filePath.startsWith('dist/esm')
      ? 'dist/esm'
      : undefined
   if (!targetDir) { throw new Error('unreachable') }

   const file = fileName(filePath)
   const ext = extname(filePath)

   return path.join(targetDir, `${file}${ext}`)
}

/**
 * @param {string} filePath
 * @param {string} importPath
 * @param {string} extension
 */
function updateExtension(filePath, importPath, extension) {
   // Only relative paths should be updated.
   if (!importPath.startsWith('.')) { return importPath }

   // const isTopLevelFile = minimatch(
   //    filePath,
   //    `dist/+(cjs|esm)/out/*.+(js|mjs)`
   // )
   const isInternalFile = minimatch(
      filePath,
      'dist/+(cjs|esm)/out/internal/*.+(js|mjs)'
   )
   const base = basename(importPath)

   if (isInternalFile) {
      if (importPath.startsWith('..')) {
         return `../${base}${extension}`
      }
      return `./${base}${extension}`
   }
   if (importPath.includes('internal/')) {
      return `./internal/${base}${extension}`
   }
   return `./${base}${extension}`
}

// `s` flag seems to be causing issues for vscode syntax highlighting,
// moving regex to bottom of file to limit visual impact.
function regex() {
   return {
      require: /require\s*\(\s*['"`](.+?)['"`]\s*\)/gs,
      import: /from\s*['"`]([^'"`]+)['"`]/gs,
   }
}
