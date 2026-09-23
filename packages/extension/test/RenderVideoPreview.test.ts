import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { render } from '../src/parts/RenderVideoPreview/RenderVideoPreview.ts'

test('renders a playable video', () => {
  expect(
    render({
      audioFileExtensions: ['.oga', '.ogg', '.opus', '.wav'],
      errorMessage: '',
      mediaType: 'video',
      ready: false,
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
      onLoadedData: DomEventListenerFunctions.HandleMediaReady,
      src: '/remote/workspace/video.mp4',
      type: VirtualDomElements.Video,
    },
  ])
})

test('renders an error', () => {
  expect(
    render({
      audioFileExtensions: ['.oga', '.ogg', '.opus', '.wav'],
      errorMessage: 'Failed to decode video',
      mediaType: 'video',
      ready: false,
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
      audioFileExtensions: ['.oga', '.ogg', '.opus', '.wav'],
      errorMessage: '',
      mediaType: 'audio',
      ready: false,
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
      onLoadedData: DomEventListenerFunctions.HandleMediaReady,
      src: '/remote/workspace/recording.webm',
      type: VirtualDomElements.Audio,
    },
  ])
})
