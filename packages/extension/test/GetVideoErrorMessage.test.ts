import { describe, expect, test } from '@jest/globals'
import { getVideoErrorMessage } from '../src/parts/GetVideoErrorMessage/GetVideoErrorMessage.ts'

describe('getVideoErrorMessage', () => {
  test('formats decoding errors', () => {
    expect(getVideoErrorMessage(4, 'Format error')).toBe('Failed to decode video: Format error')
  })

  test('formats loading errors', () => {
    expect(getVideoErrorMessage(2, 'Network error')).toBe('Failed to load video: Network error')
  })

  test.each([undefined, null, '', 42, {}])('omits empty or invalid details (%p)', (message) => {
    expect(getVideoErrorMessage(4, message)).toBe('Failed to decode video')
    expect(getVideoErrorMessage(2, message)).toBe('Failed to load video')
  })
})
