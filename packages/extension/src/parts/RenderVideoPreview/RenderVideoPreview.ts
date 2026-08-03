import { text, VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export interface VideoPreviewRenderState {
  readonly errorMessage: string
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
      onError: DomEventListenerFunctions.HandleError,
      src: url,
      type: VirtualDomElements.Video,
    },
  ]
}

export const render = (state: Readonly<VideoPreviewRenderState>): readonly VirtualDomNode[] => {
  const { errorMessage, url } = state
  const childDom = errorMessage ? getErrorVirtualDom(errorMessage) : getVideoVirtualDom(url)
  return [parentNode, ...childDom]
}
