import type { ViewContext } from '@lvce-editor/api'
import { expect, jest, test } from '@jest/globals'

const activateExtensionApi = jest.fn<() => Promise<void>>().mockResolvedValue(undefined)
const registerView = jest.fn()
const exists = jest.fn<(uri: string) => Promise<boolean>>().mockResolvedValue(true)
const readAsObjectUrl = jest.fn().mockImplementation(async () => ({
  error: '',
  objectUrl: 'blob:video-preview',
  wasFound: true,
}))
const executeCommand = jest.fn()

jest.unstable_mockModule('@lvce-editor/api', () => ({
  activate: activateExtensionApi,
  executeCommand,
  exists,
  readAsObjectUrl,
  registerView,
}))

const { activate, deactivate } = await import('../src/videoPreviewMain.ts')
const { view } = await import('../src/parts/VideoPreviewView/VideoPreviewView.ts')

test('activates the API and registers the view once on startup', async () => {
  expect(activateExtensionApi).toHaveBeenCalledTimes(1)
  expect(registerView).toHaveBeenCalledTimes(1)
  expect(registerView).toHaveBeenCalledWith(view)

  await activate()

  expect(activateExtensionApi).toHaveBeenCalledTimes(1)
  expect(registerView).toHaveBeenCalledTimes(1)
})

test('deactivates without throwing', () => {
  expect(deactivate).not.toThrow()
})

test('creates a registered view using the file system API', async () => {
  const context: ViewContext = {
    requestRerender: async () => {},
    showContextMenu: async () => {},
    state: { uri: '/workspace/video.mp4' },
    uid: 1,
    viewId: view.id,
  }
  const instance = await view.create(context)

  expect(exists).toHaveBeenCalledWith('/workspace/video.mp4')
  expect(readAsObjectUrl).toHaveBeenCalledWith('/workspace/video.mp4')
  expect(instance.render()[2]).toMatchObject({ src: 'blob:video-preview' })

  const state = {
    errorMessage: 'Inspector error',
    mediaType: 'video' as const,
    ready: false,
    url: 'blob:video-preview',
    videoErrorMessage: '',
  }
  await view.setComponentState!(instance, state)

  expect(view.getComponentState!(instance)).toEqual(state)
  expect(instance.render()[2]).toMatchObject({ text: 'Inspector error' })
})

test('creates a registered view without a context', async () => {
  const instance = await view.create()

  expect(instance.render()[2]).toMatchObject({ text: 'Failed to load video' })
  expect(instance.saveState()).toEqual({ uri: '' })
})
