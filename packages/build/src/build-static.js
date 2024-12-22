import { replace } from '@lvce-editor/package-extension'
import { cp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path, { join } from 'node:path'
import { root } from './root.js'
import { pathToFileURL } from 'node:url'

await import('./build.js')

await cp(path.join(root, 'dist'), path.join(root, 'dist2'), {
  recursive: true,
  force: true,
})

const sharedProcessPath = join(root, 'packages', 'server', 'node_modules', '@lvce-editor', 'shared-process', 'index.js')
const sharedProcessUri = pathToFileURL(sharedProcessPath).toString()
const { exportStatic } = await import(sharedProcessUri)

const { commitHash } = await exportStatic({
  extensionPath: 'packages/extension',
  root,
})

await cp(path.join(root, 'dist2'), path.join(root, 'dist', commitHash, 'extensions', 'builtin.video-preview'), {
  recursive: true,
  force: true,
})

await replace({
  path: path.join(root, 'dist', commitHash, 'config', 'webExtensions.json'),
  occurrence: 'src/videoPreviewMain.ts',
  replacement: 'dist/videoPreviewMain.js',
})
await replace({
  path: path.join(root, 'dist', commitHash, 'config', 'webExtensions.json'),
  occurrence: '../video-preview-worker/src/videoPreviewWorkerMain.ts',
  replacement: './video-preview-worker/dist/videoPreviewWorkerMain.js',
})

const pathPrefix = '/video-preview'
const webViewsPath = join(root, 'dist', commitHash, 'config', 'webViews.json')
const extensionJsonPath = join(root, 'dist', commitHash, 'extensions', 'builtin.video-preview', 'extension.json')
const extensionJsonContent = await readFile(extensionJsonPath, 'utf8')
const extensionJson = JSON.parse(extensionJsonContent)
extensionJson.webViews[0].path = `${commitHash}/extensions/${extensionJson.id}/${extensionJson.webViews[0].path}`
extensionJson.webViews[0].remotePath = `${pathPrefix}/${commitHash}/extensions/${extensionJson.id}`
await writeFile(webViewsPath, JSON.stringify(extensionJson.webViews, null, 2) + '\n')

await rm(join(root, 'dist', commitHash, 'playground'), { recursive: true, force: true })
await cp(join(root, 'packages', 'sample-files', 'files'), join(root, 'dist', commitHash, 'playground'), {
  recursive: true,
})

const dirents = await readdir(join(root, 'dist', commitHash, 'playground'))
const fileMap = dirents.map((dirent) => `/playground/${dirent}`)
await writeFile(join(root, 'dist', commitHash, 'config', 'fileMap.json'), JSON.stringify(fileMap, null, 2) + '\n')
