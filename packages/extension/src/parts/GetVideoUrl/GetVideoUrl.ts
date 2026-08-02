import { readAsObjectUrl, type ReadAsObjectUrlResult } from '@lvce-editor/api'

type ReadAsObjectUrl = (uri: string) => Promise<ReadAsObjectUrlResult>

export const getVideoUrl = async (uri: string, read: ReadAsObjectUrl = readAsObjectUrl): Promise<string> => {
  const result = await read(uri)
  return result.wasFound ? result.objectUrl : ''
}
