import { jest, test, expect } from '@jest/globals'

jest.unstable_mockModule('../src/parts/WebViewStates/WebViewStates.ts', () => ({
  set: jest.fn(),
  get: jest.fn().mockReturnValue({ url: '', time: 0 }),
}))

const { setSavedState } = await import('../src/parts/SetSavedState/SetSavedState.ts')
const WebViewStates = await import('../src/parts/WebViewStates/WebViewStates.ts')

test('setSavedState - should set valid saved time', () => {
  const id = 1
  const savedState = { time: 100 }
  setSavedState(id, savedState)
  expect(WebViewStates.get).toHaveBeenCalledWith(id)
  expect(WebViewStates.set).toHaveBeenCalledWith(id, {
    url: '',
    time: 100,
  })
})

test('setSavedState - should handle invalid time', () => {
  const id = 1
  setSavedState(id, { time: 'invalid' })
  expect(WebViewStates.set).toHaveBeenCalledWith(id, {
    url: '',
    time: 0,
  })
})
