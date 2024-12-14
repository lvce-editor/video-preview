import { jest, test, expect } from '@jest/globals'

jest.unstable_mockModule('../src/parts/WebViewStates/WebViewStates.ts', () => ({
  set: jest.fn(),
  get: jest.fn(),
}))

const { create } = await import('../src/parts/Create/Create.ts')
const WebViewStates = await import('../src/parts/WebViewStates/WebViewStates.ts')

test('create - should create a new webview with default values', () => {
  const id = 1
  create(id)
  expect(WebViewStates.set).toHaveBeenCalledWith(id, {
    url: '',
    time: 0,
  })
})
