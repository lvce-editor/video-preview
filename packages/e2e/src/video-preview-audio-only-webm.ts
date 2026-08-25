const remotePrefix = '/remote'
const audioUri = new URL('../fixtures/big_buck_bunny-audio-only.webm', import.meta.url).pathname.slice(remotePrefix.length)
const fileUri = `file://${audioUri}`

export const name = 'video-preview-audio-only-webm'

export const test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri(fileUri)

  // assert
  const media = Locator('.AudioElement, .VideoElement')
  const error = Locator('.VideoPreviewError')
  await expect(media).toBeVisible()
  await expect(media).toHaveAttribute('src', `${remotePrefix}${audioUri}`)
  await expect(media).toHaveJSProperty('error', null)
  await expect(error).toHaveCount(0)
}
