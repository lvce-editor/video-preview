const AudioFileExtension = '.webm'

const getMessage = (uri: string): string => {
  return uri.toLowerCase().endsWith(AudioFileExtension) ? 'Audio file not found' : 'Video file not found'
}

export class MediaFileNotFoundError extends Error {
  readonly code = 'E_NOT_FOUND'

  constructor(uri: string) {
    super(getMessage(uri))
  }
}
