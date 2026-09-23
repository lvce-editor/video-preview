import { text, VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const errorParentNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.VideoPreviewError,
  type: VirtualDomElements.Div,
}

export const getErrorVirtualDom = (message: string): readonly VirtualDomNode[] => {
  return [errorParentNode, text(message)]
}
