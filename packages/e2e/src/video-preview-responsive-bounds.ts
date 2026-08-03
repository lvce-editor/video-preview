const remotePrefix = '/remote'
const videoUri = new URL('../../sample-files/files/big_buck_bunny.mp4', import.meta.url).pathname.slice(remotePrefix.length)
const fileUri = `file://${videoUri}`

export const name = 'video-preview-responsive-bounds'

export const test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri(fileUri)

  // assert
  const video = Locator('.VideoElement')
  await expect(video).toHaveCSS('max-width', '100%')
  await expect(video).toHaveCSS('max-height', '100%')
}
