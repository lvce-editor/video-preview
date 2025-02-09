import * as GetVideoErrorMessage from '../GetVideoErrorMessage/GetVideoErrorMessage.ts'

export class VideoLoadError extends Error {
  code: any

  constructor(event) {
    const message = GetVideoErrorMessage.getMessage(event)
    super(message)
    this.name = 'VideoLoadError'
    this.code = event.code
  }
}
