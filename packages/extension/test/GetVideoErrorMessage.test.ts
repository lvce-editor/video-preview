import { describe, expect, test } from '@jest/globals'
import { getVideoErrorMessage } from '../src/parts/GetVideoErrorMessage/GetVideoErrorMessage.ts'

describe('getVideoErrorMessage', () => {
  test('formats decoding errors', () => {
    expect(getVideoErrorMessage(4, 'Format error')).toBe('Failed to decode video: Format error')
  })

  test('formats loading errors', () => {
    expect(getVideoErrorMessage(2, 'Network error')).toBe('Failed to load video: Network error')
  })

  test('omits invalid details', () => {
    expect(getVideoErrorMessage(4, undefined)).toBe('Failed to decode video')
  })
})
