const AudioFileExtension = '.webm'

const getMessage = (uri: string): string => {
  return uri.toLowerCase().endsWith(AudioFileExtension) ? 'Audio File not found' : 'Video File not found'
}

export class MediaFileNotFoundError extends Error {
  readonly code = 'E_NOT_FOUND'

  constructor(uri: string) {
    super(getMessage(uri))
  }
}
