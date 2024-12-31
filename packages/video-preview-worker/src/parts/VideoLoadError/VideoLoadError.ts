const isDecodingError = (event) => {
  return event.code === 4
}

const getMessage = (event) => {
  if (isDecodingError(event)) {
    return `Failed to decode video: ${event.message}`
  }
  return `Failed to load video: ${event.message}`
}

export class VideoLoadError extends Error {
  code: any

  constructor(event) {
    const message = getMessage(event)
    super(message)
    this.name = 'VideoLoadError'
    this.code = event.code
  }
}
