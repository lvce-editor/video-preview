import { defineConfig } from '@lvce-editor/test-with-playwright'

export default defineConfig({
  onlyExtension: '../extension',
  reusePage: true,
  serverPath: '../../node_modules/@lvce-editor/server/bin/server.js',
  testPath: '.',
})
