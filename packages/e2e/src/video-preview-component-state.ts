import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'video-preview-component-state'

interface ComponentInfo {
  readonly editable: boolean
  readonly moduleId: string
  readonly uid: number
}

export const test: Test = async ({ Command, expect, FileSystem, Locator, Main }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/state.mp4`, '')
  await Main.openUri(`${tmpDir}/state.mp4`)
  const errorMessage = Locator('.VideoPreviewError')
  await expect(errorMessage).toBeVisible()
  const components = (await Command.execute('ComponentState.getComponents')) as readonly ComponentInfo[]
  const component = components.find((item) => item.moduleId === 'ExtensionView')
  if (!component?.editable) {
    throw new Error('Expected editable extension component state')
  }
  const state = await Command.execute('ComponentState.getState', component.uid)
  const { errorMessage: currentErrorMessage, mediaType } = state
  if (typeof currentErrorMessage !== 'string' || !mediaType) {
    throw new Error('Expected live video state')
  }
  await Command.execute('ComponentState.setState', component.uid, { ...state, errorMessage: 'Inspector video error' })
  await expect(errorMessage).toContainText('Inspector video error')
}
