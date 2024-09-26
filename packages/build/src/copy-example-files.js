import { cp, mkdir, rm } from 'fs/promises'
import { tmpdir } from 'os'
import { dirname, join } from 'path'
import { execa } from 'execa'
import { root } from './root.js'

const url = 'https://github.com/mediaelement/mediaelement-files'
const toCopy = ['big_buck_bunny.mp4', 'big_buck_bunny.webm', 'echo-hereweare.ogv']

const main = async () => {
  const tmpDir = join(tmpdir(), 'mediaelement-files')
  await rm(tmpDir, { recursive: true })
  await mkdir(dirname(tmpDir), { recursive: true })
  await execa('git', ['clone', url, tmpDir], { stdio: 'inherit' })
  const outDir = join(root, 'packages', 'sample-files', 'files')
  await mkdir(outDir, { recursive: true })
  await cp(tmpDir, outDir, {
    recursive: true,
    filter(source, destination) {
      console.log({ source })
      for (const extension of toCopy) {
        if (source.endsWith(extension)) {
          return true
        }
      }
      return false
    },
  })
}

main()
