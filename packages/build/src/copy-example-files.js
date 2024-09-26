import { mkdir, rm } from 'fs/promises'
import { tmpdir } from 'os'
import { dirname, join } from 'path'
import { execa } from 'execa'

const url = 'https://github.com/mediaelement/mediaelement-files'

const main = async () => {
  const tmpDir = join(tmpdir(), 'mediaelement-files')
  await rm(tmpDir, { recursive: true })
  await mkdir(dirname(tmpDir), { recursive: true })
  await execa('git', ['clone', url, tmpDir], { stdio: 'inherit' })
}

main()
