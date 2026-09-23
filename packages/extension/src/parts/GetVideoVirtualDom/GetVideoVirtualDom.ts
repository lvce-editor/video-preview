import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const videoParentNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.VideoContent,
  type: VirtualDomElements.Div,
}

export const getVideoVirtualDom = (url: string): readonly VirtualDomNode[] => {
  return [
    videoParentNode,
    {
      childCount: 0,
      className: ClassNames.VideoElement,
      controls: true,
      onError: DomEventListenerFunctions.HandleVideoError,
      onLoadedData: DomEventListenerFunctions.HandleMediaReady,
      src: url,
      type: VirtualDomElements.Video,
    },
  ]
}
