import { jest, test, expect } from '@jest/globals'

jest.unstable_mockModule('../src/parts/WebViewStates/WebViewStates.ts', () => ({
  get: jest.fn().mockReturnValue({ time: 0, url: '' }),
  set: jest.fn(),
}))

const { setTime } = await import('../src/parts/SetTime/SetTime.ts')
const WebViewStates = await import('../src/parts/WebViewStates/WebViewStates.ts')

test('setTime - should update webview time', () => {
  const id = 1
  const newTime = 50
  setTime(newTime)
  expect(WebViewStates.get).toHaveBeenCalledWith(id)
  expect(WebViewStates.set).toHaveBeenCalledWith(id, {
    time: newTime,
    url: '',
  })
})
