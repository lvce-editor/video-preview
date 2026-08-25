const remotePrefix = '/remote'
const videoUri = new URL('../fixtures/big_buck_bunny.mp4', import.meta.url).pathname.slice(remotePrefix.length)
const fileUri = `file://${videoUri}`

export const name = 'video-preview-paused-initially'

export const test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri(fileUri)

  // assert
  const element = Locator('.VideoElement')
  await expect(element).toHaveJSProperty('paused', true)
}
