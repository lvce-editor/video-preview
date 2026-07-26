import { expect, test } from '@jest/globals'
import { createInstance } from '../src/parts/VideoPreviewViewInstance/VideoPreviewViewInstance.ts'

const createContext = (state?: unknown) => {
  return {
    requestRerender: async () => {},
    showContextMenu: async () => {},
    state,
    uid: 1,
    uri: '/workspace/video.mp4',
    viewId: 'builtin.video-preview',
  }
}

test('creates a view instance from isolated view context', () => {
  const instance = createInstance(createContext({ time: 12 }))

  expect(instance.render()[2]).toMatchObject({
    src: '/remote/workspace/video.mp4',
  })
})

test('saves the video uri', () => {
  const instance = createInstance(createContext())

  expect(instance.saveState()).toEqual({
    uri: '/workspace/video.mp4',
  })
})

test('renders a media error dispatched through a direct view handler', () => {
  const instance = createInstance(createContext())

  instance.handleError(4, 'Format error')

  expect(instance.render()[2]).toMatchObject({
    text: 'Failed to decode video: Format error',
  })
})
