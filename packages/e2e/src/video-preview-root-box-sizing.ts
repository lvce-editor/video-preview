const remotePrefix = '/remote'
const videoUri = new URL('../../sample-files/files/big_buck_bunny.mp4', import.meta.url).pathname.slice(remotePrefix.length)
const fileUri = `file://${videoUri}`

export const name = 'video-preview-root-box-sizing'

export const test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri(fileUri)

  // assert
  const element = Locator('.VideoPreview')
  await expect(element).toHaveCSS('box-sizing', 'border-box')
}
