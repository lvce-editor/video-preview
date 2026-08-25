import { executeCommand, readAsObjectUrl, type ReadAsObjectUrlResult } from '@lvce-editor/api'

type ReadAsObjectUrl = (uri: string) => Promise<ReadAsObjectUrlResult>
type ExecuteCommand = (id: string, ...args: readonly unknown[]) => Promise<unknown>

const hasCustomFileSystemScheme = (uri: string): boolean => {
  return uri.includes('://') && !uri.startsWith('file://') && !uri.startsWith('http://') && !uri.startsWith('https://')
}

export const getVideoUrl = async (
  uri: string,
  read: ReadAsObjectUrl = readAsObjectUrl,
  execute: ExecuteCommand = executeCommand,
): Promise<string> => {
  if (hasCustomFileSystemScheme(uri)) {
    return (await execute('Blob.getSrc', uri)) as string
  }
  const result = await read(uri)
  return result.wasFound ? result.objectUrl : ''
}
