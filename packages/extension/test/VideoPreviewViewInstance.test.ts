import { expect, jest, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { MediaFileNotFoundError } from '../src/parts/MediaFileNotFoundError/MediaFileNotFoundError.ts'
import { createInstanceWithGetVideoUrl } from '../src/parts/VideoPreviewViewInstance/VideoPreviewViewInstance.ts'

const getVideoUrl = jest.fn<(uri: string) => Promise<string>>().mockResolvedValue('/remote/workspace/video.mp4')

const createContext = (state?: unknown, uri = '/workspace/video.mp4') => {
  return {
    requestRerender: async () => {},
    showContextMenu: async () => {},
    state,
    uid: 1,
    uri,
    viewId: 'builtin.video-preview',
  }
}

const createContextWithoutUri = (state?: unknown) => {
  return {
    ...createContext(state),
    uri: undefined,
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

test('falls back to audio playback for an audio-only WebM', async () => {
  const instance = await createInstanceWithGetVideoUrl(createContext(undefined, '/workspace/recording.webm'), getVideoUrl)

  instance.handleVideoError(4, 'Format error')

  expect(instance.render()[2]).toMatchObject({
    type: VirtualDomElements.Audio,
  })

  instance.handleAudioError(4, 'Format error')

  expect(instance.render()[2]).toMatchObject({
    text: 'Failed to decode video: Format error',
  })
})

test.each(['recording.oga', 'recording.ogg', 'recording.opus', 'recording.wav'])(
  'renders %s with an audio element',
  async (fileName) => {
    const instance = await createInstanceWithGetVideoUrl(createContext(undefined, `/workspace/${fileName}`), getVideoUrl)

    expect(instance.render()[2]).toMatchObject({
      type: VirtualDomElements.Audio,
    })
  },
)

test('restores the video uri from saved state', async () => {
  const instance = await createInstanceWithGetVideoUrl(createContextWithoutUri({ uri: '/workspace/saved.mp4' }), getVideoUrl)

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
  ['/workspace/missing.mp4', 'Video file not found'],
  ['/workspace/missing.webm', 'Audio file not found'],
  ['/workspace/missing.ogg', 'Audio file not found'],
])('renders a short message when %s is not found', async (uri, message) => {
  const missingVideoUrl = jest.fn<(uri: string) => Promise<string>>().mockRejectedValue(new MediaFileNotFoundError(uri))

  const instance = await createInstanceWithGetVideoUrl(createContext(undefined, uri), missingVideoUrl)

  expect(instance.render()).toEqual([
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
      text: message,
      type: VirtualDomElements.Text,
    },
  ])
})

test('preserves unexpected video URL errors', async () => {
  const error = new Error('Permission denied')
  const failingVideoUrl = jest.fn<(uri: string) => Promise<string>>().mockRejectedValue(error)

  await expect(createInstanceWithGetVideoUrl(createContext(), failingVideoUrl)).rejects.toBe(error)
})

test.each([
  ['a primitive', 'invalid'],
  ['an object without a uri', { uri: 42 }],
])('ignores %s saved state', async (_name, state) => {
  const instance = await createInstanceWithGetVideoUrl(createContextWithoutUri(state), getVideoUrl)

  expect(instance.render()[2]).toMatchObject({
    text: 'Failed to load video',
  })
  expect(instance.saveState()).toEqual({
    uri: '',
  })
})
