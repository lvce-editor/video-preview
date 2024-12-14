import { jest, test, expect } from '@jest/globals'

jest.unstable_mockModule('../src/parts/WebViewStates/WebViewStates.ts', () => ({
  set: jest.fn(),
  get: jest.fn().mockReturnValue({ url: '', time: 0 }),
}))

const { setTime } = await import('../src/parts/SetTime/SetTime.ts')
const WebViewStates = await import('../src/parts/WebViewStates/WebViewStates.ts')

test('setTime - should update webview time', () => {
  const id = 1
  const newTime = 50
  setTime(id, newTime)
  expect(WebViewStates.get).toHaveBeenCalledWith(id)
  expect(WebViewStates.set).toHaveBeenCalledWith(id, {
    url: '',
    time: newTime,
  })
})
