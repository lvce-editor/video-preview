const videoUri = import.meta.resolve('../fixtures/big_buck_bunny.mp4')
const audioUri = import.meta.resolve('../fixtures/format-opus.oga')

export const name = 'video-preview-media-ready-state'

interface ComponentInfo {
  readonly moduleId: string
  readonly uid: number
}

const assertMediaReady = async (Command, Locator, Main, VideoPreview, expect, uri: string, selector: string) => {
  await Main.openUri(uri)

  const media = Locator(selector)
  await expect(media).toBeVisible()
  await VideoPreview.waitForMediaPreviewReady(media)

  const components = (await Command.execute('ComponentState.getComponents')) as readonly ComponentInfo[]
  const component = components.find((item) => item.moduleId === 'ExtensionView')
  if (!component) {
    throw new Error('Expected video preview component')
  }
  const state = await Command.execute('ComponentState.getState', component.uid)
  const { ready } = state
  if (ready !== true) {
    throw new Error(`Expected media to be ready, got ${JSON.stringify(state)}`)
  }
}

export const test = async ({ Command, expect, Locator, Main, VideoPreview }) => {
  await assertMediaReady(Command, Locator, Main, VideoPreview, expect, videoUri, '.VideoElement')
  await assertMediaReady(Command, Locator, Main, VideoPreview, expect, audioUri, '.AudioElement')
}
