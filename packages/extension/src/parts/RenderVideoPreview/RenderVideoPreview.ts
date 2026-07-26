import { text, VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export interface VideoPreviewRenderState {
  readonly errorMessage: string
  readonly url: string
}

interface TreeNode {
  readonly children: readonly TreeNode[]
  readonly node: VirtualDomNode
}

const node = (type: number, properties: Readonly<Record<string, unknown>>, children: readonly TreeNode[] = []): TreeNode => {
  return {
    children,
    node: {
      ...properties,
      childCount: children.length,
      type,
    },
  }
}

const flatten = (tree: TreeNode): readonly VirtualDomNode[] => {
  return [tree.node, ...tree.children.flatMap(flatten)]
}

const renderError = (message: string): TreeNode => {
  return node(VirtualDomElements.Div, { className: 'VideoPreviewError' }, [{ children: [], node: text(message) }])
}

const renderVideo = (state: Readonly<VideoPreviewRenderState>): TreeNode => {
  const { url } = state
  return node(VirtualDomElements.Div, { className: 'VideoContent' }, [
    node(VirtualDomElements.Video, {
      className: 'VideoElement',
      controls: true,
      onError: DomEventListenerFunctions.HandleError,
      src: url,
    }),
  ])
}

export const render = (state: Readonly<VideoPreviewRenderState>): readonly VirtualDomNode[] => {
  const { errorMessage } = state
  return flatten(
    node(VirtualDomElements.Div, { className: 'VideoPreview' }, [errorMessage ? renderError(errorMessage) : renderVideo(state)]),
  )
}
