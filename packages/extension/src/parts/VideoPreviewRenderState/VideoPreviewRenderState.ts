export interface VideoPreviewRenderState {
  readonly errorMessage: string
  readonly mediaType: 'audio' | 'video'
  readonly ready: boolean
  readonly url: string
}
