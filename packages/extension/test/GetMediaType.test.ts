import { expect, test } from '@jest/globals'
import { getMediaType } from '../src/parts/GetMediaType/GetMediaType.ts'
import { defaultAudioFileExtensions } from '../src/parts/VideoPreviewRenderState/VideoPreviewRenderState.ts'

test.each(['recording.oga', 'recording.ogg', 'recording.opus', 'recording.wav', 'RECORDING.OGG'])(
  'classifies %s as audio',
  (uri) => {
    expect(getMediaType(uri, defaultAudioFileExtensions)).toBe('audio')
  },
)

test.each(['video.mp4', 'video.ogv', 'video.webm', 'video-without-extension'])('classifies %s as video', (uri) => {
  expect(getMediaType(uri, defaultAudioFileExtensions)).toBe('video')
})

test('classifies audio using the extensions provided by state', () => {
  expect(getMediaType('recording.custom', ['.custom'])).toBe('audio')
  expect(getMediaType('recording.oga', ['.custom'])).toBe('video')
})
