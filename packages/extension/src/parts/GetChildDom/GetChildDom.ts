import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VideoPreviewRenderState } from '../VideoPreviewRenderState/VideoPreviewRenderState.ts'
import { getAudioVirtualDom } from '../GetAudioVirtualDom/GetAudioVirtualDom.ts'
import { getErrorVirtualDom } from '../GetErrorVirtualDom/GetErrorVirtualDom.ts'
import { getVideoVirtualDom } from '../GetVideoVirtualDom/GetVideoVirtualDom.ts'

export const getChildDom = (state: Readonly<VideoPreviewRenderState>): readonly VirtualDomNode[] => {
  const { errorMessage, mediaType, url } = state
  if (errorMessage) {
    return getErrorVirtualDom(errorMessage)
  }
  if (mediaType === 'audio') {
    return getAudioVirtualDom(url)
  }
  return getVideoVirtualDom(url)
}
