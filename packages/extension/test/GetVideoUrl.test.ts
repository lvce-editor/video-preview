import type { ReadAsObjectUrlResult } from '@lvce-editor/api'
import { expect, jest, test } from '@jest/globals'
import { getVideoUrl } from '../src/parts/GetVideoUrl/GetVideoUrl.ts'

const readAsObjectUrl = jest.fn<(uri: string) => Promise<ReadAsObjectUrlResult>>()

test('returns the remote URL for an Electron file URI', async () => {
  readAsObjectUrl.mockResolvedValue({
    error: '',
    objectUrl: '/remote/home/simon/Downloads/video.mp4',
    wasFound: true,
  })

  await expect(getVideoUrl('file:///home/simon/Downloads/video.mp4', readAsObjectUrl)).resolves.toBe(
    '/remote/home/simon/Downloads/video.mp4',
  )
  expect(readAsObjectUrl).toHaveBeenCalledWith('file:///home/simon/Downloads/video.mp4')
})

test('returns an empty URL when the video could not be resolved', async () => {
  readAsObjectUrl.mockResolvedValue({
    error: 'File not found',
    objectUrl: '',
    wasFound: false,
  })

  await expect(getVideoUrl('file:///home/simon/Downloads/missing.mp4', readAsObjectUrl)).resolves.toBe('')
})
