import { text, VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'

const errorParentNode: VirtualDomNode = {
  childCount: 1,
  className: 'VideoPreviewError',
  type: VirtualDomElements.Div,
}

export const getErrorVirtualDom = (message: string): readonly VirtualDomNode[] => {
  return [errorParentNode, text(message)]
}
