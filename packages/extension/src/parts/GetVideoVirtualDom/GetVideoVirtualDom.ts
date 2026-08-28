import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const videoParentNode: VirtualDomNode = {
  childCount: 1,
  className: 'VideoContent',
  type: VirtualDomElements.Div,
}

export const getVideoVirtualDom = (url: string): readonly VirtualDomNode[] => {
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
