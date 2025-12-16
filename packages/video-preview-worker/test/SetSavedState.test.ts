import { jest, test, expect } from '@jest/globals'

jest.unstable_mockModule('../src/parts/WebViewStates/WebViewStates.ts', () => ({
  get: jest.fn().mockReturnValue({ time: 0, url: '' }),
  set: jest.fn(),
}))

const { setSavedState } = await import('../src/parts/SetSavedState/SetSavedState.ts')
const WebViewStates = await import('../src/parts/WebViewStates/WebViewStates.ts')

test('setSavedState - should set valid saved time', () => {
  const id = 1
  const savedState = { time: 100 }
  setSavedState(id, savedState)
  expect(WebViewStates.get).toHaveBeenCalledWith(id)
  expect(WebViewStates.set).toHaveBeenCalledWith(id, {
    time: 100,
    url: '',
  })
})

test('setSavedState - should handle invalid time', () => {
  const id = 1
  setSavedState(id, { time: 'invalid' })
  expect(WebViewStates.set).toHaveBeenCalledWith(id, {
    time: 0,
    url: '',
  })
})
