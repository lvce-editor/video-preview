import { expect, test } from '@jest/globals'

const { getMessage } = await import('../src/parts/GetVideoErrorMessage/GetVideoErrorMessage.ts')

test('getMessage - should return decoding error message when code is 4', () => {
  const event = {
    code: 4,
    message: 'Invalid format',
  }
  const result = getMessage(event)
  expect(result).toBe('Failed to decode video: Invalid format')
})

test('getMessage - should return load error message when code is not 4', () => {
  const event = {
    code: 3,
    message: 'Network error',
  }
  const result = getMessage(event)
  expect(result).toBe('Failed to load video: Network error')
})
