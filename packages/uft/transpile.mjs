import { execa } from 'execa'

/**
 * @param {string} name
 * @param {string} value
 */
function globalVar(name, value) {
   return ['-C', `jsc.transform.optimizer.globals.vars.${name}=${value}`]
}

void async function transpile() {
   const { NODE_ENV } = process.env
   const isDev = NODE_ENV !== 'production'

   const cjs = [
      '-d',
      'dist/cjs/out',
   ]
   const esm = [
      '-d',
      'dist/esm/out',
      '--out-file-extension',
      'mjs',
      '-C',
      'module.type=es6',
   ]

   await Promise.all([cjs, esm].map((target) => {
      const args = [
         'src',
         '-s',
         'false',
         '--ignore',
         '**/*.spec.ts',
         '--ignore',
         '**/test.utils.ts',
         '--config-file',
         '.swcrc',
         ...target,
      ]

      if (isDev) {
         args.push(...globalVar('__DEV__', `'true'`))
      } else {
         args.push(...globalVar('__DEV__', 'undefined'))
      }

      console.log(`swc ${args.join(' ')}`)
      return execa(
         'swc',
         args,
         { stdio: 'inherit' }
      )
   }))
}()
