import { jest, test, expect } from '@jest/globals'

jest.unstable_mockModule('../src/parts/WebViewStates/WebViewStates.ts', () => ({
  get: jest.fn().mockReturnValue({ time: 42 }),
}))

const { getTime } = await import('../src/parts/GetTime/GetTime.ts')
const WebViewStates = await import('../src/parts/WebViewStates/WebViewStates.ts')

test('getTime - should return current time from webview state', () => {
  const id = 1
  const result = getTime(id)
  expect(WebViewStates.get).toHaveBeenCalledWith(id)
  expect(result).toBe(42)
})
