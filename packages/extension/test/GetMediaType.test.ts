import { expect, test } from '@jest/globals'
import { getMediaType } from '../src/parts/GetMediaType/GetMediaType.ts'

test.each(['recording.oga', 'recording.ogg', 'recording.opus', 'recording.wav', 'RECORDING.OGG'])(
  'classifies %s as audio',
  (uri) => {
    expect(getMediaType(uri)).toBe('audio')
  },
)

test.each(['video.mp4', 'video.ogv', 'video.webm', 'video-without-extension'])('classifies %s as video', (uri) => {
  expect(getMediaType(uri)).toBe('video')
})
