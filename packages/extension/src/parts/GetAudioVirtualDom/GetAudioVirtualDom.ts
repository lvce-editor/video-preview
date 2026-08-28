import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const audioParentNode: VirtualDomNode = {
  childCount: 1,
  className: 'VideoContent',
  type: VirtualDomElements.Div,
}

export const getAudioVirtualDom = (url: string): readonly VirtualDomNode[] => {
  return [
    audioParentNode,
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
