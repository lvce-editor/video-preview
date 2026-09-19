import { measureMemory } from '@lvce-editor/measure-memory'
import { join } from 'node:path'
import { root } from './root.js'

const threshold = 500_000

const workerPath = join(root, 'dist', 'dist', 'videoPreviewMain.js')

const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs')

await measureMemory({
  playwrightPath,
  workerPath,
  threshold,
})
