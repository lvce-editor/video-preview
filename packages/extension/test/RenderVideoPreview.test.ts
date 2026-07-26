import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { render } from '../src/parts/RenderVideoPreview/RenderVideoPreview.ts'

test('renders a playable video', () => {
  expect(
    render({
      errorMessage: '',
      url: '/remote/workspace/video.mp4',
    }),
  ).toEqual([
    {
      childCount: 1,
      className: 'VideoPreview',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'VideoContent',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'VideoElement',
      controls: true,
      onError: DomEventListenerFunctions.HandleError,
      src: '/remote/workspace/video.mp4',
      type: VirtualDomElements.Video,
    },
  ])
})

test('renders an error', () => {
  expect(
    render({
      errorMessage: 'Failed to decode video',
      url: '/remote/workspace/video.mp4',
    }),
  ).toEqual([
    {
      childCount: 1,
      className: 'VideoPreview',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'VideoPreviewError',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Failed to decode video',
      type: VirtualDomElements.Text,
    },
  ])
})
