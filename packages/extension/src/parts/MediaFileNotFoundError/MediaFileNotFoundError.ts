import { getMediaType } from '../GetMediaType/GetMediaType.ts'

const getMessage = (uri: string): string => {
  const isAudio = getMediaType(uri) === 'audio' || uri.toLowerCase().endsWith('.webm')
  return isAudio ? 'Audio file not found' : 'Video file not found'
}

export class MediaFileNotFoundError extends Error {
  readonly code = 'E_NOT_FOUND'

  constructor(uri: string) {
    super(getMessage(uri))
  }
}
