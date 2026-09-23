import type { VideoPreviewRenderState } from '../VideoPreviewRenderState/VideoPreviewRenderState.ts'

export const getMediaType = (uri: string, audioFileExtensions: readonly string[]): VideoPreviewRenderState['mediaType'] => {
  const normalizedUri = uri.toLowerCase()
  return audioFileExtensions.some((extension) => normalizedUri.endsWith(extension)) ? 'audio' : 'video'
}
