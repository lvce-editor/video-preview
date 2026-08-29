import type { VideoPreviewRenderState } from '../VideoPreviewRenderState/VideoPreviewRenderState.ts'

const audioFileExtensions = ['.flac', '.mp3', '.oga', '.ogg', '.opus', '.wav']

export const getMediaType = (uri: string): VideoPreviewRenderState['mediaType'] => {
  const normalizedUri = uri.toLowerCase()
  return audioFileExtensions.some((extension) => normalizedUri.endsWith(extension)) ? 'audio' : 'video'
}
