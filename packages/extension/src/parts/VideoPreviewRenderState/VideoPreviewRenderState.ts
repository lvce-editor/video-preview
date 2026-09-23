export const defaultAudioFileExtensions = ['.oga', '.ogg', '.opus', '.wav'] as const

export interface VideoPreviewRenderState {
  readonly audioFileExtensions: readonly string[]
  readonly errorMessage: string
  readonly mediaType: 'audio' | 'video'
  readonly ready: boolean
  readonly url: string
}
