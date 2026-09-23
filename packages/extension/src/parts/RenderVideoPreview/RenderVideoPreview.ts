import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VideoPreviewRenderState } from '../VideoPreviewRenderState/VideoPreviewRenderState.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getChildDom } from '../GetChildDom/GetChildDom.ts'

const parentNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.VideoPreview,
  type: VirtualDomElements.Div,
}

export const render = (state: Readonly<VideoPreviewRenderState>): readonly VirtualDomNode[] => {
  const childDom = getChildDom(state)
  return [parentNode, ...childDom]
}
