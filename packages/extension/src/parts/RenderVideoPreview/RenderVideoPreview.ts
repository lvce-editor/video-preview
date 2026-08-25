import { text, VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export interface VideoPreviewRenderState {
  readonly errorMessage: string
  readonly mediaType: 'audio' | 'video'
  readonly url: string
}

const parentNode: VirtualDomNode = {
  childCount: 1,
  className: 'VideoPreview',
  type: VirtualDomElements.Div,
}

const errorParentNode: VirtualDomNode = {
  childCount: 1,
  className: 'VideoPreviewError',
  type: VirtualDomElements.Div,
}

const videoParentNode: VirtualDomNode = {
  childCount: 1,
  className: 'VideoContent',
  type: VirtualDomElements.Div,
}

const getErrorVirtualDom = (message: string): readonly VirtualDomNode[] => {
  return [errorParentNode, text(message)]
}

const getVideoVirtualDom = (url: string): readonly VirtualDomNode[] => {
  return [
    videoParentNode,
    {
      childCount: 0,
      className: 'VideoElement',
      controls: true,
      onError: DomEventListenerFunctions.HandleVideoError,
      src: url,
      type: VirtualDomElements.Video,
    },
  ]
}

const getAudioVirtualDom = (url: string): readonly VirtualDomNode[] => {
  return [
    videoParentNode,
    {
      childCount: 0,
      className: 'AudioElement',
      controls: true,
      onError: DomEventListenerFunctions.HandleAudioError,
      src: url,
      type: VirtualDomElements.Audio,
    },
  ]
}

export const render = (state: Readonly<VideoPreviewRenderState>): readonly VirtualDomNode[] => {
  const { errorMessage, mediaType, url } = state
  const childDom = errorMessage
    ? getErrorVirtualDom(errorMessage)
    : mediaType === 'audio'
      ? getAudioVirtualDom(url)
      : getVideoVirtualDom(url)
  return [parentNode, ...childDom]
}
