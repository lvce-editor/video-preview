import { expect, test } from '@jest/globals'

const { VideoLoadError } = await import('../src/parts/VideoLoadError/VideoLoadError.ts')

test('VideoLoadError - should create error with correct message and code', () => {
  const event = {
    code: 4,
    message: 'Invalid format',
  }
  const error = new VideoLoadError(event)
  expect(error.message).toBe('Failed to decode video: Invalid format')
  expect(error.name).toBe('VideoLoadError')
  expect(error.code).toBe(4)
})
