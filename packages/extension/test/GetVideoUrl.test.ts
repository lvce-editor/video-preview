import type { ReadAsObjectUrlResult } from '@lvce-editor/api'
import { beforeEach, expect, jest, test } from '@jest/globals'
import { getVideoUrl } from '../src/parts/GetVideoUrl/GetVideoUrl.ts'

const readAsObjectUrl = jest.fn<(uri: string) => Promise<ReadAsObjectUrlResult>>()
const executeCommand = jest.fn<(id: string, ...args: readonly unknown[]) => Promise<unknown>>()
const exists = jest.fn<(uri: string) => Promise<boolean>>()

beforeEach(() => {
  jest.clearAllMocks()
  exists.mockResolvedValue(true)
})

test('returns a Blob URL for a custom file system URI', async () => {
  executeCommand.mockResolvedValue('blob:http://localhost/recording-id')

  await expect(getVideoUrl('gpt-voice-audio:///recording.webm', readAsObjectUrl, executeCommand)).resolves.toBe(
    'blob:http://localhost/recording-id',
  )
  expect(executeCommand).toHaveBeenCalledWith('Blob.getSrc', 'gpt-voice-audio:///recording.webm')
  expect(readAsObjectUrl).not.toHaveBeenCalled()
})

test.each([
  new Error('File not found'),
  Object.assign(new Error('Missing recording'), { code: 'E_NOT_FOUND' }),
  Object.assign(new Error('Missing recording'), { code: 'ENOENT' }),
  Object.assign(new Error('Request failed'), { status: 404 }),
  '404 Not Found',
])('throws a structured error when a custom file system URI cannot be resolved', async (error) => {
  executeCommand.mockRejectedValue(error)

  await expect(getVideoUrl('test:///missing.webm', readAsObjectUrl, executeCommand, exists)).rejects.toMatchObject({
    code: 'E_NOT_FOUND',
    message: 'Audio file not found',
  })
})

test('preserves other custom file system errors', async () => {
  const error = new Error('Permission denied')
  executeCommand.mockRejectedValue(error)

  await expect(getVideoUrl('test:///private.webm', readAsObjectUrl, executeCommand, exists)).rejects.toBe(error)
})

test('returns the remote URL for an Electron file URI', async () => {
  readAsObjectUrl.mockResolvedValue({
    error: '',
    objectUrl: '/remote/home/simon/Downloads/video.mp4',
    wasFound: true,
  })

  await expect(getVideoUrl('file:///home/simon/Downloads/video.mp4', readAsObjectUrl, executeCommand, exists)).resolves.toBe(
    '/remote/home/simon/Downloads/video.mp4',
  )
  expect(exists).toHaveBeenCalledWith('file:///home/simon/Downloads/video.mp4')
  expect(readAsObjectUrl).toHaveBeenCalledWith('file:///home/simon/Downloads/video.mp4')
})

test('returns an HTTP URL without a file system existence check', async () => {
  readAsObjectUrl.mockResolvedValue({
    error: '',
    objectUrl: 'https://example.com/video.mp4',
    wasFound: true,
  })

  await expect(getVideoUrl('https://example.com/video.mp4', readAsObjectUrl, executeCommand, exists)).resolves.toBe(
    'https://example.com/video.mp4',
  )
  expect(exists).not.toHaveBeenCalled()
})

test('throws a structured error when the video could not be resolved', async () => {
  readAsObjectUrl.mockResolvedValue({
    error: 'File not found',
    objectUrl: '',
    wasFound: false,
  })

  await expect(
    getVideoUrl('file:///home/simon/Downloads/missing.mp4', readAsObjectUrl, executeCommand, exists),
  ).rejects.toMatchObject({
    code: 'E_NOT_FOUND',
    message: 'Video file not found',
  })
})

test('checks for a missing local file before creating its remote URL', async () => {
  exists.mockResolvedValue(false)

  await expect(getVideoUrl('/workspace/missing.mp4', readAsObjectUrl, executeCommand, exists)).rejects.toMatchObject({
    code: 'E_NOT_FOUND',
    message: 'Video file not found',
  })
  expect(readAsObjectUrl).not.toHaveBeenCalled()
})
