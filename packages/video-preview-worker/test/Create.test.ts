import { jest, test, expect } from '@jest/globals'

jest.unstable_mockModule('../src/parts/WebViewStates/WebViewStates.ts', () => ({
  get: jest.fn().mockReturnValue({ time: 0, url: '' }),
  set: jest.fn(),
}))

jest.unstable_mockModule('../src/parts/Rpc/Rpc.ts', () => ({
  // @ts-ignore
  invoke: jest.fn().mockResolvedValue('https://example.com/video.mp4'),
}))

jest.unstable_mockModule('../src/parts/SetSavedState/SetSavedState.ts', () => ({
  setSavedState: jest.fn(),
}))

const { create } = await import('../src/parts/Create/Create.ts')
const WebViewStates = await import('../src/parts/WebViewStates/WebViewStates.ts')
const Rpc = await import('../src/parts/Rpc/Rpc.ts')
const SetSavedState = await import('../src/parts/SetSavedState/SetSavedState.ts')

test('create - should create webview and handle successful initialization', async () => {
  const port = {
    // @ts-ignore
    invoke: jest.fn().mockResolvedValue({ type: 'load' }),
  }
  const savedState = { time: 42 }
  const webViewId = 'test-webview'
  const uri = 'video.mp4'
  const id = 1

  await create({ id, port, savedState, uri, webViewId })

  expect(WebViewStates.set).toHaveBeenCalledWith(id, {
    time: 0,
    url: '',
  })
  expect(SetSavedState.setSavedState).toHaveBeenCalledWith(id, savedState)
  expect(Rpc.invoke).toHaveBeenCalledWith('WebView.getRemoteUrl', {
    id,
    uri,
    webViewId,
  })
  expect(port.invoke).toHaveBeenCalledWith('initialize', 'https://example.com/video.mp4', 0)
})

test('create - should throw VideoLoadError when initialization fails', async () => {
  const errorEvent = {
    code: 4,
    message: 'Failed to load video',
    type: 'error',
  }
  const port = {
    // @ts-ignore
    invoke: jest.fn().mockResolvedValue(errorEvent),
  }
  const savedState = { time: 42 }
  const webViewId = 'test-webview'
  const uri = 'video.mp4'
  const id = 1

  await expect(create({ id, port, savedState, uri, webViewId })).rejects.toThrow('Failed to decode video: Failed to load video')
})
