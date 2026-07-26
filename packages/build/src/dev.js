import { spawn } from 'child_process'
import { join } from 'path'
import { root } from './root.js'

const serverPath = join(root, 'packages', 'build', 'node_modules', '@lvce-editor', 'server', 'bin', 'server.js')
const esbuildPath = join(root, 'packages', 'build', 'node_modules', '.bin', 'esbuild')

const main = () => {
  spawn(serverPath, ['--only-extension=packages/extension', '--test-path=packages/e2e'], {
    stdio: 'inherit',
  })
  spawn(
    esbuildPath,
    [
      '--format=esm',
      '--bundle',
      '--external:node:buffer',
      '--external:electron',
      '--external:ws',
      '--external:node:worker_threads',
      '--watch',
      'packages/extension/src/videoPreviewMain.ts',
      '--outfile=packages/extension/dist/videoPreviewMain.js',
    ],
    {
      cwd: root,
      stdio: 'inherit',
    },
  )
}

main()
