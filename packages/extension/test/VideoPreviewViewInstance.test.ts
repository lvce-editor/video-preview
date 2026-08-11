import { expect, jest, test } from '@jest/globals'
import { createInstanceWithGetVideoUrl } from '../src/parts/VideoPreviewViewInstance/VideoPreviewViewInstance.ts'

const getVideoUrl = jest.fn<(uri: string) => Promise<string>>().mockResolvedValue('/remote/workspace/video.mp4')

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

test('creates a view instance from isolated view context', async () => {
  const instance = await createInstanceWithGetVideoUrl(createContext({ time: 12 }), getVideoUrl)

  expect(instance.render()[2]).toMatchObject({
    src: '/remote/workspace/video.mp4',
  })
  expect(getVideoUrl).toHaveBeenCalledWith('/workspace/video.mp4')
})

test('saves the video uri', async () => {
  const instance = await createInstanceWithGetVideoUrl(createContext(), getVideoUrl)

  expect(instance.saveState()).toEqual({
    uri: '/workspace/video.mp4',
  })
})

test('renders a media error dispatched through a direct view handler', async () => {
  const instance = await createInstanceWithGetVideoUrl(createContext(), getVideoUrl)

  instance.handleVideoError(4, 'Format error')

  expect(instance.render()[2]).toMatchObject({
    text: 'Failed to decode video: Format error',
  })
})

test('restores the video uri from saved state', async () => {
  const instance = await createInstanceWithGetVideoUrl(
    {
      ...createContext({ uri: '/workspace/saved.mp4' }),
      uri: undefined,
    },
    getVideoUrl,
  )

  expect(getVideoUrl).toHaveBeenCalledWith('/workspace/saved.mp4')
  expect(instance.saveState()).toEqual({
    uri: '/workspace/saved.mp4',
  })
})

test('renders a loading error when the context is missing', async () => {
  const instance = await createInstanceWithGetVideoUrl(undefined, getVideoUrl)

  expect(instance.render()[2]).toMatchObject({
    text: 'Failed to load video',
  })
  expect(instance.saveState()).toEqual({
    uri: '',
  })
})

test.each([
  ['a primitive', 'invalid'],
  ['an object without a uri', { uri: 42 }],
])('ignores %s saved state', async (_name, state) => {
  const instance = await createInstanceWithGetVideoUrl(
    {
      ...createContext(state),
      uri: undefined,
    },
    getVideoUrl,
  )

  expect(instance.render()[2]).toMatchObject({
    text: 'Failed to load video',
  })
  expect(instance.saveState()).toEqual({
    uri: '',
  })
})
