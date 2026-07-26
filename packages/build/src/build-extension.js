import { bundleJs } from '@lvce-editor/package-extension'
import { join } from 'node:path'
import { root } from './root.js'

await bundleJs(
  join(root, 'packages', 'extension', 'src', 'videoPreviewMain.ts'),
  join(root, 'packages', 'extension', 'dist', 'videoPreviewMain.js'),
)
