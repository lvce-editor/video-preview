export class VideoLoadError extends Error {
  code: any

  constructor(event) {
    super(`Failed to load video: ${event.message}`)
    this.name = 'VideoLoadError'
    this.code = event.code
  }
}
