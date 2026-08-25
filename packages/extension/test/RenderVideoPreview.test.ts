import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { render } from '../src/parts/RenderVideoPreview/RenderVideoPreview.ts'

test('renders a playable video', () => {
  expect(
    render({
      errorMessage: '',
      mediaType: 'video',
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
      onError: DomEventListenerFunctions.HandleVideoError,
      src: '/remote/workspace/video.mp4',
      type: VirtualDomElements.Video,
    },
  ])
})

test('renders an error', () => {
  expect(
    render({
      errorMessage: 'Failed to decode video',
      mediaType: 'video',
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

test('renders playable audio after a WebM video fallback', () => {
  expect(
    render({
      errorMessage: '',
      mediaType: 'audio',
      url: '/remote/workspace/recording.webm',
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
      className: 'AudioElement',
      controls: true,
      onError: DomEventListenerFunctions.HandleAudioError,
      src: '/remote/workspace/recording.webm',
      type: VirtualDomElements.Audio,
    },
  ])
})
