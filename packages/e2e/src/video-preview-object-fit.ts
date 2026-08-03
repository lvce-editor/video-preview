const remotePrefix = '/remote'
const videoUri = new URL('../../sample-files/files/big_buck_bunny.mp4', import.meta.url).pathname.slice(remotePrefix.length)
const fileUri = `file://${videoUri}`

export const name = 'video-preview-object-fit'

export const test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri(fileUri)

  // assert
  const element = Locator('.VideoElement')
  await expect(element).toHaveCSS('object-fit', 'contain')
}
