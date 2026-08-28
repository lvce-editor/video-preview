export interface VideoPreviewRenderState {
  readonly errorMessage: string
  readonly mediaType: 'audio' | 'video'
  readonly url: string
}
